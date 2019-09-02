# Advanced UI and Code Quality

## Composition

When using the render-props methodology for React Components, you might get into some situations where your components become heavily nested in an incomprehensible series of `{}`s and `()`s. To fix this there's a common sort of structural pattern known as **composition**.

It usually involves a library or some sort of helper function which will take in a series of higher order components, and wrap them around each other, making it easier to pass the info down to your actual application. We can walk through an example below:

Say we have a component that needs to to perform a few different GraphQL operations, all nested within one another, with Apollo. As they recommend, you'd use render props to (as an example) query `localState`, render props to modify `localState` and maybe another render props to query some other user info or something.

It'd look something like this:

```js
render() {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({data: {user}}) => (
        <Query query={LOCAL_STATE_QUERY}>
          {({data: localState}) => {
            // some localState operation check or other code
            return (
              <Mutation mutation={TOGGLE_LOCAL_STATE_MUTATION}>
                {(toggleFunction) => {
                  // some actual JSX markup which uses the
                  // - user
                  // - localState
                  // - toggleFunction
                }}
              </Mutation>
            )
          }}
        </Query>
      )}
    </Query>
  )
}
```

Boy howdy, that thing sure is ugly, and that's just so that your markup can get some actual data. By using _composition_ we can clean that thing up. Let's take the `adopt` function from `react-adopt` as an example.

```js
const Composed = adopt({
  user: <User />,
  toggleCart: <Mutation mutation={TOGGLE_CART_MUTATION} />,
  localState: <Query query={LOCAL_STATE_QUERY} />
})

// Now inside the component...

render() {
  return (
    <Composed>
      {({user, localState, toggleFunction}) => {
        // some actual JSX markup which uses the
        // - user
        // - localState
        // - toggleFunction
      }}
    </Composed>
  )
}
```

What we've done here is provide a wrapper component which goes ahead and nests the render props into one component, which itself provides a new render prop containing keys we declare holding all of that HOC's payload. There are many other looks that this pattern can take depending on the library or implementation but the concept is essentially the same.

---

**NOTE:** There is some wack errors/warnings that the HOC's might through using the above implementation since, they want a child to properly use the render props system. Even though it works without it, the suggested fix for `react-adopt` is the following:

```js
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
})
```

## Debouncing Events

Debouncing as a concept pretty easy to understand and thankfully easy to implement thanks to `lodash` but easy to miss. Often times when creating client side applications, you'll write some code to run on user input, but if this ever involves a data source it might cause some issues. Since React re-renders super fast if you implement something like a search bar, your autocomplete could end up pinging a server multiple times in super quick succession and you'll find yourself sending hundreds of request to a demo server, and might end up with crazy fines or a rate-limited server!

To avoid this, there's a front-end concept known as **debouncing**, which just means, only send this event once for every preset amount of time. In the example above, you could implement a debounce catcher to only send the user's input value to the autocomplete API every 350 ms or something, and save yourself a headache. Here's an implementation with `lodash`:

```js
import debounce from "lodash.debounce"

const Search = () => {
  state = {
    items: [],
    loading: false
  }

  handleSearch = debounce(async (searchTerm, client) => {
    // 1. Set the loading state to true
  await this.setState({ loading: true })
  // 2. Manually query the apollo client
  const res = await client.query({
    query: SEARCH_ITEMS_QUERY,
    variables: { searchTerm }
  })
  // 3. Set the loading state to false, and parse the items
  this.setState({
    items: res.data.items,
    loading: false
  })
  }, 350)

  render() {
    return (
      // ...
    )
  }
}
```

## Implementing Downshift

Downshift is a client-side library which goes ahead and implements a lot of the ideal functionality for search bars. There's a lot of little actions which can be annoying to implement yourself, but seems natural when your browsing. For example:

- using arrow keys
- clicking off the field hides the suggestions
- adding the selected item to as a ghost to the input field
- selecting the suggestion fills the input field
- allowing styling to items selected or note
- and much more...
  Downshift is the go-to library for this stuff since its API is easy to use and does everything in a accessible, easy way.

After importing `Downshift` from the `downshift` package, you implement it as an render prop component, and extract the props you want:

```js
render() {
  return (
    <Downshift
      onChange={this.handleSelection}
      itemToString={item => (item === null ? "" : item.title)}
    >
      {({
        getInputProps, // used on the input field
        getItemProps, // used on thee item component
        isOpen, // conditional containing whether or not drop down fields are visible
        inputValue, // value in the input field
        highlightedIndex // index of the currently selected item
      }) => {
        // Your component markup
      }}
    </Downshift>
  )
}
```

As seen above there's a lot of functionality in the props, but the basis of it is that you have access to all these APIs in your markup, so you can show something based on the `highlightedIndex` or if the `isOpen` is true.

The actual items that you pass to downshift are declared as follows:

```js
{
  items.map((item, i) => (
    <DropDownItem {...getItemProps({ item })} key={item.id}>
      {item.title}
    </DropDownItem>
  ))
}
```

Usually these are gonna be complex objects as your items, so that's what the props you set on the actual DownShift component are for:

- `onChange` indicates what happens when the user selects an item from the dropdown
- `itemToString` indicates how your item should be entered as a string into the input when they select it

All the other intricacies can be seen over at the docs: [https://github.com/downshift-js/downshift](https://github.com/downshift-js/downshift)

---

**NOTE:** SSR with Downshift throws some errors in the console with assigning some different counters that the library uses internally. To fix this, they added a helper function called `resetIdCounter`. Implement it as follows:

```js
import Downshift, { resetIdCounter } from 'downshift'

class Search extends Component {
  // ...
  render() {
    resetIdCounter()
    return (
      // ...
    )
  }
}
```

## Apollo Consumers

The whole `Provider` and `Consumer` setup can sometimes be confusing when you're working with more complicated project structures. Pretty much your `Provider` just sits above the rest of your application, allowing you at access the data it has attached to it wherever you would like to in your application, so long as you set up a `Consumer`. Often times, the way to go with setting up consumers is dependent on the API of the library that you're working with. In this scenario it's the **Apollo Client** for _GraphQL_. The preferred, cleaner way of doing things is by setting up HOCs or just using the Apollo Render-props components (such as `<Query />`, or `<Mutation />`), but occasionally, if your use case is niche enough you may need to manually set up a consumer.

The consumer is just a specific component, which will access the data set up from the `Provider` with render-props or something. In our case, it passes the actual `ApolloClient` object directly to our react component so we can actually send a query without the pre-built component!

```js
<ApolloConsumer>
  {client => (
    <input
      {...getInputProps({
        type: "search",
        placeholder: "Search!",
        id: "search",
        className: loading ? "loading" : "",
        onChange: e => {
          e.persist()
          this.handleSearch(e.target.value, client)
        }
      })}
    />
  )}
</ApolloConsumer>
```

It's actually pretty easy to understand, but when you'd need to do this kind of thing is kinda rare. Often times when you're using another library, you may be limited to their API, and its in these scenarios where you'll find yourself breaking this thing out. Like in the app built along with these notes, it was while implementing _Downshift_, as talked about above!
