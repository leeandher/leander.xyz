---
type: projects
showcase: true
slug: stacker-news
title: Stacker News
description: >-
  A pretty one-to-one clone of Hacker News with accounts, posting, and voting.
  Built entirely from scratch, without any template/starter files!
image: /assets/project__stacker-news.png
repo: "https://github.com/leeandher/Stacker-News"
link: "https://stacker-news.leander.xyz"
tech:
  - react
  - graphql
  - apollo-client
  - prisma
  - graphql-yoga
date: 2019-01-11T03:27:27.851Z
---

This project is one of those 'explore-new-things' sort of things. This is a clone of [Hacker News](https://news.ycombinator.com/), which I coded from the ground up with a modern JavaScript stack, and so, I dub thee **Stacker News**! If you want to see the live demo, go over to [stacker-news.leander.xyz](https://stacker-news.leander.xyz).

_Note:_ The initial fetch takes a while because I'm _super_ cheap, and the GraphQL API endpoint is being hosted on a free-tier Heroku dyno. The catch, is that after 30 min of inactivity, it falls asleep and takes a little while to spin back up when your browser makes the first request.

## Using the app

Stacker News is a sort of simple recreation of the beloved site, Hacker News. Upon load you'll see a series of links that can all be clicked, sorted by default with the newest at the top. On the header, you'll see a bunch of different route options.

You can view the **top** posts, **search** for links by their url _or_ description, and lastly, **submit** new links to the site if you're logged in. You can do so by clicking the **login** button in the top right.

Once logged in, you'll be able to see the voting buttons, allowing you to **vote** on specific posts to raise their global standing.

That's pretty much it, it's a pretty simple app. The cooler part is the **STACK**<small>er news</small>.

## How it Works

This app was made with a pretty modern, 2018/19 stack. Let's start with the backend. The database is actually a demo server hosted by [Prisma](https://www.prisma.io/), which uses their Prisma Client to interact with it. The reason for Prisma? Well their client generates a handy bunch of CRUD operations for my resolvers to hook into easily. Next, there's the server endpoint, which is generated through [GraphQL Yoga](https://github.com/prisma/graphql-yoga), a reliable GraphQL library based on
Express.js. The resolvers, schema, data model and relations are all specified by yours truly.

The frontend was written using React (of course). In order to interact with the GraphQL API, an [ApolloClient](https://www.apollographql.com/docs/react/) was used to handle caching, requests, queries, mutations and subscriptions. In addition, JWTs were used for authentication, but since it's just a demo, they're stored in cache.

That's it, a cool, modern stack:

- **G**raphQL Yoga
- **A**pollo Client
- **R**eact
- **P**risma

What I'd like to call, the **GARP** stack <small>(that better catch on)</small>
