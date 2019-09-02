# Setup with Next

## What is Next.js?

**_Next.js_** is actually what I like to call, a super framework. It takes _React.js_ the already powerful front-end framework, and adds a structure to it, which is helpful for setting up applications. Think of it like React is every word in the world, and Next is just your notebook, providing you a clean simple interface, to apply those words.

With that comes some handy helpers, including _Server-side Rendering_, _Routing Structure_, _Simple Page Creation_, and _State-Page Management_ all setup out of the box with the install. That is why when using Next.js, you'll find a lot of your basic imports coming from `next/$MODULE_NAME` rather than the normal module itself. Next has added it's own flavor to it to help you adhere to their application structure.

---

## What you should know

Next.js is pretty special, in that it does a lot of the heavy lifting for you. All you have to worry about is your React application. IT handles _Webpack_, _React Router_, _React_, and _React-DOM_ for you! You access their API's and plugins if you want to make changes to these, but for 99% of cases, you won't have to. Of course, _SSR_ is also handled, but with that comes _Code splitting_ (for smaller bundle sizes), _faster first loads_, and improved _SEO_.

That being said, while it seems like you don't get as much freedom as the basic CRA, it is outweighed by the amount of DevOps boring benefits you won't have to deal with. **Note:** There is another SSR React Framework option known as **_Gatsby.js_**, and definitely choose this for static sites, it's much more strict, but much faster, due to being run only at build time! For applications thought, **_Next.js_** is choice!

---

## Folder Structure

Most simply React apps start with creating your DOM element to host the app, something like `<div id="root"></div>` or `<div id="app"></div>`, then creating a large HOC inevitably called `App.js` or `Main.js`, and admitedly, even CRA starts you down this path, but next has all of that setup out of the box. In fact it starts you up with an `_app.js` file as your application root component!

Since you're developing an application in the 21st Century, you should use a proper folder structure. I recommend this one:

```
frontend
  |__.next (do not touch)
  |__components (reusable stuff)
    |__styles (styling)
  |__lib (helpers)
  |__node_modules (duh)
  |__pages (all application pages)
    |__ _app.js (reserved base component file)
  |__static (fonts, init-css, icons)
```

Now you should be good to go! Follow the exact setup guide over [here](https://nextjs.org/docs/).
