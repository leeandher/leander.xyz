# Learn Redux

A quick place for notes about stuff that I pick up throughout the [Learn Redux][learnredux.com] course.

---

## `React.cloneElement()` and `props.children`

So quick refresher because I totally forgot about the existance of `props.children`. Essentially it allows you to plan where the contents of a component may go when rendered. Take a look:

```js
// Header.js

const Headline = props => (
  <div className="page-header">
    <h2 className="article-title">{props.title}</h2>
    <section className="article-info">{props.children}</section>
  </div>
)
```

```js
// Page.js

class App extends React.Component {
  // ...some fake logic
  render() {
    return (
      <Headline title="A crazy story!">
        <Writer />
        <Editor />
        <Publisher />
        <Content />
      </Headline>
    )
  }
}
```

```html
<!-- Rendered HTML -->
<div class="page-header">
  <h2 class="article-title">A crazy story!</h2>
  <section class="article-info">
    <div class="article-writer">...</div>
    <div class="article-editor">...</div>
    <div class="article-publisher">...</div>
    <div class="article-content">...</div>
  </section>
</div>
```

Simple enough. You can render whatever you want, where ever you want. But with this method, we actually can't pass props down to our nested components.

In order to do that, we can use the React Top-Level API to clone an element with the props nested!

```js
// Header.js

const Headline = props => (
  <div className="page-header">
    <h2 className="article-title">{props.title}</h2>
    <section className="article-info">
      React.cloneElement(props.children, props)
    </section>
  </div>
)
```

Now we will generate the same HTML, except our `props` information is easily passed down. It essentially is the same as having the following JSX snippet:

```js
<Headline title="A crazy story!">
  <Writer title="A crazy story!" />
  <Editor title="A crazy story!" />
  <Publisher title="A crazy story!" />
  <Content title="A crazy story!" />
</Headline>
```

---

## Index Routes

React Router allows you to create nested routes by simply putting `<Route>` component within another `<Route>` component. With this, you get the following:

```js
// Always render the Main component
<Route path="/" component={Main}>
  {/* Default to the PhotoGrid component */}
  <IndexRoute component={PhotoGrid} />
  {/* On route '/view/anything' show the Single component*/}
  <Route path="/view/:postId" component={Single} />
</Route>
```

This can be useful when creating complicated nested logic for single page applications. Remember though, this is client-side routing, and doesn't actually ping the server when switching routes.

---

## Sentry Error Watching

[Sentry](sentry.io) is an online error-tracking service which can make it easy to follow and get information about bug reports in many different applications. For the purpose of this course, Sentry was used to report errors in a front-end React/Redux application. To get started with sentry in frontend JS, it's best to set up a config file.

```js
// config.js
import Raven from "raven-js"

// Our app specific Sentry URL
const sentry_key = "09d93d04d1464364a4f37ada41799fc3"
const sentry_app = "1331156"
export const sentry_url = `https://${sentry_key}@app.getsentry.com/${sentry_app}`
```

Now we go to the root of our application (or whenever we may choose) and we can create an error stream. When we access the `sentry_url` and sign in with the appropriate credentials, Sentry will tell us exactly what happened to cause the error, and that can help us (as developers) solve the issue quickly.

```js
// Import our SDK
import Raven from "raven-js"
// Import our error stream (and a custom exception handling method)
import { sentry_url, logException } from "./data/config"

// Let Sentry watch our code for errors
Raven.config(sentry_url).install()
```

The following are some examples of how we can use Sentry's error tracking API to organize how we combat bugs.

```js
// Send custom data along with all errors
Raven.config(sentry_url, {
  tags: {
    git_commit: "asdf9876",
    userLevel: "editor",
  },
}).install()

// Don't send an error with a stack trace, just send a message
Raven.captureMessage("Something went wrong!")

// Ask the user for feedback when an error occurs
Raven.showReportDialog()

// You can declare a logException method in your config.js for simplicity
export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context,
  })
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex)
}

// If the exception goes through, send the error with some additional info
logException(new Error("Some error occurred!"), {
  email: "fake@gmail.com",
})
```

---
