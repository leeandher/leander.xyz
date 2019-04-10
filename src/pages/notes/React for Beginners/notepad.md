## React For Beginners

_A compilation of useful notes and tricks that could come in handy in the future. Better to be safe than sorry!_

---

Avoid binding process functions by instead declaring them as properties directly bound to the instance.

```javascript
// Instead of this:
constructor() {
  super();
  this.doTheThing = this.doTheThing.bind(this)
}
function doTheThing(params) {..

// Consider this:
doTheThing = (params) => {...
```

---

In order to gather the data from from forms or input fields, react uses special properties known as _references_ or _refs_.

To use a ref, simply declare it using the `createRef()`

```javascript
myInput = React.createRef();

displayInput = () => console.log(this.myInput.value.value);
// returns "this is an example"

render() {
  return (
    <input
      type="text"
      ref="{this.myInput}" defaultValue="this is an example"
    />
  )
}
```

---

Using the ES6 feature, `Computed Property Names`, an state handler can be done dynamically in order to pass property changes to a parent component. Take a look at the following code:

```javascript
handleChange = event => {
  const updatedData = {
    ...this.props.item,
    [event.currentTarget.name]: event.currentTarget.value
  }
  this.props.stateUpdateFunction(updatedData)
}
render() {
  return (
    <input
      type="text"
      name="details"
      onChange={this.handleChange}
      value={this.props.item.details}
    />
  )
}
```

Assuming we had multiple input fields which changed a property on the state item, this method will systematically take care of each property, so long as the `name` attribute coordinates to the `property-name`. This eliminates the need to make multiple handler functions, ex: `handleNameChange()`, `handlePriceChange()`, or `handleDetailsChange()`.
