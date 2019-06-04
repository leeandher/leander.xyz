## Component States

### Initial States

Components in React also have a special object known as the `state`. The `state` object represents the current `state` of any component instance. It requires a constructor method.

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: "An example" }
  }
  render() {
    return <h1>{this.state.title}</h1>
  }
}
```

Since our component `Example` is a subclass of `React.Component`, we call the `constructor` and the `super()` function to inherit properties and call the constructor of the parents. Inheritance and class based programming information can be found here: http://exploringjs.com/es6/ch_classes.html.

### Changing States

A component doesn't only read it's own state, it can change it's state, using the function `this.setState()`. React changes states by _merging_ with the old state, preserving what it can. Take a look at this:

```javascript
// Let's say this was the initial state
{
  mood: 'great',
  hungry: false
}
// We can change the initial states by the following
this.setState({
  hungry: true,
  status: "just ate"
});
// Now if we were to call the 'state' object...
{
  mood: 'great',
  hungry: true,
  status: "just ate"
}
```

`this.setState()` can only accept objects, but does using ES6 arrow notation, we can also slip in some easy functions which would return objects. For example:

```javascript
// initial state
{
amHungry: true,
burgersEaten: 0
}

this.setState({
  amHungry: false,
  burgersEaten: 2
}); // this is hard-coded

this.setState( (currentState) => (
  currentState.burgersEaten ++;
  return {
    amHungry: Boolean(burgersEaten > 1),
    burgersEaten: currentState.burgersEaten
  };
) ); // this is functional

```

### Changing States from Another Function

In order to allow a function to change the state of a component instance, we first need to `bind` it. That means that we insert a line in the constructor which links the function's operation to that specific instance, rather than every rendered instance of that component. Here's an example:

```javascript
  constructor(props) {
    super(props);
    this.state = {state: stateValue};
    this.function = this.function.bind(this); // Now the function will only operate on this instance
  }
```

If we invoke a state change, it needs to be done in a separate function for clarity. Take a look:

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: '#FDFDFD'};
    this.changeColour = this.changeColor.bind(this);
  }
  changeColor() {
    this.setState(color: this.state.color === '#FDFDFD' ? '#4DCCB0' : '#FDFDFD');
  }
  render() {
    return (
      <button
        style={{background: this.state.color}}
        onClick={this.changeColor}>
        Change Color
      </button>
    );
  }
}
```

If we were to render this `Toggle` component, every time the button element is clicked, it's background would change color, even though we aren't re-rendering it, we are just changing the state value. This is because **`this.setState()` automatically invokes the `render()` function after completing the change**.
