# Catch of the Day!

Hi there, and welcome to the _Catch of the Day_ repository! The code you'll find in here powers a single-page application developed by yours truly, in my attempt to better understand the fundamentals of **React.js**! The finished product can be found over at [catch-of-the-day.leander.xyz](https://catch-of-the-day.leander.xyz)!

## Using the app

The way the app works, you can generate a 'store' by using the landing page's store picker component. A random title will be suggested for you if you need.

Upon selecting the store you will be presented with the _meat_ of the application. You'll see an area on the right side where you can sign in (through GitHub, Facebook or Twitter), and claim that store (bsed on the unique name you generated)! Now you should be able to add some sample fish, and see just how dynamic React.js can be!

When signed-in on a new store, you'll be able to make changes throughout the app which will be saved for anyone who visits that store next time. Even better is, anyone who signs in to that same store, won't be able to change anything, since you've claimed it!

## How it works

The app was written entirely in **_React.js_**, using the `create-react-app`, with the help of Webpack and Babel. Each component was crafted by hand, keeping in mind the best ES6 practices (destructuring, arrow functions, etc.) as well as some of the more practical stuff, such ass `CSSTransitionGroups` and `PropTypes`.

The URL routing was done through **_React Router_**, which allowed for the dynamic store names.

**_Google's Firebase_** was used as the Database of Choice due to it's _syncState_ capabilities and live responses! This allows the 'owner'user to update the fish info to all other connected users right in front of their eyes!

The sign-in capabilities were also done through Firebase, which ensures proper **_OAuth Security_**.

## Creds

I was able to create this application through the help of a course, developed by [Wes Bos](https://wesbos.com) entitled [React For Beginners](https://reactforbeginners.com).
If you've stumbled upon this repo, in attempt to learn React, I highly recommend his [courses](https://wesbos.com/courses) and wish you the best of luck!
