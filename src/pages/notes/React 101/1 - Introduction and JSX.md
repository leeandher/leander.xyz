## JSX

JSX stands for JavaScript and XML which is a syntax extension to produce elements in React. JSX looks nearly identical to normal HTML with a few minor exceptions.

### Importing React

Before starting with JSX, we must first source and import the libraries correctly. After properly sourcing react with the script tags, `React` and `ReactDOM` must be imported for practical use.

```javascript
import React from "react"
import ReactDOM from "react-dom"
```

To render JSX we declared earlier, we call the `ReactDOM.render()` function, where the first argument is a JSX expression and the second expression is the container element.

```javascript
// ReactDOM.render( JSX, location );
ReactDOM.render(test, document.querySelector("body"))
```

### Virtual DOM

'Rendering' JSX is React's way of saying that it's compiling the JSX and applying it to the Document Object Model (DOM).
The reason why React is so widely used is because of how effective and efficient it is at updating the DOM. Usually, when JavaScript makes changes to the DOM, it has to rebuild the entire model, even though maybe only one element is being changed. The Virtual DOM is a representation of the DOM, which isn't visible to any user. React notes the changes that come from a `ReactDOM.render()` call, and updates the Virtual DOM. The Virtual DOM is then compared to the actual DOM (this is called _diffing_) and **only changes the necessary specific objects on the real DOM**. Doing this avoids a lot of unnecessary DOM updating, and lets React run quicker and more efficiently.

### Declarations

JSX uses variables, and constants to store HTML element information. Every element can also store attribute information as well.

```javascript
const test = (
  <h1 className="main" id="my-title">
    Hello World!
  </h1>
)
```

JSX declarations can only contain a single outer element, but does allow for nesting, so declaration can extend across lines with the following syntax:

```javascript
const test = (
  <div>
    <h1>Hello World!</h1>
    <p>
      This how we handle <b>multi-line</b> syntax
    </p>
  </div>
)
```

### JSX-Specific Rules

- **Self-closing Tags**

JSX requires closed self-closing tags. `<br>` is not valid, `<br />` is the only valid option.

- **class vs. className**

JSX uses `className` as an attribute for element classes, since `class` is a reserved word in JS.

### Inserting JS

JavaScript can be inserted into JSX by way of curly bracket syntax:

```javascript
var myName = "leander"
const test = <p>My name is {myName}</p>

function returnName() {
  return myName.toUpperCase()
}
const test = <p>My name is {returnName()}</p>
```

- **if Statements**

JSX does not compile if statements in line. Instead, alternate declarations of the JSX expression.

```javascript
var num = 2;

const test = (
  <h1>Hello {
  if (num < 2) {
    return 'Friend';
  } else {
    return 'World';
  }
  }!</h1>
); // This will not compile
```

```javascript
var num = 2;

if (num < 2) {
  myText = 'Friend';
} else {
  myText 'World';
}
const test = <h1>Hello { myText }!</h1>; // This will compile
```

- **Ternary Operator**

Rather than use if/else statements, ternary operators do work inline, and provide an easy alternative.

```javascript
var num = 2
const test = <h1>Hello {num < 2 ? "Friend" : "World"}!</h1>
```

- **&& Operator**

The && operator is a little different from the logical AND operator. Functionally, it is a ternary operator without an alternative.

```javascript
var isHungry = true;
const test = <h1>I'm alive! {isHungry && 'And I'm hungry!'}</h1>;
```

- **Array.map() Usage**

The Array.map() method can be used to create JSX looped through arrays as well. Each item can be converted to JSX and used to easily populate lists.

```javascript
const nav = ["Home", "Products", "Contact"]
const navList = nav.map(item => <li>{item}</li>)
/*
                         <ul>
                           <li>Home</li>
<ul>{navList}</ul>  -->    <li>Products</li>
                           <li>Contact</li>
                         </ul>
*/
```

- **Keys**

When creating lists with React/JSX, each item should contain a key attribute if:

1. The item must remember a state/change (ex. item being ticked or not)
2. The item may shuffle location from instance to instance (ex. search results that aren't always in the same order)
   Without keys, list item states and locations may vary on each render. Keys can be applied as follows:

```javascript
const foods = ["sandwich", "pizza", "salad"]
const menu = foods.map((item, index) => <li key={food_ + index}>{item}</li>)
/*
                       <ul>
                         <li key="food_0">sandwich</li>
 <ul>{menu}</ul>  -->    <li key="food_1">pizza</li>
                         <li key="food_2">salad</li>
                       </ul>
 */
```

### Translation

Whenever we use JSX, we are actually using the imported React object's method `createElement()`.

```javascript
// React.createElement(type, {prop: value}, [...children]);
React.createElement(div, { id: "main", className: "circle" }, "My text") // === <div id="main" class="circle>My text</div>
```

Generally when using JSX, we don't ever need to use this method, but it's an introduction to `React`'s methods.
