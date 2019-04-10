## Actual Jotted Notes

---

In order to ensure an object property exists before calling on its children, you can use the `&&` operator to check before causing a `TypeError`.

```js
const obj = {
  loc: {
    address: {
      type: String,
      required: "You must supply an address!",
    },
  },
}
console.log(obj.loc.coords && obj.loc.coords.length) // --> undefined
console.log(obj.loc.coords.length) // --> TypeError

obj.loc.coords = [45.789234, -135.123456]

console.log(obj.loc.coords && obj.loc.coords.length) // --> 2
console.log(obj.loc.coords.length) // --> 2
```

---

At any point in a node script, you can use the variable `__dirname` which will reference the folder file location in which the call is being made. This is useful for grabbing templates, images, or other files from other relative locations, as seen in the following example.

```js
exports.send = async options => {
  const html = generateHTML(options.template, options)
  // ... some functionality
}

// Generate HTML via a template
const generateHTML = (template, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/email/${template}.pug`,
    options,
  )
  const inlined = juice(html)
  return inlined
}
```

The above is also a good example of limiting exports in your javascript. Since we don't ever need to access the `generateHTML` function, it is not exported, and instead declared within the file for internal use only. This should be used whenever functionality needs to happen within a controller/handler, but not externally, which is a security benefit, but also just helps maintain your codebase. You can think of these guys like your inner '_helper_' functions.

---

Pagination can be easily implemented by just counting the results and splitting them up by the number you wish to show on the page. Calling these requests in parallel will negate any increases in loading time, and clean up your code too.

The code is pretty logical, so I invite you to take a look at it yourself, and read the comments for clarity.

Here was the original, without pagination:

```js
// On the '/stores' route
exports.getStores = async (req, res) => {
  const stores = await Store.find()
  res.render("stores", { title: "Stores", stores })
}
```

Here's the pagination version:

```js
// On the '/stores' and '/stores/page/:page' route
exports.getStores = async (req, res) => {
  // Get the current page (or default to 0)
  const page = req.params.page || 1
  // Define our limit per page
  const limit = 6
  // Define how many we should skip
  const skip = page * limit - limit

  // Create the two promises
  const storesPromise = Store.find()
    .skip(skip)
    .limit(limit)
    .sort({ created: "desc" }) // Sort by the most recently created
  const countPromise = Store.count()

  // Evaluate them in parallel
  const [stores, count] = await Promise.all([storesPromise, countPromise])

  // Evaluate our total pages
  const pages = Math.ceil(count / limit)

  // If the user tries an exceedingly large page number
  if (!stores.length && skip) {
    req.flash(
      "info",
      `Hey, You asked for page ${page}, but I couldn't find it, so I put you on page ${pages}`,
    )
    return res.redirect(`/stores/pages/${pages}`)
  }

  // Render the page!
  res.render("stores", { title: "Stores", stores, page, pages, count })
}
```
