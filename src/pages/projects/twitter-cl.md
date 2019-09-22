---
type: projects
showcase: true
slug: twitter-cl
title: Twitter-CL
description: >-
  A helpful command-line tool I published to the NPM registry which allows you
  to interact with some of Twitter's functionality without touching a web
  browser.
image: /assets/project__twitter-cl.png
repo: "https://github.com/leeandher/twitter-cl"
link: "https://www.npmjs.com/package/twitter-cl"
tech:
  - typescript
  - oclif
  - npm
  - mocha
  - twitter-api
date: 2019-05-21T23:14:11.634Z
---

Twitter-CL is a helpful command-line tool built for some simple twitter functionality without ever needing to touch a web browser. All you need is a set of API keys from https://developer.twitter.com, and you can get set up in a few commands.

```
> npm i -g twitter-cl
> tcl config
> tcl tweet "Hello World!"
```

It was built entirely in Node.js with the help of TypeScript to keep things strict. It was built using the Open Command Line Interface Framework (OCLIF) developed by engineers at Heroku.

It may not be the most built-out, robust thing in the world, but it's helpful AND useful to it's creator, so it does it's job!
