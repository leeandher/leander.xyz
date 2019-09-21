## Client-side GraphQL with Apollo

There are going to be certain situations where you'll want data throughout your application in one easy way to fetch it. Usually you'd reach for Redux or the React Context API in these situations, but you're already wrapping you application in the `<ApolloProvider>` HOC, so why add some more dependencies? Plus, you already have some nice GraphQL queries to your backend, just add some special directives and you'll be able to interface directly with your client store as if it were a full fledged database.

This entire concept boils down to using this one directive: **@client**. This tells your Apollo client not to interface with the DB, and instead try to fetch it from the store client-side. Take a look at the following snippet:

```js
const LOCAL_STATE_QUERY = gql`
  query LOCAL_STATE_QUERY {
    navStatus @client
  }
`
const TOGGLE_NAV_STATUS_MUTATION = gql`
  mutation TOGGLE_NAV_STATUS_MUTATION {
    toggleNavStatus @client
  }
`
```

Now this would work, but it doesn't have a resolver/data-store to run from. So when you head over to your HOC where you initialize your data with the  `clientState` property.

```js
new ApolloClient({
  // rest of declarations on ApolloClient
  // ...
  clientState: {
    defaults: {
      navStatus: false
    },
    resolvers: {
      Mutation: {
        toggleNavStatus(_, variables, { cache }) {
          // 1. Read the navStatus value from the cache
          const { navStatus } = cache.readQuery({ query: LOCAL_STATE_QUERY })
          // 2. Write the new navStatus value to the cache
          const newData = { data: { navStatus: !navStatus } }
          cache.writeData(newData)
          return newData
        }
      }
    }
  }
})
```

Diagnosing this a bit you can see that the resolver for the above mutation set up to read and write from the cache as if it were some concrete data store, and return the information the same you would from an actual backend. 

The query also doesn't have a query because it's actually reaching for a value that is stored as a value on the `clientState` already, so the simple query of asking for its value doesn't actually need a resolver!

It may look odd, but the mutations also ignore the first parameter, with the second and third being the `variables` and the `context` objects. The first parameter isn't too important, and can usually be skipped, while the context can be de-structured into the `client` and `cache` objects as well as the `getCacheKey` function. For more info check out: https://www.apollographql.com/docs/react/essentials/local-state/#local-resolvers

## Displaying Data Client-side

One important concept to understand when it comes to GraphQL is the ability to drill down nested data via the relations and schema/data-model you've set up for the types. Say you have the following little simple schema:

```graphql
type Item {
  title: String!
  description: String!
  price: Int!
  user: User!
}

type User {
  name: String!
  email: String!
  age: Int!
  items: [Item!]!
}
```

Since the two types are related to one another (through the `user` field on `Item`, and the `items` field on `User`), you can actually keep nesting the information in your query. Take a look at the following:

```graphql
query NESTED_AS_HELL {
  items {
    title
    description
    user {
      email
      age
      items {
        price
        description
        user {
          age
          name
          email
          items {
            price
            description
            title
            user {
              # So on and so forth
            }
          }
        }
      }
    }
  }
}
```

Why would you do that though?! Well it's useful to drill down in some more complicated data structures. Imagine if you had a **Friend List** for every user, or a **Second Owner** for every `Item`. You could get something more complicated, like the `email` of  `friend` of the `secondOwner` of this `item` made by the current `user`. Anyway that's pretty neat.

## Optimistic Response/UI

In developing responsive front-end applications, theres a concept known as **Optimistic UI**, or as Apollo calls it, **Optimistic Response**. Overall, it's a pretty simple concept to grasp and implement. All you're doing is updating the user interface before a response comes back from the server.

Why would you do that? It's sort of like a white lie to your users. You're assuming that, _optimistically_, the request goes through just fine without any errors. If it does this 99% of the time, you're okay updating the UI before it actually resolves since odds are its gonna be okay. If something does go wrong, you'll revert the state and UI effect, but it probably won't happen.

You implement this by defining what the response will be ahead of time. Let's take a look at the following example:

```js
// in a component...
<Mutation
  mutation={REMOVE_FROM_CART_MUTATION}
  variables={{ id }}
  update={this.update}
  optimisticResponse={{
    __typename: "Mutation",
    removeFromCart: {
      __typename: "CartItem",
      id
    }
  }}
>
```

Using the Apollo prop `optimisticResponse` we actually expect the following JSON object to be returned: 

```json
{
  "__typename": "Mutation",
  "removeFromCart": {
    "__typename": "CartItem",
    "id": "INSERT_ID_HERE",
  }
}
```

Now our `update` function (`this.update`) will run twice, one immediately (against the optimistic response), and once after the actual request resolves. The following example updates the cache to show an item being removed from a user's cart:
```js
// This gets called as soon as a response comes back from the server
// (after the mutation has been performed)
// With an optimisticResponse, this will be run twice (optimistically, and after actual response)
update = (cache, { data: resData, error }) => {
  // 1. Read the cache
  const cacheData = cache.readQuery({ query: CURRENT_USER_QUERY })
  // 2. Remove the item from the cart
  const cartItemId = resData.removeFromCart.id
  cacheData.me.cart = cacheData.me.cart.filter(({ id }) => id !== cartItemId)
  // 3. Write it back to the cache
  cache.writeQuery({ query: CURRENT_USER_QUERY, data: cacheData })
}
```

By updating the cache optimistically, the user feels as though the item is gone instantly, instead of hanging around for a few hundred milliseconds.
