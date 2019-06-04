## Component Relationship Patterns

### Distinguishing State and Props

Before moving forward into more complex React, we need to understand the distinguishing feature between `state` and `props`. They are both methods for giving data to a component but are not interchangeable, they key separator being: **states contain _dynamic_ information, while props are _passed static_ information**.

That is, `this.state` can change it's value:

```javascript
...
constructor(props) {
  super(props);
  this.state = {message: 'first message'} );
}
this.setState( {message: 'second message'} );
// this.state => {message: 'second message'}
...
```

but `this.props` cannot:

```javascript
// Parent Component ...
render() {<ChildComponent message="first message" />}

// Child Component ...
this.props.message = "second message"; // INVALID
render() { return <h1>{this.props.message}</h1> } // "first message"
```

Properties are only passed onto component and should not be generated or changed for any reason. If part of a component needs to change, the solution isn't to figure out how to change the `props`, but to convert to a system which leverages `state` instead.

This gets confusing when you think of this next example. Imagine building a list of online/offline friends. To do so in React, we'd make a parent component with `state` of both 'online' and 'offline' friends. Then we simply pass the `states` to two separate list components as properties. Check this out:

```javascript
function OnlineFriendsList(props) {
  const onlineFriends = props.list.map(friend => <li>{friend}</li>);
  return (
    <div>
      <h1>Online</h1>
      <ul>{onlineFriends}</ul>
    </div>
  );
}
function OfflineFriendsList(props) {
  const offlineFriends = props.list.map(friend => <li>{friend}</li>);
  return (
    <div>
      <h1>Offline</h1>
      <ul>{offlineFriends}</ul>
    </div>
  );
}
class FriendsList extends React.CreateElement {
  constructor(props) {
    super(props);
    this.state = {
      onlineList = onlineFriendsArray,
      offlineList = offlineFriendsArray
    };
  }
  render() {
    return (
      <div>
        <OnlineFriendsList list={this.state.onlineList} />
        <OfflineFriendsList list={this.state.offlineList} />
      </div>
    );
  }
}
```

At first glance, when someone goes online, it's easy to think that the props are changing, but in reality they're not. What we're doing here is passing the parent `state down to the children as`props`, which they interpret as lists. If a friend goes offline,`setState`is invoked somewhere, changing the arrays and on the next render, the output is changed, but we never directly modify the`props`. In reality we are using new`props`, because our`state` has changed!

### Stateless and Stateful Components

There are many ways of categorizing components, one of which being by state. Components are either deemed stateful or stateless depending on whether or not they contain a state object (i.e. possess information).

Using the previous example, we can see that the `OnlineFriendsList` and `OfflineFriendsList` components are stateless because they just interpret information (create lists and display) but don't possess it (not `state` object). Meanwhile, the `FriendsList` component interprets (passes information to children) and possesses it (holds online/offline friend arrays in `state` object).

### Child/Parent Relationship Pattern

Even in complex applications, the most low-level components (no children) are usually stateless, and purely functional. Usually however, they are things like buttons, displays, and alerts, so they are usually catching user events. In these cases, the component uses an event handler to complete a function on the event. Take a look:

```
Parent
 - contains a clickable child
   - contains a click handler to interpret user input
     - ex. handleClick(e) saves the button/data/whatever the user clicks as info
   - passes user input information to parent
     - this is done because the parent passes it some operation as props
       - ex. <Child onClick={changeSomething(info)} />
     - ex. (within `handleClick(e)`) returns this.props.onClick(info)
 - Parent performs some operation
   - ex. changeSomething(info) { ...blah blah blah... }
```

This complicated back and forth gets easier over time, but here's a _TL;DR_: operations affecting state, must happen in the parent and get passed to the child (usually through `props`). The child, must interpret the event and pass the data to the operation (that it's been passed by the parent)..

### Child/Sibling Relationship Pattern

There's another pattern for a parent with multiple children and how they work together. It's extremely similar to the previous pattern and therefore, is mainly used for clarification. Let's say a parent contained a child, which displayed, info underneath a button. The use of sibling components would simply allow you to split the data to be easier to read, having one component display, and having one component handle the button:

```javascript
// Let's say you have <Parent />, with <Interface /> inside
// NOTE: <Interface /> shows data, and can be clicked
// In <Parent />, you might see:
render() {
 return <Interface message={this.state.displayText} onClick={this.changeDisplayText} />;
}
// Instead, we can split <Interface /> into <Utility /> and <Display />
// Now, in <Parent />, you might see:
render() {
  return (
    <div>
      <Utility onClick={this.changeDisplayText} />
      <Display message={this.state.displayText} />
    </div>
  );
}
```

Assuming our made up method `changeDisplayText` changes `this.state.displayText` then the `<Display />` component would update and nothing would change in the UI. The only difference is that one is far cleaner and easier to debug.
