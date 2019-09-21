## Setting up Apollo Client (w/ Next, and SSR)

To set up the Apollo Client there is a little bit of boilerplate code that needs to be written. The goal of this code is to setup the Apollo Client with a bunch of configuration to be able to make queries and mutations connected to our database, as well as setting up error/loading handling, caching and re-fetching.

We do this with the help of a **Higher-Order Component (HOC)** which acts as a wrapper supplying props to the upper-level components. As per convention, wrapper HOCs are denoted in files prefixed with `with`. So in our case, as a DB Client, we can set up our Apollo Client in `withData.js`:

```js
// withData.js

import withApollo from 'next-with-apollo'
// Apollo-boost contains the Apollo Client with a lot of pre-configured best practices
// https://www.apollographql.com/docs/react/essentials/get-started/#apollo-boost
import ApolloClient from 'apollo-boost'
import { endpoint } from '../config'
```

The first thing to note is the imports at the top of the file. We need to import the Apollo Client HOC from `next-with-apollo` in order to send up server-side renderings. Our site should have it's queries fulfilled before initally loading the page, so that we don't get an empty page loaded to the user.

The `withApollo` HOC, accepts our client creation function (which we will declare in a bit) and returns another HOC. The other import is the actual client, which will parse and translate the GraphQL queries/mutations we're making on the front-end. We import it from `apollo-boost` since it's a supplied package pre-configured with a bunch of useful stuff, you can check out [with this link](https://www.apollographql.com/docs/react/essentials/get-started/#apollo-boost).

The endpoint is simply our database endpoint, which the client needs to send the queries too. This should come from a secure file, which is gitignored, like an `.env` or `config.js` file.

Now we can go ahead and setup our client creation function:

```js
// withData.js

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          // Cookies are included in requests, so we know if the user is logged in
          credentials: 'include'
        },
        headers
      })
    }
  })
}

export default withApollo(createClient)
```

In this function, we are extracting the headers from the front-end, and setting up a new `ApolloClient` configured with the endpoint and request settings. The request has its context set to include any headers, and cookies that we store to know whether or not the request is coming from a valid, authenticated user. This boilerplate can be a lot to parse buy it comes generally from the basic Apollo Docs.

Now that we've set up our client as an HOC, we need to setup the provider to allow our application to access the client. We do that using the next file: `_app.js`. We'll be wrapping our application with this HOC to provide the actual Client as a prop to our provider. Check out the following code:

```js
// _app.js

import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'

import withData from '../lib/withData'

import Page from '../components/Page'

class SickApp extends App {
  // This static method is fired to enable crawling every page and fire off queries server-side before the first render
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // This exposes the query to the user
    pageProps.query = ctx.query
    return { pageProps }
  }
  render() {
    const { Component, apollo, pageProps } = this.props
    return (
      <Container>
        {/* Apollo client comes from the withData HOC */}
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(SickApp)
```

It may be a lot to parse but we'll break it down. First of all the `ApolloProvider` (the actual JSX React Component) will be accepting our newly created client, so we import it into the file. Our client-creating-HOC is imported as well, and can be seen being used right at the bottom, within the `export` statement. Now, we have `apollo` accessible in our props, which actually contains the entire client so we can simply pass that to our `ApolloProvider`.

Now to setup the actual server-side rendering, we need to supply the returned data as props for our first load of the page components. We do that using the static `getInitialProps` method. It accepts the Component being rendered, and the context we assign. Inside here, we run the method `getInitialProps` on the component being rendered, essentially fetching its query before the first load, and returning it as props to the page.

What we've done now is have the browser fetch the page resources before loading the page, so that data is sent from the server directly to the user. Whatever the queries that we write in the component files will be pre-fetched and added to props to be used in the component.

## What is Render-props?

There is a design system used in React components for passing data into a component without having to take it apart, often referred to as **render-props**. What this means is that the JSX component doesn't actually take any children inside of it, but instead accepts a function which itself _will return JSX_. Take a look at the following:

```js
// With Render-props
class Name extends React.Component {
  state = {
    name: "sALly",
  }
  textify = (name) => `${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}!`
  render() {
    const {name} = this.state
    const {show} = this.props
    return (
      <div className="name-style">
        {show(textify(name))}
      </div>
    )
  }
}

const Parent = () => (
  <div>
    <h1>Hello<h1>
    <Name show={(nameText) => <h2>{nameText}</h2>}
  </div>
)
```

In this example, we can offload all the formatting logic for the `<Name />` component into its own file, cleaning up our parent, and not having to address it in our state. It may look needless here, but with many other contributors to state, an application can get confusing quickly, so render-props is a useful system to understand.

Usually this is used by external libraries which will perform operations in the background and provide some useful parameters to your render-prop function in order to display it. In our case, `react-apollo`'s `<Query />` and `<Mutation />` components both do this, working together with the `ApolloProvider` HOC to submit queries you pass as props, and return the payload of data to your application via render-props. Keep reading to see what that might look like.

## React Meets GraphQL

In order to send/receive data from the backend with our newly set up client, all we have to do is import the type of request we'd like to make from `react-apollo` and _graphql-ify_ it. For the second step, we'll use another package called `graphql-tag` which will allow us to write our queries in template literals.

When using a query inside a React component, we conventionally write it at the top of the file, in all caps as follows:

```js
import gql from 'graphql-tag'

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`
```

The export statement will be used for testing later on, but the query itself is now accessible to the component we'll be writing later in the file.

Inside that component we use `react-apollo`'s own HOC components:

```js
export default class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>⚡ Loading... ⚡</p>
            if (error) return <p>❌ Error ❌: {error.message}</p>
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item key={item.id} item={item} />
                ))}
              </ItemsList>
            )
          }}
        </Query>
      </Center>
    )
  }
}
```

This is a pretty basic implementation but theres still some stuff to parse here. The `<Query>` class takes in the query we specified above, and follows render-props in order for us to render our code. Its render-prop function accepts the payload containing the response from our backend, and we can manipulate what we see depending on the response.

It even adds helpful stuff pre-built such as loading, and error properties, allowing us to setup Error States as seen above. Once the request succeeds, our application will render the items as in the `<ItemsList>` component, without us having to save each one into state.

If we wanted to abstract this, we could even setup this component as an HOC, with a loading/error state built in, renaming it to something like `withItems.js`. Then we'd just have to wrap whatever component needs the data with this guy, and it would be quenched with the props directly from the backend! The only problem with this is that you wouldn't be able to modify the query on a case by case basis, which is where GraphQL shines, reducing over-fetching of data. There's trade-offs for both systems.

Cool bonus part is that Apollo has its built-in cache, so if this request is fired off again, it will return the cached data first resulting in instant load times for our users.

## Interacting with the Apollo Cache

For some situations, when you perform a request, the response will need to update a cached result for UI purposes. In this application, you can easily see this coming into play when you query a list of items, then delete one of them. Since the deletion mutation modifies what is returned from that initial query, you'll need to do one of two things to show visibly to the user that the method worked.

1. Re-fetch the query
2. Update the cache

While re-fetching the query works, it comes with a network delay since you have to wait for the response before anything can be seen meaning the deletion mutation, and list query must both fire and complete. To give the essence of a faster UI, updating the cache can be done instead.

To do so, use the `update` prop on the `<Mutation>` component to supply a function which will run after the mutation has been performed:

```js
class DeleteItem extends Component {
  update = () {
    // Manually update the client cache so it matches the server
    // 1. Read the query data from the cache
    const cacheData = cache.readQuery({ query: ALL_ITEMS_QUERY })
    // 2. Manually change the cached data
    cacheData.items = cacheData.items.filter(
      ({ id }) => id !== resData.deleteItem.id
    )
    // 3. Write the changed cache data to its query
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data: cacheData })
  }
   render() {
    const { id } = this.props
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id }}
        update={this.update}
      >
      ...
      </Mutation>
```

In Apollo, the cache is written to for every individual request we make on the front-end. If we'd like to modify what we are returned from that request, we have to use `readQuery` to get the data from that specific query, then `writeQuery` a new data object containing only the information we want in the UI. It may seem like a lot, but it shows a much cleaner UI and actually helps keep the user's cache inline with the database if the request was fulfilled properly.

## Pagination and Cache Invalidation

To setup client-side pagination, the simplest method is by attaching an `aggregate` query onto a `Pagination` type React component. By that I mean offloading the page selection (Prev, Current Page, Next buttons, etc.) to a separate React component which will be checking for the total number of items it paginates through. Mocking this up, it would look something like this:

```js
const Pagination = ({ currentPage }) => (
  <Query query={PAGINATION_QUERY}>
    {({ data }) => {
      const { count } = data.itemsConnection.aggregate
      const totalPages = Math.ceil(count / itemsPerPage)
      return (
        <div>
          <Link prefetch to={`items/?page=${currentPage - 1}`}>
            Prev
          </Link>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <Link prefetch to={`items/?page=${currentPage + 1}`}>
            Next
          </Link>
        </div>
      )
    }}
  </Query>
)
```

The `prefetch` attribute on the `next/link` components gets the next page's data behind the scenes before the user clicks the button.
The `PAGINATION_QUERY` would look something like this:

```graphql
query PAGINATION_QUERY {
  itemsConnection {
    aggregate {
      count
    }
  }
}
```

This just gets the total number of items that you will be paginating over. The more complex part is using this information, only displaying the items within that page region. This can be done by the following:

```js
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY(
    $skip: Int = 0,
    $first: Int = ${PER_PAGE}
  ) {
    items(first: $first, skip: $skip) {
      id
      title
      price
    }
  }
`

// ...
<Query
  query={ALL_ITEMS_QUERY}
  variables={{
    skip: (page - 1) * PER_PAGE,
    first: PER_PAGE
  }}
>
  {() => {
    // rest of component
  }}
</Query>
```

This must be setup in the backend before, but allows us to skip some pages and display only certain amounts from the entire data-set. Using a bit of simple math, we can get our pages set up.
You can also see that you can set default values for your queries to fall-back on, in case you find yourself writing a lot a repeat code.

## Cache Invalidation

Cache Invalidation is the term used to refer to the ability to remove parts of the cache so that our applications's data stays accurate. Say for example, after you've implemented pagination, you want to add an item to the set (e.g. _CREATE_ITEM_ mutation). When you've done so, every query that fires off a request for those items must be updated (e.g. _ALL_ITEMS_ query), and its important to understand that **each paginated page has their own query, since the parameters are different**. Now that we've added a new item to page 1, every other page will have to modify it's cached response as well. There are a few ways to counter this:

1. Fetch Policy

The fetch policy allows you to specify where Apollo should reach when resolving data from the graphql request. By default, it checks the cache for an older copy of the response data and uses that. If none is found, it fires over the network to the endpoint and resolves the fresh data.

Since we want it to first back to the network, we can add the `fetchPolicy="network-only"` to the query in question:

```js
<Query
  query={ALL_ITEMS_QUERY}
  variables={{
    skip: (page - 1) * PER_PAGE,
    first: PER_PAGE
  }}
  fetchPolicy="network-only"
>
  {() => {
    // rest of component
  }}
</Query>
```

Now the request will always fire to the network, but unfortunately, this means our cache is useless for this query now, and there will be a delay for every time we use this query.

2. Refetch Queries

Another method is too attach a special parameter to the mutation in question instead, specifying which queries should be refetched to update the cache. It takes in an array of these such requests as follows:

```js
import { ALL_ITEMS_QUERY } from './OtherComponent'

render() {
  return (
   <Mutation
     mutation={CREATE_ITEM_MUTATION}
     variables={this.state}
     refetchQueries={[
       {
         query: ALL_ITEMS_QUERY,
         variables: { id: this.props.id }
       }
     ]}
   >
     {() => {
       // rest of component
     }}
   </Mutation>
  )
}
```

This works great for smaller queries or applications, but unfortunately, if the query uses parameters, they must be specified in this declaration. You can programmatically declare all of them, sure, but then if you have hundreds of pages, that's hundreds of pages that the client has to resolve all at once.

Unfortunately, there's no better way to handle cache invalidation in this scenario, since it's currently being worked on by the Apollo team. Oh, and I didn't even mention manually writing to and rewriting the cache as done above because that's not a recommmended solution to anyone encountering this problem.
