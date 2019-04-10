# Learn Node

_A compilation of useful notes and tricks that could come in handy in the future. Better to be safe than sorry!_

---

## Introduction

Databases are used for their ability to manipulate and provide/take data from the end user. The most practical and widespread use of these interactions must be done through a REST API, since we never want to give direct access to anyone who isn't authorized. An API like this provides a line of communication between our app and the data it stores.

**Asynchronous JavaScript and XML** just describes the way in which we fetch data. It's done asynchronously, so we have to wait until the data returns before we continue using it.

An **Application Programming Interface (API)** is a technical way of describing how different technologies speak to one other. It determines the way of getting and providing information between programs.

The type of API is referred to as **Representational State Transfer**, and it describes the set of constrains we use when using the API. In most cases, all you need to know is that any calls don't actually pass you the data itself, but rather a _representation_ of the data. You can then manipulate it however you like, and pass it back to the data base performing any of the HTTP CRUD (Create, Read Update, Delete) methods: `GET`, `POST`, `PUT`, `DELETE`, etc.

---

## Creating Indexes for Querying

When working with databases asynchronously (AJAX) we always have to think about the time it would take to deliver our data to the user. If there is any way we can make that faster, we should look into it. Thankfully, most databases come built-in with a feature to make our querying that much faster. These are referred to as _indexes_.

In essence, indexes are just a database's way of identifying which fields will be queried most often, and sorting them for querying in a faster way. We simply tell our database to be prepared for lots of queries on this set of fields, and it takes care of the rest. Take the following example:

```js
// Within our Store.js Schema

// Define our indexes
storeSchema.index({ name: "text" })
```

Take note, indexing must always take place on the schema, it isn't some sort of parameter that the user should be able to toggle. We have to understand how our data collection will be called upon when we define our indexes.

For MongoDB we've defined our type of index as a `text` index, which means we will be searching through the string on the field `name` for our documents.

Fairly straight forward, but we can also create special indexes for searching dynamically through multiple fields. These are referred to as **compound indexes**.

```js
// Within our Store.js Schema

// Define our indexes
// We've indexed these fields into a 'compound index'
// This will let us search through both fields at once
storeSchema.index({ name: "text", description: "text" })
```

In essence, now when we search via our `$text` index, we will be able to check both the name and description for whatever the query may be! Check out the following use case:

```js
exports.searchStores = async (req, res) => {
  const stores = await Store
    // Find stores that match the query
    .find(
      {
        $text: {
          $search: req.query.q,
        },
      },
      // Create a projection
      { score: { $meta: "textScore" } },
    )
    // Sort them by the projection
    .sort({
      score: { $meta: "textScore" },
    })
    // Limit to only five results
    .limit(5)
  res.json(stores)
}
```

---

## Query Projections

Short little note here, but we can refer to the above example. A projection is just an _invisible_ field that can be added to our query at run time, usually containing _metadata_. Now that can be confusing, but if we break up the example and look at it, we can see it's not that bad.

So in our `.find()` model method, we are using two parameters:

```js
/* .find( 
  conditions --> Object, required
  [projection] --> Object/String, optional
)*/
```

In this case our condition is:

```js
// Query our data
{
  $text: {
    $search: req.query.q
  }
}
```

and our projection is

```js
// Create a projection
{
  score: {
    $meta: "textScore"
  }
}
```

The above object says that we're adding a new field called _score_ and we're going to assign it a value derived from metadata (`$meta`) which is its _textScore_. In this case, the textScore is just how many occurrences of our query term show up in the document. Then we use that info to sort!

```js
// Sort them by the projection
.sort({
  score: { $meta: "textScore" }
})
```

Now what we've done is sort our data by which document has the highest `textScore`. Essentially, whichever has the most occurrences of our key term, that one gets preference!

---

## Handling Geo-spatial Data

In case we want to use MongoDB for location data queries, we can use the builtin `geospatial` to easily do so. Simply declare the index as you normally would, but this time, index the `Point` location as a `2dsphere`.

```js
// In Store.js
storeSchema.index({ location: "2dsphere" })
```

Now we can use some special operators in through mongoose and MongoDB in order to perform some complicated math with our data. Checkout the following code, for a good example:

```js
exports.getNearby = async (req, res) => {
  // Remember, [lng, lat] for MongoDB
  const coordinates = [req.query.lng, req.query.lat]
  const q = {
    location: {
      // Return results based on proximity to coordinates
      $near: {
        // Our data point
        $geometry: {
          type: "Point",
          coordinates,
        },
        // Limit results to within 10km of coordinates
        $maxDistance: 10000,
      },
    },
  }
}
```

Using queries and operators such as this, we can let our database handle the mapping and distance mathematics and just focus on building the project.

---

## Reducing Overhead

When developing APIs, one big concern you must always make sure you take into account is whether or not the data being returned is all critical. To keep the requests fast, we generally index important fields, but the response itself can also be made faster by reducing the 'overhead'. This essentially means reducing the amount of data we are sending by trimming the object down to the essentials. Why send `name`, `description`, `age`, and `displayPicture` when all you need from the query is `email`? It's things like that.

Since our mongoose methods return the document in it's entirety, we have to limit the return data ourselves. Thankfully the `.select()` method is perfect for this, as it allows you to specify the fields you either want or do not want returned from your query. Take this example.

```js
// This is a query for a user profile where we need some preliminary info
// We can specify the exact fields we'd like via:
const userProfile = await User.find(query).('name age bio photo')

// Or instead, we can just specify what we DON'T want returned
const altUserProfile = await User.find(query).('-email -hash -salt -settings -notes')
```

---

## Instant Feedback APIs

When developing applications, there are many instances in which the user wants immediate feedback on an action they take without having to have their page reload. This is what happens when you 'like' a post/page or leave a comment on a website. Since you can see the change immediately, this event needs to be handled in the frontend and backend to ensure the data works for both. Structurally, the backend makes the change, and the front-end verifies that it worked to show the user the change, they are not independent.

First we can take a look at the backend and see how we'd develop some controller to handle a _toggle_ API (like a button we can both 'like' and 'unlike' with). We just have to make the operation depend on the existing state of the database, as shown:

```js
// When the user 'hearts' a store
exports.heartStore = async (req, res) => {
  // Get their list of hearts
  const hearts = req.user.hearts.map(obj => obj.toString())
  // Decide whether to add/remove this store
  const operator = hearts.includes(req.params.id) ? "$pull" : "$addToSet"
  // Update
  const userHearts = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      [operator]: { hearts: req.params.id },
    },
    { new: true },
  ).select("hearts")
  res.json(userHearts)
}
```

Now this change doesn't render a new page or anything, instead we just pass data back to the user, making sure to add `{ new: true }` so we ensure the new data is being sent. When we receive this update in the frontend, we can use it to change classes, or dynamically update content to visually show the user the action was successful. Here we can see the API handling going on in the frontend:

```js
function ajaxHeart(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then(res => {
      // Checks the button for the 'hearted' class
      const isHearted = this.heart.classList.toggle("heart__button--hearted");
      $(".heart-count").textContent = res.data.hearts.length;
    })
    .catch(console.error);
```

If the response is successful, we're going to toggle the class, and update the counter with the number of 'hearts' in the array. This `POST` action might seem odd coming from a button, but this is actually a useful trick to ensure that even if a user doesn't have JavaScript turned on, or something goes wrong, the button can still act as a form:

```pug
//- ...
if user
  .store__action.store__action--heart
    form.heart(method="POST" action=`/api/stores/${store._id}/heart`)
      - const heartStrings = user.hearts.map(obj => obj.toString())
      - const heartClass = heartStrings.includes(store._id.toString()) ? 'heart__button--hearted': ''
      button.heart__button(type="submit" name="heart" class=heartClass)
        !=h.icon('heart')
//- ...
```
