---
type: projects
showcase: true
slug: lgr-fyi
title: lgr.fyi (EOL)
description: "You know how sometimes, links are like way too long and ugly for you to even want to click them. Well I had that problem too, and spent far too long building a web app for a solution. Gotta say though, this guy is pretty nice \U0001F44C\U0001F44C."
image: /assets/project__lgr-fyi.png
repo: 'https://github.com/leeandher/lgr-fyi'
link: 'https://fyi.leander.xyz'
tech:
  - vue
  - typescript
  - mongodb
  - digital-ocean
  - node
  - express
date: 2019-09-19T04:34:22.881Z
---

**EOL:** Just FYI, this project isn't being maintained anymore, so certain Firebase functionality probably won't work. The app can still be visited/explored but may not work as intended!

---

Welcome to [lgr.fyi](https://lgr.fyi)! It's a simple, open-source, Link Shortener that I developed while I was learning Node.js. I later scrapped that build and tried to re-engineer it completely, making a bunch of UI changes as well as changing some stuff about how it was deployed. The final product is pretty nifty if I do say so myself. 

## Using the app

You've definitely used a URL shortener before so I really don't think I need to explain it to you but I'll do it anyway. You just add any link you want to the input field and the app will spit out a nice, short `lgr.fyi` link that will redirect to your linked resource. It makes sure links are unique, and even lets you add a custom suffix to your link if you prefer that. Any of your immediate links will be stored in your local storage, to keep them nice and accessible!

## How it works

The initial version of the app was actually a Node App running on an EC2 instance through [AWS](https://aws.amazon.com/). It was set up with Elastic Beanstalk to have load balancing and better performance, but as my AWS Free Tier limits are quickly approaching, I decided to remove it from there and host in on [Digital Ocean](https://www.digitalocean.com/). I don't have much experience with the DevOps world, so setting up a Linux Box to run the app was a welcome challenge. 

The actual tech behind the app is pretty simple. The URLs, short and long, are all inside a **MongoDB** database, while the **Node** app sits on an **Express** server somewhere in the _Digital Ocean_. There's CORS stuff implemented to prevent any abuse, but besides that it all just works!

The frontend is actually a **Vue** app because I've been doing a lot of _React_ thus far, and I kinda wanna mix things up a little bit. It's served statically from the express server, and built together with **TypeScript** to enforce some extra rules. 

The main difficulty that came from deployment, so I actually wrote a little blog post about it, which I welcome you to check out! [leander.xyz/blog/real-deployment](https://leander.xyz/blog/real-deployment)

