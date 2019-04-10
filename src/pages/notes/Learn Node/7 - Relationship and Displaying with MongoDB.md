# Learn Node

_A compilation of useful notes and tricks that could come in handy in the future. Better to be safe than sorry!_

---

## Auto-populating Hooks

There's an inconvenience you might encounter with constantly having to populate your `ref`'d fields, because an `ObjectId` does you no good. Well, if it's something that you do for every time this model is put into use, you can specify this behavior via an **auto-populating hook**. These are just normal hooks which invoke the `.populate` method ahead of time:

```js
// In Review.js, after the reviewSchema declaration

// Define our hook
function autopopulate(next) {
  this.populate("author")
  next()
}

// Automatically populate author before 'find' and 'findOne'
reviewSchema.pre("find", autopopulate)
reviewSchema.pre("findOne", autopopulate)
```

Now whenever we invoke `.find` or `.findOne`, we will get the `author` data along with the request!

---

## Interpreting Virtual Fields

By default, MongoDB doesn't actually give us the virtual fields when we ask for them. It's hard to describe, but let's say we had the virtual field of `isRookie` on our `User` schema. If we logged one of the documents it would do the following:

```js
const user = User.findOne({}) // Get a random user
console.log(user)
/* -> {
  name: ...
  age: ...
  email: ...  
}*/

// NOTE: we don't get the `favColour` field
```

This can be a bit confusing, but don't worry, our data isn't lost. Instead MongoDB hides it from us unless we explicitly ask for it. So, this would work:

```js
const user = User.findOne({}) // Get a random user
console.log(user.isRookie) // --> 'true'
```

We can change this behavior by specifying it in our actual schema:

```js
const userSchema = new mongoose.Schema(
  {
    // ...
    // ...
    // ...
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)
```

Now if we ever invoke our entire user as `JSON` or as an `object`, we will see the virtual field, since MongoDB knows to give it to us!

```js
const user = User.findOne({}) // Get a random user
console.log(user)
/* -> {
  name: ...
  age: ...
  email: ...  
  isRookie: true
}*/
```

---

## Virtual Population

In a lot of cases you're going to have multiple models which contain information about each other, and you're going to need a way to link them. We already know about using the `ref` attribute to refer to other models within our database, but there's a niftier solution in order to keep our data one directional.

Think about this situation. If you have a bunch of stores in a `Store` model, and a bunch of reviews for those stores in a `Review` model, how would you show the review information on the store page? Well, you could just query all the stores and filter by whichever store matches with the store ID, but this could have issues. If later on, you'd like to give the store an overall rating based on these individual review, how would you assign that value to our `Store` model? Another `ref`? Well no, because you'd be putting `ref`'s back and forth, and man oh man is that gonna get complicated.

Instead, `mongoose` has the ability to do _Virtual Population_. Similar to a normal virtual field, except we can actually we're pre-populating the `ref` outside of our schema, but before it's ever called. This is done by specifying field name, and the following values:

```js
storeSchema.virtual("reviews", {
  ref: "Review", // Which model to JOIN with
  localField: "_id", // Which field on THIS model
  foreignField: "store", // Which field on THAT model
})
```

---

## Aggregating Virtuals

Whenever you're aggregating data for complex queries, its better to offload the work to the database. So, we perform the aggregation in the schema file itself, in this case, `Store.js`. This aggregation is pretty complicated but well commented, so look through and I'll explain afterwards:

```js
storeSchema.statics.getTopStores = function() {
  return this.aggregate([
    // 1. Lookup stores and populate their reviews (essentially create our virtual again)
    {
      $lookup: {
        from: "reviews", // MongoDB makes our Model lowercase and adds an 's', Review -> reviews
        localField: "_id",
        foreignField: "store",
        as: "reviews",
      },
    },
    // 2. Filter for only items with 2 or more reviews
    { $match: { "reviews.1": { $exists: true } } },
    // 3. Create the averageRating field
    {
      /* IF ON MONGODB <3.2
      $project: {
        // We have to specify the fields we want because $project removes all other data 
        photo: "$$ROOT.photo", // $$ROOT -> represents our original document
        name: "$$ROOT.name",
        reviews: "$$ROOT.reviews",
        averageRating: { $avg: "$reviews.rating" } // $ -> represents a field we've just made
      }
      */

      // IF ON MONGODB >3.2, use $addFields -> Note: this returns excess data
      $addFields: {
        averageRating: { $avg: "$reviews.rating" }, // $ -> represents a field we've just made
      },
    },

    // 4. Sort it by our new field, highest first
    {
      $sort: {
        averageRating: -1,
      },
    },
    // 5. Limit to 10 results
    { $limit: 10 },
  ])
}
```

So the reason I'm calling this section **Aggregating Virtuals** is because it is a required side-step from the last note, specifically when it comes to creating an aggregate pipeline. We can create the fields with that handy `join` function because `mongoose` allows us to, but it isn't baked into MongoDB. We have to manually create the virtual field in our pipeline, so that is specified as step 1.

```js
// 1. Lookup stores and populate their reviews (essentially create our virtual again)
{
  $lookup: {
    from: "reviews", // MongoDB makes our Model lowercase and adds an 's', Review -> reviews
    localField: "_id",
    foreignField: "store",
    as: "reviews"
  }
},
```

Then we perform a filter to see the data we want, that's step 2:

```js
{ $match: { "reviews.1": { $exists: true } } },
```

Next, we perform we want to create a new pseudo-field, which we can do via projection. Problem is, that will get rid of the old data. **If using MongoDB v3.2 or less, you must manually add it back it**, otherwise, you can just use **\$addFields to specify the new fields**. Step 3:

```js
{
  /* IF ON MONGODB <v3.2
  $project: {
    // We have to specify the fields we want because $project removes all other data
    photo: "$$ROOT.photo", // $$ROOT -> represents our original document
    name: "$$ROOT.name",
    reviews: "$$ROOT.reviews",
    averageRating: { $avg: "$reviews.rating" } // $ -> represents a field we've just made
  }
  */

  // IF ON MONGODB >v3.2, use $addFields -> Note: this returns excess data
  $addFields: {
    averageRating: { $avg: "$reviews.rating" } // $ -> represents a field we've just made
  }
},
```

Lastly we sort and filter:

```js
// 4. Sort it by our new field, highest first
{
  $sort: {
    averageRating: -1
  }
},
// 5. Limit to 10 results
{ $limit: 10 }
```

That's it. Remember to create these aggregation pipelines within the schema file to offload the work and await times. Use `schema.statics.functionName` to create them!
