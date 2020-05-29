---
type: projects
showcase: false
slug: catch-of-the-day
title: Catch of the Day (EOL)
description: >-
  The first React app I've ever built, emulating an online fish market. You can
  even login with Twitter/Github and start your own store!
image: /assets/project__catch-of-the-day.png
repo: 'https://github.com/leeandher/Catch-of-the-Day'
link: 'https://catch-of-the-day.leander.xyz'
tech:
  - react
  - react-router
  - firebase
  - auth
  - css-transitions
  - prop-types
date: 2018-10-15T02:27:27.851Z
---
**EOL:** Just FYI, this project isn't being maintained anymore, so certain Firebase functionality probably won't work. The app can still be visited/explored but may not work as intended!

---

This single-page application mocks up a fish market online store, letting you change descriptions, load samples, add to your cart and more. It is all done using a Firebase real-time database so anyone can make and share stores with each other!

This project was my first step into learning the fundamentals of **React.js**! I'd never touched React before outside of online tutorial editors, and it really just let me start using some of concepts I'd learned in a real use-case. The finished product can be found over at [catch-of-the-day.leander.xyz](https://catch-of-the-day.leander.xyz)!

## Using the app

The way the app works, you can generate a 'store' by using the landing page's store picker component. A random title will be suggested for you if you need.

Upon selecting the store you will be presented with the _meat_ of the application. You'll see an area on the right side where you can sign in (through GitHub, Facebook or Twitter), and claim that store (based on the unique name you generated)! Now you should be able to add some sample fish, and see just how dynamic React can be!

When signed-in on a new store, you'll be able to make changes throughout the app which will be saved for anyone who visits that store next time. Even better is, anyone who signs in to that same store, won't be able to change anything, since you've claimed it!

## How it works

The app was written entirely in **_React_**, using the `create-react-app`, with the help of Webpack and Babel. Each component was crafted by hand, keeping in mind the best ES6 practices (destructuring, arrow functions, etc.) as well as some of the more practical stuff, such ass `CSSTransitionGroups` and `PropTypes`.

The URL routing was done through **_React Router_**, which allowed for the dynamic store names.

**_Google's Firebase_** was used as the Database of Choice due to it's _syncState_ capabilities and live responses! This allows the 'owner' user to update the fish info to all other connected users right in front of their eyes!

The sign-in capabilities were also done through Firebase, which ensures proper **_OAuth Security_**.
