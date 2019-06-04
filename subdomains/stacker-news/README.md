# Stacker News

Hey there, welcome to Stacker News! This repository contains the code I wrote for my [Hacker News](https://news.ycombinator.com/). If you want to see the live demo, go over to [stacker-news.leander.xyz](http://stacker-news.leander.xyz).

_*Note:*_ If it doesn't work immediately, it's probably because I'm _super_ cheap, and the GraphQL API endpoint is being hosted for FREE. The catch, is that after 30 min of inactivity, it falls asleep and takes a little while to wake up. Long story short, if it doesn't load immediately, try again in a few minutes!

## Running the app

For you to get up and running with this app, you'll need a Prisma account, and the Prisma CLI. Sign in, and change the `PRISMA_ENDPOINT` env value to `""`. Now run `prisma deploy` and go ahead and make the create the demo server (which will act as the database).

Next, fill in the rest of the `settings-dev.env` and run `npm start` in the `server/` directory. This will launch the server at `localhost:4000`.

Now run another `npm start` in the root directory to launch the frontend. You're done, happy hacking!

## Using the app

Stacker News is a sort of simpler, dumbed down version of Hacker news (hence, _clone_). Upon load you'll see a series of links that can all be clicked, sorted by default with the newest at the top. On the header, you'll see a bunch of different route options.

You can view the **top** posts, **search** for links by their url _or_ description, and lastly, **submit** new links to the site if you're logged in. You can do so by clicking the **login** button in the top right.

Once logged in, you'll be able to see the voting buttons, allowing you to **vote** on specific posts to raise their global standing.

That's pretty much it, it's a pretty simple app. The cooler part is the **STACK** <small>er news</small>.

## How it Works

This app was made with a pretty modern, 2018/19 stack. Let's start with the backend. The database is actually a demo server hosted by [Prisma](prisma), which uses their Prisma Client to interact with it. The reason for Prisma? Well their baked-in GraphQL support of course! Next, there's the server, which is generated through `graphql-yoga`, the choice GraphQL library based on
Express.js. The resolvers, schema, data model and relations are all specified by yours truly.

The frontend was written using React (of course). In order to interact with the GraphQL API, an `ApolloClient` was used to handle caching, requests, queries, mutations and subscriptions. In addition, JWTs were used for authentication, but since it's just a demo, they're stored in cache.

That's it, a cool, modern stack:

- **G**raphQL Yoga
- **A**pollo Client
- **R**eact
- **P**risma

What I'd like to call, the **GARP** stack <small>(that better catch on)</small>

## Creds

This app was made possible in large part due to the helpful tutorials over at [howtographql.com](http://howtographql.com). By following their backend tutorial, I was able to create the server, and endpoint. Their frontend tutorial recommend downloading the finished server, but since I had it, I was able to write 100% of the code for the app! While I did refactor, add, and style quite a bit extra, the tutorial was a great entrance into the world of GraphQL!
