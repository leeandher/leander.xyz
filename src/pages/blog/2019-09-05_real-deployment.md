---
type: blog
archive: false
showcase: false
slug: real-deployment
title: Deploying to Digital Ocean (Vue + Node)
description: 'A short little post about my experience deploying to my app https://lgr.fyi!'
image: /assets/blog__real_deployment.jpg
tags:
  - coding
  - how-to
date: 2019-09-18T15:43:24.947Z
---

So it may seem crazy but I really don't have much experience in the world of deployment. Development is a lot of fun, and can get easy when you get into a groove with things, but deployment has always been a confusing journey for me. I'm a _web developer_ not a _sys admin_ and even that label is grasping at straws.

But enough self-deprecation, I actually have something to be proud of! My app works, its routes are correct and it's alive right now, running in the _**Digital Ocean**_.

How? IDK! I'm not an expert, but I'll just walk through the steps I took to get it up there.

## Application Structure

Honestly, this part is like, underrated. It's essential to understand how the app is going to work before actually trying to publish anything. The app I'm going to be talking about lives over at <https://lgr.fyi>. It's a simple URL shortener, which has a **Vue** app on `/`, and runs an **Express** server to redirect on `/:suffix`, but can also handle 404s correctly.

I tried for way too long to figure out the application structure. First of all, you need to decide how interconnected the backend and frontend are going to be. In my case, I could connect them pretty well. I thought the Vue app needed its own routing and URL management and then I'd have to wrastle with modifying serving client routes and server routes but as it turns out, I could just serve the Vue app statically from Express, so I cut out all the complications:

```js
// Serve the Vue App
app.use("/", express.static(path.join(__dirname, "../client/dist")))
```

## CORS

Once you have your application set up the way you want it, you need to ensure the server and client can actually speak to each other over the internet, and won't cause any issues when you deploy. For this, take advantage of environment variables like `NODE_ENV` and ensure you handle it both server and client side:

```js
// Setup CORS server-side
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
```

```js
// Attach the correct headers client-side
const res = await fetch(`${API_URL}/history`, {
  headers: { "Content-Type": "application/json" },
  method: "POST",
  body,
})
```

## Starting a Droplet

So now that your app is done and working over the internet, you gotta get a DO Droplet. I recommend the absolute smallest one but that's just because I'm super cheap. Make sure you get one with your dependencies pre-installed (e.g. Node, Ruby, etc.).

After your purchase, you'll have to SSH into the thing, and this part caused me some trouble. So you're going to have to do this entirely from command line. Copy your droplet's IP and run:

```shell
$ ssh connect root@12.345.678.90
```

You'll be prompted for your password which you probably have in your email inbox. After pasting it in, you'll enter the server that you just bought! Neat huh!

**If this didn't work...**

You gotta go on DO, and manually edit your server's SSH config. So click the `Console` button when selecting the droplet and you'll already be logged in. After the window opens, run the following:

```shell
$ sudo vi /etc/ssh/sshd_config
```

and change `PermitRootLogin` and `PasswordAuthentication` from `no` to `yes`, and try the `ssh connect` step again!

> **Tip** : If you end up getting stuck in `vim`, and you're like me it's probably because you pressed `Ctrl + S` to save (muscle memory). Just press `Ctrl + Q` to get back at it.

## Setup your App

You've done this stuff before, you got this. Just like you do locally, clone your repository, and install all the dependencies for your application. This is also the best time to setup some deploy hooks if you like. Make sure to pass in your `env` files as well, and setup a memorable port on which your app will run!

Make sure all your files are built and you're running the production versions to ensure some sick performance gains.

But, as you probably know. You can't actually access the app. And the domain looks like trash, so you gotta fix that.

## Domains

So first of all, buy a domain. Got it? Cool. Now we're going to add it to Digital Ocean under the same project. Cool? Now hook up the nameservers to route to DO's NSs:

```
ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com
```

Great, now wait a while for your IP to propagate, and once that's done, be sure to add the proper routing records if you need (`A`, `AAAA`, `CNAME`, etc.). This is where you're going to connect your domain to the server you set up before:

```
A - lgr.fyi - 12.345.678.90 - 3600
A - www.lgr.fyi - 12.345.678.90 - 3600
```

## SSL

You're almost there! For my app to run properly, I had to configure Nginx to route traffic to the correct port on the server, and to ensure `www.` routed to the `apex` domain.

I highly recommend checking out this link: [lgr.fyi/🐳🚀](https://lgr.fyi/🐳🚀) for a full, in depth explanation on getting the SSL certificate up and running.

You'll also have to modify some of the redirect rules in `etc/nginx/sites-available/default` to enforce/redirect `HTTP` traffic. Now just ensure traffic is flowing to the port your app is running on, and ensure that it's set to _revive_ (via `nodemon` or something), if it ever crashes.

## Congrats!

That's it! I know it was pretty high-level, but honestly, once you get into it, it's really not that bad! Put some neat stuff out there 👌👌
