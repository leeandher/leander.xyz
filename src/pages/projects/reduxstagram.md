---
type: projects
showcase: false
slug: reduxstagram
title: Reduxstagram
description: >-
  A desktop clone of instagram where I first tested the waters with... you
  guessed it... Redux. Total proof of concept, but learned a bunch!
image: /assets/project__reduxstagram.png
repo: "https://github.com/leeandher/Reduxstagram"
link: "https://reduxstagram.leander.xyz"
tech:
  - react
  - redux
  - redux-devtools
  - sentry
  - create-react-app
  - clone
date: 2018-11-29T17:26:56.683Z
---

This project is a single page application I made, to understand how to integrate **Redux** with **React**. I'm not going to say it's an _instagram clone_, but ya know. You can like posts, navigate the app, and add comments and your changes will be reflected instantly. Refreshing will reset the app, and give you some new images to play with as well!

It's really simple, and mainly just a demo, but as my first attempt at Redux, I would say it's a success. The finished product can be demo-ed online at [reduxstagram.leander.xyz](https://reduxstagram.leander.xyz).

## Using the app

You can use this app just like you would any photo-sharing app. Upon load, you'll be greeted with a bunch of random photos with some captions, likes, and comments. You can scroll through and click on any photo you like to see more details.

Upon click, you'll be routed to the detailed photo view, where the picture will be enlarged, alone with the option to _add_ or _delete_ any comments there. You can also like the photos from either view, at any time.

If you click on the logo, you'll be taken back to the base page, where your changes will still be saved, until page reload!

## How it works

This app was just redone for `v2.0.0` to use `create-react-app`, so the development version can be built using `npm start`.

The app itself is only uses a single `store`, with one `Provider` component, passing along to a `connect`ed _App_ component. In Redux' global state, the comments, likes, captions, and authors are stored for every post.

As for the URL, `react-router` is used in tandem with redux to allow for page-changing to log the `PAGE_CHANGE` action. It can also be tracked via the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)!

Another cool little bit is that this entire app is being watched by [Sentry](https://sentry.io) for error tracking! Pretty cool little addition.
