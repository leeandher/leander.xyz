## Life Cycle Methods (LCMs)

React has certain methods that are called in response to certain times in a components _life cycle_. These methods are automatically bound to the component and simply need to be declared to be used. They can be split into three categories, **mounting**, **updating** and **unmounting** life cycle methods. They all follow the same process, so one unified example will be at the bottom of this note.

### Mounting LCM

These methods are invoked when the given component is being _mounted_ or _unmounted_. React uses the term 'mount' to describe the act of initializing the component into the DOM. That being said, mounting != rendering! **These functions will not be called every render, only when being added/removed from the DOM**. Here is the:

This method is invoked when the given component is _mounted_. React uses the term 'mount' to describe the act of initializing the component into the DOM. That being said, `mounting !== rendering`! **This function will not be called every render, only when being added to the DOM**. Here is the method:

- **componentDidMount()** : Called immediately after the component has rendered

A common use-case for this LCM is to retrieve any data that the component will need for it's render, so any AJAX, or API requests should probably go in here.

### Updating LCMs

These methods are invoked during the updating process (or re-rendering) of the given component. The method names are fairly self explanatory, but they operate slightly differently than the mounting LCMs. You can use these with regards to **whenever a component's state and/or props are changed**. Some of these methods also accept objects containing the the properties/state of the next render (`nextProps`, `nextState`), or the previous render (`prevProps`, `prevState`). The methods are as follows:

- **shouldComponentUpdate(_nextProps_, _nextState_))** : Called just before the new `render()` to determine if `this` component should re-render

_NOTE:_ `shouldComponentUpdate()` **must** return a Boolean if declared. If `true`, `this` component will re-render and the opposite if `false`.

- **componentDidUpdate( _prevProps_ , _prevState_ )** : Called after a component has updated (re-rendered)

### Unmounting LCMs

There's only one method here, and it's invoked during the _unmounting_ process. Simply stated, this is just **when the component is being removed from the DOM**, AKA the opposite of mounting.

- **componentWillUnmount()** : Called just before a component has been removed/_unmounted_

### Example

```js
class App extends React.Component {
  constructor(props) {...}
  componentWillMount() {
    //ex. show a loading bar
  }
  componentDidMount() {
    //ex. change opacity to show a load
  }
  componentWillReceiveProps( nextProps ) {
    //ex. change something based on a future prop
  }
  shouldComponentUpdate() {
    //if ( someCondition ) return true
    //  true -> component updates
    //  false -> component doesn't update
    //ex. don't update if certain state
  }
  componentWillUpdate() {
    //ex. do a flashy change animation
  }

  componentDidUpdate() {
    //ex. log the change
  }
  componentWillUnmount() {
    //ex. say goodbye
  }
  render() {
    //actually render the component
  }
}
```

### Execution Order

If we were to have each of the functions applied to one component (see example above), a good question to ask would be about the execution order. Remember, _mounting_ occurs on 'load'/'unload', _updating_ occurs on 're-rendering'. Therefore, **no updating LCMs take place in the Mounting Order and vice versa**. Knowing this, we have two separate orders:

#### Mounting Order

If the component is now being initialized, rendered, then removed from the DOM, the execution order is the following:

- render()
- componentDidMount()

#### Updating Order

If the component has it's `props` changed and re-renders, the execution order is the following:

- shouldComponentUpdate()
- render()
- componentDidUpdate()

If the component has it's `state` changed via `this.setState()`, the execution order is the same **except that it will not include _componentWillReceiveProps()_**.

---

**For more in-depth details on LCMs, visit [the React Docs](https://reactjs.org/docs/react-component.html#the-component-lifecycle)**
