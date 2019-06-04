## Styling in React

### The _style_ attribute

It's time to start looking at the visuals of our projects. If we want to add some _style_ to an element, we can do so with the `style` attribute, just like in normal HTML. The style attribute takes an object which contains all of our desired effects.

```javascript
function StylishComp(props) {
  return (
    <div style={{ height: "100px", width: "100px", background: "blue" }}>
      Tester
    </div>
  )
}
```

_Note_: When using inline styling, we must use two curly braces on each side. Why? Well the `style` attribute takes an object literal, and to declare one, we have to tell JSX we want to insert JavaScript. So, the outer set says "here's our JS" and the inner set declares our styling object.

### React Notation

React handles styles quite differently from regular javascript, the main difference being in notation. Conventional javascript uses style objects in hyphenated-lowercase, while React uses the same names in camelCase. Along with that, React also defaults to `px` values which allows you to shortcut some notation!

```javascript
// Regular javascript notation
const styles_1 = {
  background: "lightgreen",
  color: "green",
  "margin-top": "100px",
  "font-size": "50px",
}
// React notation
const styles_2 = {
  background: "lightgreen",
  color: "green",
  marginTop: 100,
  fontSize: 50,
}
// Both styling objects make the same changes
```

### Sharing Styles

Another cool feature about React is the ability to import and export styles objects to be used across components. It's pretty self explanatory, check this out:

```javascript
// stylesheet.js
export const defaultStyling = {
  fontFamily: "Titillium Web",
  background: "light blue",
  fontSize: 32,
  padding: 15,
  color: "dark blue",
}

// StyledComponent.js
import React from "react"
import ReactDOM from "react-dom"
import { defaultStyling } from "./stylesheet.js"

function StyledComponent(props) {
  return <div style={defaultStyling}>{props.message}</div>
}

ReactDOM.render(
  <StyledComponent message="I'm stylish!" />,
  document.getElementById("app"),
)
```
