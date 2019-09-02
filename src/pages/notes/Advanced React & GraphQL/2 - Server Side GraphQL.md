# Server Side GraphQL

## What is GraphQL?

Well first things first, GraphQL is nothing more than an API specification. There are a set of rules that define a GraphQL API, mainly how to interact with one in the **frontend**, via _queries_, _mutations_, and _subscriptions_, and how it is strucured on the **backend** to handle the _requests_. GraphQL APIs are conceptual, so they are _language-agnostic_. For the purpose of this course, we'll be using the context of JavaScript for both the entire stack.

The main reason why GraphQL is different, and in some cases, _preferable_ to the classic REST API structure, is because you can avoid things like receiveing extra, useless data, and loosly typed APIs. Via the specification, the frontend is able to send a `query` or a `mutation` that will specify the exact type of data to be returned. There's a lot of idiosyncracies that are odd about GraphQL compared to REST, but since I write these notes for myself, and I already did another course on GraphQL, I'm going to direct you, my dear reader, to another set of notes about the basics. Check out this [link for more info on what GraphQL](https://github.com/leeandher/programming-notes/tree/master/How%20To%20GraphQL), going forward these notes will specifically cover _Server Side GraphQL_!

---

## Specifying a Data Model / Schema

Part of creating any API is to define your datamodel. GraphQL is no different, except for the fact that you use a special language known as SDL (Schema Definition Language). It sorta looks like error-filled JSON, or YAML, but it reads easy, so it's not too bad.

In your SDL file, in this case `$backend-root/datamodel.prisma`, we can define the data model using a combination of the following key components:

- types
- fields
- built-in types
- non-nullable fields
- list fields
- enumerations
- interfaces
- directives

I'm going to run through them to give you a bit of an overview.

### Types, Fields, Built-in Types

_Types_ are the basis of your models. They are defined by their _fields_ and those fields are defined by their _types_. There are some _built-in types_ which you'll recognize from every programming language, but you can easily use your own custom types to apply to some fields. Let me show you an example:

```graphql
type User {
  name: String
  email: String
}
```

Here I've declared my own new _type_ called **User**. The User type is composed of two _fields_, **name** and **email**. Each of those fields has an assigned _built-in type_ of **String**. The built-in types include:

- Int
- Float
- String
- Boolean
- ID _(a special type used for identifiers)_

### Non-nullable and List Fields

There are plenty of situations in whicy you'll want to ensure you don't get _undefined_ fields populated all over your database. In these situations, you'll want to use a **non-nullable** flag, which is depicted as an exclamation mark (`!`). The following example says: "If you want to make a user, you _MUST_ supply a name, but the email is optional".

```graphql
type User {
  name: String!
  email: String
}
```

Additionally, there are plenty of times when a type may consist of an unknown number of items in one field. This is where you can use lists. They are denoted like arrays in JavaScript, by square brackets (`[]`). The example below suggests that a `User` may or may not have _medals_, denoted as a list of `String`s.

```graphql
type User {
  name: String!
  email: String
  medals: [String]
}
```

If you'd like to combine these, you can, just note how they should be combined using the following table:


 | Accepts:     | `null` | `[]` | `[null]` | `["test"]` |
 | ------------ | ------ | ---- | -------- | ---------- |
 | `[String!]!` | **No** | Yes  | **No**   | Yes        |
 | `[String]!`  | **No** | Yes  | Yes      | Yes        |
 | `[String!]`  | Yes    | Yes  | **No**   | Yes        |
 | `[String] `  | Yes    | Yes  | Yes      | Yes        |

### Enumerations

Enumerations or *enums* are scalar values which have a specified set of possible values to choose from. They one of the built-in types, just a bit unique. In the following example, we can see the `User`'s `role` is non-nullable, and can only be one of three options: *ADMIN*, *MOD*, or *DEFAULT*.

```graphql
enum UserRole {
  ADMIN
  MOD
  DEFAULT
}

type User {
  name: String
  email: String
  role: UserRole!
}
```

### Interfaces

Interfaces are kind of like constructor types. They contain a set of fields (with their associated types), and all other types who *implement* that **interface** will have to follow suit, but they are allowed to add other fields as well. Take a look at the following:

```graphql
interface User {
  name: String!
  email: String!
}

type Admin implements User {
  name: String!
  email: String!
  accessKey: String
  userGroups: [String!]!
}

type Mod implements User {
  name: String!
  email: String!
  modChats: [String!]!
}
```

### Directives

Directives are special indicator flags that can some logic or context to certain fields that they are attached to. For example, here are some directives in use:

```graphql
type User {
  name: String!
  email: String!
  username: String! @unique
}
```

There are plenty more that can be used when *using the API*, as arguments, but we'll get there eventually.

_**Even though this note is long, there's still plenty more to learn about SDL. Check out the [actual documentation here](https://graphql.org/learn/schema/)!**_

---

## What is Prisma?

Prisma is an Opensource GraphQL Database Interface. Lots of big words, but simply put, this guy lets you perform CRUD operations on your data without ever having to worry about writing custom queries. That means you don't have to write any SQL or MongoDB queries. 

Instead you let Prisma do the heavy lifting and just focus on your app. All you do is pass it a *data model* using SDL (as specified above) and calling `prisma deploy` will create a complete `.graphql` schema for you, with the necessary `queries` and `mutations` that you'll need to get started. This is ALSO written in SDL, and is essentially a complete access API generated for you!

However, it should be noted that you CANNOT use this API outright in the frontend. There is no authentication layer, no security layer, or any sort of custom logic if we want to add anything. Stuff like permissions, emails, hashing passwords, reset flows, all still needs to be developed. Thats where GraphQL Yoga comes in.

---

## What is GraphQL Yoga?

As per their official `README`, GraphQL Yoga is **a fully-featured GraphQL Server with focus on easy setup, performance & great developer experience**. Short and sweet, but what does that mean? Well, GraphQL Yoga is just a quick way to get up and running with a GraphQL endpoint. It's spec compliant, file upload capable, comes with the _GraphQL Playground IDE_, and is even extensible via middleware. It doesn't have a database or anything attached to it by default, instead it allows us to specify the resolvers, schema and type definitions by passing it in, and it will handle interpreting the queries and returning the responses appropriately.

"What is this witchcraft?" you may ask. Well, like most things online nowadays, it's actually an almagamation of many smart developers code, put together in an easy to use package. In fact, it's an `express`/`apollo-server` (web server), with `graphql-subscriptions` (websocket subscription server), `graphql.js` (engine and schema), and the `graphql-playground` (interactive GraphQL IDE) all-in-one.

---

## TypeDefs and Resolvers

The basis of a GraphQL is entirely dependent on the concepts of TypeDefs and Resolvers. You can't create this kind of API server without these, and messing them up could result in lots of wasted time debugging, or massive security flaws for your application. After all, the code you write here will be accessible passed on to the user of the API, and we have to always eyre on the side of caution.

First of all, the **TypeDefs**. Whenever you open up your GraphQL IDE (_GraphQL Playground_, _GraphiQL_, etc.), and you click on the `Schema` tab to examine the entire API, what you are actually looking at is the **TypeDefs**. This is almost like the API Schema, a strongly typed reference for the entire API, including all of it's responses and data structures. It should include every `query`, `mutation`, and `subscription` that the API has to offer, as well as the _fields_, _types_ and _parameters_. The end-user should be able to understand how to call your API entirely from the **typeDefs** (and they will, I mean, it is the interface schema).

The **Resolvers** do the _AP_ part in _API_. Whenever any of the services (`queries`, `mutations`, `subscriptions`) are called upon, they have a connected resolver which will actually perform the operation to get the data which is sent back to the user. In most cases, that will be to perform database operations with some given parameters, but don't limit yourself! You can query a RESTful endpoint, or parse a `.csv` file, or even return static data. In the case of this app, the resolvers will be interacting with the generated Prisma client, talking to, and modifying our database for us. This 'middle-man' approach allows for custom logic in each service the API delivers, as well as security, since we never expose our database directly to the API user.

_Don't trust anyone, not even yourself_.

---

## The Workflow

So how will this application flow. It may be a bit confusing, but breaking it down step by step should help for clarity. It all happens at once in the backend directory root file: `index.js`.

 - `index.js` is responsible for **loading environment variables**, and using these to **create the DB interface**, and **create and start the API server**.
   - The _DB interface_ is the Prisma Client, this must be **redeployed** if new database types are introduced
   - The _API Server_ is the GraphQL Yoga Server
   - These both rely on some `.env` variables which are also loaded
 - **The DB Interface** is created in `db.js`, using a binding library to the Prisma Client, essentially letting us use JS to control the server
 - **The API Server** is setup in `createServer` and executed in `index.js`, and relies on the **typeDefs** and **resolvers** in order to generate
   - The _typeDefs_ are in their own `schema.graphql` specification file, and are loaded/passed into the GraphQL Yoga client
   - The _resolvers_ are have their own directory, and are specified there for each API service's operations
   - You cannot have a **resolver** if it is not first specified in the **typeDefs**, but you can do the opposite (since what you do with each request isn't predefined)

To walk through this flow, we'll go through how you would add an item to our Schema and API.

  1. Add the model to the `datamodel.prisma` file, usually at the root of your backend directory.

   - The `datamodel.prisma` file outlines the types that we're passing to prisma to generate CRUD operations for. There are a few new unique identifiers we need to add for prisma to make some helpful extra fields, as seen in the comments of this mockup:

```grapqhl
type User {
  id: ID! @id
  name: String!
  email: String!
  updatedAt: DateTime! @updatedAt
  createdAt: DateTime! @createdAt
}

type Item {
  id: ID! @id
  title: String!
  price: Int!
  updatedAt: DateTime! @updatedAt
  createdAt: DateTime! @createdAt
}
```

  2. Now we need to send this new model to Prisma to update our database, so we run `prisma deploy` in our terminal.
  3. We need our local prisma schema (with all our CRUD operations) to reflect the new database, so run `prisma graphql get-schema -p prisma` in the terminal
     - This will recreate our  `src/generated/prisma.graphql` file.
     - This step can also be skipped by adding the following post-deploy hook to your `prisma.yml` file:

```yml
 hooks:
   post-deploy:
      - graphql get-schema -p prisma
```

  4. Now we can modify our `schema.graphql` file (user-facing schema) to be able to read/write with our new datamodel. This would be in the form of `queries`, `mutations`, and `subscriptions`, as exemplified below:
  
```graphql
type Mutation {
  createItem(
    title: String!
    description: String!
    price: Int!
    image: String
    largeImage: String
  ): Item!
}

type Query {
  items: [Item!]!
}
```

  1. We still don't have a way for our users to interact with our database yet, so we'll have to write some resolvers for this. If you haven't already, you'll first need to create your `prisma-binding` client, probably as something like `db.js`:
     - This *DB Interface* is passed as context along with our request due to the `context: req => ({ ...req, db })` line in our `createServer.js` file (invoked to launch API server)

```js
// This file connects to the remote prisma database
// It gives us the ability to query it with JavaScript

const { Prisma } = require('prisma-binding')

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
})

module.exports = db
```

  6. Using the example from , we can modify our `Query.js` and `Mutation.js` files, by adding our CRUD operations we steal from context!
     - If the operation (as seen in the query example) is identical to the CRUD operation Prisma gives, we can forward the resolver using the handy export `forwardTo`.

```js
// Query.js
const { forwardTo } = require('prisma-binding')

const Query = {
  items: forwardTo('db')
  /*
  
  Since the below function operates exactly the same as on the generated schema,
  we can just forward the request instead of rewriting pointless code.
  This is for quick mockups, or API calls without custom logic.

  async items(parent, args, ctx, info) {
    const items = await ctx.db.query.items()
    return items
  }
  */
}

module.exports = Query
```
```js
// Mutation.js
const Mutation = {
  async createItem(parent, args, ctx, info) {
    // 'info' passes along query, so that it can get the return data
    // It tells the backend which fields were requested from the front-end
    // If we were to replace it with `{id title description}`, only those fields would be returned
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info)

    return item
  }
}

module.exports = Mutation

```

  7. Open up our GraphQL playground and test it out! All the operations in our `schema.graphql` file will be visible, even without an associated resolver, but those with resolvers are going to interact with the Prisma Database just fine!
---

## Connections

Connections are a sort of meta-information query that can be accessed on items in your database. It's provided as part of Prismas operations but is used for getting data like the *total number of items*, or *graphing the edges/nodes of an item*, or *page information* if implementing pagination.

## Pagination

There are a few common fields that are added to the application's schema when implementing pagination. Since not all your data is being shown to the user, pagination is often tied to the ability to search through that information client-side (search bar, filters, sorting etc.), but if not, a few of these parameters are optional:

```graphql
type Query {
  items(
    where: ItemWhereInput # optional - for search
    orderBy: ItemOrderByInput # optional - for sorting
    skip: Int 
    first: Int
  ): [Item!]!
}
```
The `where` param will allow you to pass search parameters to find specific items, and the `orderBy` implements a basic sort on the fields attributed to the Item-type.

The `skip` and `first` are the actual pagination parameters. `skip` tells the API how many 'Items' are to be ignored when requesting them all, and `first` tells you how many are to be returned.

Think of it like: 
> The first X after skipping Y

With this, we can implement a query client side that will pass the number per page as `first` and the page-number - 1 multiplied by the number per page for `skip`, limiting the returned items.