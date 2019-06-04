# Learn Node

_A compilation of useful notes and tricks that could come in handy in the future. Better to be safe than sorry!_

---

## Location Data in MongoDB

In Module 5 of the course, we expand our database to take in location coordinates as well as the existing data. Since our schema defaults to _strict_ mode, we must change the schema in order to allow the addition of data.

```js
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a store name!",
  },
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [
      {
        type: Number,
        required: "You must supply come coordinates",
      },
    ],
    address: {
      type: String,
      required: "You must supply an address!",
    },
  },
})
```

This is pretty useful for grouping data, since now we can reference specifics in the category of `location` (ex. `location.coordinates`, or `location.address`).

There are some **MongoDB Specific Quirks** in this schema. Under the new `location` parameter, we default the value to a 'Point'. A point is a way of storing a location via longitude and latitude, and for MongoDB, _in that order!_.

The sad part is that since this database will be read/written to, we need to be able to enforce that default _'Point'_, regardless of whether or not it is updated/edited. To do that, we have to go to where the editing will take place, and change this.

```js
exports.updateStore = async (req, res) => {
  // Enforce the Point default type
  req.body.location.type = "Point"

  // Update a store's location, ensuring the Point type
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // Return the new store, not the old one
    runValidators: true, // Run the required validators against the model
  }).exec()
}
```

Going with this, remember that when making reference to fill these nested variables in `pug`, you cannot use the _dot_ notation for the object within a string, use the _square bracket_ notation instead.

```pug
label(for="address") Address
input(type="text" id="address" name="location[address]" value=(store.location && store.location.address))

<!-- Remember, MongoDB -> [Lng, Lat] -->
label(for="lng") Address Longitude
input(type="text" id="lng" name="location[coordinates][0]" value=(store.location && store.location.coordinates[0]) required)

label(for="lng") Address Latitude
input(type="text" id="lat" name="location[coordinates][1]" value=(store.location && store.location.coordinates[1]) required)
```

_Note:_ In this project, the required field flashes as validation errors if the field isn't filled when creating/editing/updating due to the `flashValidationErrors` helper function.

---

## Using Frontend JS

Anything contained in our `./public/` directory is considered a client-side asset. In our case, if we want a Node App to integrate some front-end scripting, we can use **module** structure.

Within `./public/javascripts/` we should have our running JS file (ex. `delicious-app.js`), and another directory entitled `modules/`. In that `modules/` folder, we can export our frontend functions to be used.

See this example, which is used to autocomplete a location using the Google Maps API.

```js
function autocomplete(input, latInput, lngInput) {
  // If there is no address, skip this
  if (!input) return

  // Activate the Google Maps API Dropdown on the 'input' field
  const dropdown = new google.maps.places.Autocomplete(input)
  dropdown.addListener("place_changed", () => {
    const place = dropdown.getPlace()
    latInput.value = place.geometry.location.lat()
    lngInput.value = place.geometry.location.lng()
  })

  // Don't submit on 'enter' press
  input.on("keydown", e => {
    if (e.keyCode === 13) e.preventDefault()
  })
}
export default autocomplete
```

Then, in the `delicious-app.js` file, we can import that function and use it!

```js
import "../sass/style.scss"

import { $, $$ } from "./modules/bling" // Another module for $ --> document.querySelector
import autocomplete from "./modules/autocomplete"

autocomplete($("#address"), $("#lat"), $("#lng"))
```

---

## Image Handling

One way to store images in a MongoDB database is as a `String`, which represents the path to the uploaded image. The hard part is saving/resizing the uploaded photo so that we don't overload our storage. This can be done much more easily with the help of some libraries known as `multer`. `uuid`, and `jimp`. **Multer** will help with _uploading_, **UUID** will generate unique identifiers to save to our database, **Jimp** will assist the _resizing_.

**Note**: In order to allow a `<form>` to submit media we need to change an attribute: `enctype="multipart/form-data`.

```js
/*   Declarations   */

const multer = require("multer") // For uploading
const jimp = require("jimp") // For resizing
const uuid = require("uuid") // For generating unique IDs

const multerOptions = {
  // Save the image to memory, not disk (use then discard)
  storage: multer.memoryStorage(),
  // ES6 for --> fileFilter: function(req, file, next) {...}
  fileFilter(req, file, next) {
    // mimetype is a trusted file descriptor (rather than extension)
    const isPhoto = file.mimetype.startsWith("image/")
    if (isPhoto) {
      // next(err) --> an error occurred
      // next(null, val) --> it worked
      next(null, true)
    } else {
      next({ message: "That filetype isn't allowed!" }, false)
    }
  },
}
```

```js
/*   Usage   */

// Handle upload on the single, 'photo' field
exports.upload = multer(multerOptions).single("photo")

exports.resize = async (req, res, next) => {
  // Check if there is no new file to resize
  if (!req.file) return next() // multer puts the file on the request (i.e. req.file)

  const extension = req.file.mimetype.split("/")[1]
  req.body.photo = `${uuid.v4()}.${extension}` // Create a unique file name to save into DBs

  // Next step, resize
  const photo = await jimp.read(req.file.buffer)
  await photo.resize(800, jimp.AUTO)
  await photo.write(`./public/uploads/${req.body.photo}`)
  // Once the resize has been saved, keep going
  next()
}
```

So all together there are now two additional middlewares which must precede writing to the database (on a form with image upload). In a simple step-by-step, to add image handling to a database:

1. Modify the database schema to allow it
2. Modify the form to allow uploading (`enctype="multipart/form-data`)
3. Use `multer` and the appropriate options to validate upload and storage location
4. Use `uuid` to generate a random unique identifier, and save to DB
5. Use `jimp` to resize and save the photos

---

## Pre-Save Hooks

A pre-save hook is a bit of code that can be helpful to execute before saving the data to the database. In the case of _MongoDB_, this is helped by the `Schema.pre()` function which will allow for the hook to take place. These hooks are used to change or nudge the data into a format or functional requirement for our database.

In this application, we use a pre-save hook in order to ensure that no other document contains the same `slug` value, since it is not generated by the user. In order to do this we have to fun some JS before the data is saved through the DB schema.

```js
storeSchema.pre("save", async function(next) {
  // Skip it and stop this function
  if (!this.isModified("name")) return next()

  // Create the slug
  this.slug = slug(this.name)

  // Find other stores that have an existing slug (and their numerations)
  const slugRegExp = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i") // Create the search RegExp
  const storesWithSlug = await this.constructor.find({ slug: slugRegExp }) // Create an array of all matches
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}` // Add the appropriate number to the end of the slug
  }
  next()
})
```

You may notice the weird line here. `this.constructor`. This line is used to reference to the schema in which it is being declared. Since the last thing a model does is export itself, any functions within the model (`const storeSchema = new mongoose.Schema({...`) cannot reference the export (ex. `module.exports = mongoose.model("Store", storeSchema);`). The notation `this.constructor` can circumvent this at runtime.

---

## Aggregations and Custom Methods

Aggregations are a useful tool for making database calls since delays scale with your dataset. This means, the simple successive calls which can be made on small databases, will not scale well, introducing unnatural pauses and pointless wait times.

Take for example, if we want to count all the unique values of a property for every document item. On a smaller DB, it would work to query all the document items, loop over their properties, then loop over their values, then filter them. However, as the size of the DB increases, we don't want to waste resources computing these things, when we could offload the work onto our database (which is meant to handle data manipulation).

This is where '_aggregations_' come into play. In MongoDB, we can call the `.aggregate()` method on our schema to create a pipeline of stage operations to do sequentially when making a query. There is a special syntax for the pipeline stages array, which can be found on the [MongoDB Docs](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/).

```js
storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: "$tags" }, // Create a new entry per tag
    { $group: { _id: "$tags", count: { $sum: 1 } } }, // Group the entries by unique tag, then count
    { $sort: { count: -1 } }, // Sort by count descending
  ]) // output --> an array of tag objects sorted from most used to least
}
```

In the above example, an aggregation pipeline is used to manipulate the data output from the custom `.getTagsList()` method. To create custom methods like these (and to reuse your aggregations), in the model, create a proper function (to gain access to the `this` keyword) as a property on the `.statics` property, and now your method is accessible where ever your schema is used.

---

## Parallel Promises

While it might seem easy to use async/await for every JS promise. it can cause some issues when chaining together multiple **independent** AJAX calls. You would be _awaiting_ for every call to finish before you can make the next one, which forces your JS to be synchronous. Instead, you should reach for the `Promise.all` global method.

```js
const data1 = await req1 // Must finish --> 1s
const data2 = await req2 // Must complete 1 before starting --> 3s
const data3 = await req3 // Must complete 2, 1 before starting --> 2s
const data4 = await req4 // Must complete 3, 2, 1 before starting --> 1.5s
const data5 = await req5 // Must complete 4, 3, 2, 1 before starting --> 2.5s
const data6 = await req6 // Must complete 5, 4, 3, 2, 1 before starting --> 0.5s

// Total time before log: 10.5s
console.log("Complete data requests")
```

The `Promise.all` method takes in an array of promises and handles them in _parallel_, meaning they are each started at the same time. The return value is an array containing the resolved values of each promise!

```js
// Using the same times as above
const requests = [req1, req2, req3, req4, req4, req6]
// All requests start at the same time
const [data1, data2, data3, data4, data5, data6] = await Promise.all(requests)

// Total time before log: 3s
console.log("Completed data requests")
```

**Important Note**: The `Promise.all` method will only work if all requests are independent from one another. If they rely on each other's resolved data, this will not work.

---

## Virtual Fields

Another useful tool that can be used with MongoDB is a feature known as _Virtual Fields_. These are fields that are not explicitly stated in the schema, and contain data that can actually be inferred from the existing data. These aren't required but can make your life a lot easier the more complicated the models, and data you may work with.

A simplified example would be a schema which contains items which each have an item `price`, and an item `quantity`. A useful virtual field would to explicitly declare the `total`, mainly just for code clarity and to ease functionality later on. This can be done as follows:

```js
const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please provide an item name!'
    trim: true
  },
  price {
    type: Number,
    required: 'Please enter a price!'
  },
  quantity: {
    type: Number,
    required: 'Please enter a quantity!'
  }
});

orderSchema.virtual("total").get(function() {
  // Return the total price rounded to two digits
  return (this.quantity * this.price).toFixed(2);
});
```
