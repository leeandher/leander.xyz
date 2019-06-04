# Learn Node

_A compilation of useful notes and tricks that could come in handy in the future. Better to be safe than sorry!_

---

## Managing Models

Models are created through the declaration of a database schema. Specifically for MongoDB, this can be done easily through the `mongoose` package. The `mongoose.Schema()` method will create a table schema through the object which you pass to, defaulting to _strict_ mode. Here's an example:

```js
const mongoose = require("mongoose") // Import the mongoose package
mongoose.Promise = global.Promise // Tell mongoose to use the global Promise object on it's DB interactions
const storeSchema = new mongoose.Schema({
  name: {
    type: String, // Only accept Strings
    trim: true, // Get rid of preceding/terminating whitespace
    required: "Please enter a store name!", // Must be given
  },
  description: {
    type: String,
    trim: true,
  },
  tags: [String], // Only accept an array of strings
})

// Export the storeSchema applied to a table entitled 'Store'
module.exports = mongoose.model("Store", storeSchema)
```

Models can also perform helpful operations on the data which is passed to it, depending on the action which is take. For example, the following snippet takes effect before the `.save()` method is called on the `storeSchema`. If the `name` of the store has been modified, then create the slug, and move on.

```js
// The save method creates an entry in the storeSchema table
storeSchema.pre("save", function(next) {
  // Skip it and stop this function
  if (!this.isModified("name")) return next()
  // Create the slug
  this.slug = slug(this.name)
  next()
})
```

There is a little bit to remember about creating models, you have to import them into your app at least once. In this specific app, it is done in `start.js` with following line:

```js
require("./models/User")
```

Then, wherever the models are used, they can be imported similarly to any other node package with the following:

```js
const User = mongoose.model("User")
```

---

## Async/Await

Since JavaScript is an asynchronous scripting language, making requests to external resources is a problem, especially if multiple need to be made before any sort of user response. Modern JavaScript is way past _[Callback Hell](http://callbackhell.com/)_, since the introduction of the `global.Promise` object. Now, in order to make a bunch of calls, you can simply chain them:

```js
doSomething()
  .then(function(result) {
    return doSomethingElse(result)
  })
  .then(function(newResult) {
    return doThirdThing(newResult)
  })
  .then(function(finalResult) {
    console.log("Got the final result: " + finalResult)
  })
  .catch(failureCallback)
```

<small>Example credits to [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavasScript/Guide/Using_promises)</small>

But even this can get pretty confusing pretty fast. Another way to handle this is with `async` and `await` notation. To use this notation, preface the asynchronous function with the keyword `async` to denote the fact that a promise will be taking place inside. Then, simply put the keyword `await` in front of the call, in order to tell js not to continue until this response is completed.

```js
// The finished message ill only log after the new store has been saved
exports.createStore = async (req, res) => {
  const store = new Store(req.body)
  await store.save() //This line saves the new store to the database
  console.log("Finished!")
}
```

There is a trade off however; the error handling, which is critical when depending on external resources. Since physically impossible to write code without errors in it, the `async/await` calls need to be `try`'d in order to `catch` any errors in reading/writing to the database or API. This is because there is no callback function which naturally catches the error. However, there is a way of conveniently catching errors using a helper function.

```js
// This function is middleware which accepts a function
exports.catchErrors = fn => {
  // It then returns the output to a 'parent' function
  return function(req, res, next) {
    // The parent function outputs our input function followed by .catch() in order to catch the error, and skip to the next middleware.
    // This error is caught in the next middleware
    return fn(req, res, next).catch(next)
  }
}
```

---

## Simple Control Flow

The MVC design pattern is really helpful for developing a clean modular codebase. The general architecture is as follows:

1. Create the route for the process initiation. This would cover the exact URL (ex. `stores/create`, as well as the action, `get` or `post`)

```js
const express = require("express")
const router = express.Router()

router.get("/add", placeholderController)
```

2. Create (and handle errors) for operations through the appropriate controller (ex. group all the actions related to store management under `storeController.js`)

```js
const storeController = require("../controllers/storeController")
router.get("/add", catchErrors(storeController.addStore))
```

```js
// Within storeController.js
exports.addStore = async (req, res) => {
  // some functionality...
  res.render("placeholderTemplate")
  // or res.redirect() to another route which renders
}
```

3. Create/Use the appropriate template to render the request (ex)

```js
// Within storeController.js
exports.addStore = async (req, res) => {
  // some functionality...
  res.render("editStore") //views/editStore.pug
  // or res.redirect() to another route which renders
}
```

```pug
<!-- Within editStore.pug -->
extends layout

block content
  .inner
    h2= title
    form(action=`/add/${store._id || ''}` method="POST" class="card")
    label(for="name") Name
    input(type="text" name="name" value=store.name)
    label(for="description") Description
    textarea(name="description")= store.description
    //- ...
```

1. Use mixins, along with redirects and other route controllers to create the complex stuff!

```pug
//- Since the store creation, and store editing both use the same form, it can be used as a mixin instead of being duplicated
<!-- Within editStore.pug -->
extends layout

include mixins/_storeForm

block content
  .inner
    h2= title
    +storeForm(store)
```

```pug
<!-- Within _storeForm.pug -->
mixin storeForm(store = {})
  //- enctype="multipart/form-data"
  form(action=`/add/${store._id || ''}` method="POST" class="card")
    label(for="name") Name
    input(type="text" name="name" value=store.name)
    label(for="description") Description
    textarea(name="description")= store.description
    //- ...
```
