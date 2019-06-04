# Learn Redux

A quick place for notes about stuff that I pick up throughout the [Learn Redux](learnredux.com) course.

_These notes are written as I go through the course, and might have information that is wrong or outdated. Simply put, I'm still learning!_

---

## Stores

Stores is kind of like a database, but for your front-end application. With Redux, creating a store lets you put the global state tree of your application in one place. Stores are tied to the **root reducer** upon declaration. Therefore, the only way you can change the state within the store, is to go through and **dispatch** an **action**, which is filtered through that **reducer**. But let's not get ahead of ourselves.

---

## Actions

Actions are kind of like, every possible maneuver we can do with our state, or that our users can do. Literally think of the possible _actions_ with respect to state. Adding a comment, liking a post, or creating a group, are all good examples of actions.

It's important to keep in mind though, actions are not applicable in every instance where you would call `setState()`. Instead, think of actions in a broader sense, and use them whenever you would let the user take an action to change the _global state_ of your application, a.k.a. the **store**'s state.

---

## Dispatching

This is the Redux term for sending out an **action** to do it's thing. Therefore, _when the user does X, **dispatch** the action Y_, in that sense.

---

## Reducers

Reducers are the the only way in which we can actually **dispatch** the **actions**. Whenever we want to make a change within the **store** (i.e. the application's global state), we must go through a reducer. A reducer will usually be a `switch` statement, in which the different `types` of actions are evaluated, before finally returning the state with all of its modifications.

### Root Reducer

The kicker with Redux, is that there is _only one_ reducer. This one has a special name, the **root reducer**. This reducer combines all of the other reducers into one file, which is connected to the **store**. In doing so, we can access every single reducer option, (and therefore every single action outcome) via one endpoint from our store.

---
