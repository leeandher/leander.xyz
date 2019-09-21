## Using Jest and Enzyme

For testing a GraphQL-based React App, the go-to testing frameworks are probably Jest (a javascript testing made by Facebook) and Enzyme (a react testing framework made by Airbnb). Using these guys in tandem will let us test pretty much every part of our application thoroughly, so long as we follow a few specifications. Firstly, Jest crawls our project for any files with the extension `.spec.js`, `.test.js` or any `.js` file located in a `__tests__` directory. Along with that, any of those files will also get a bunch of global testing functions which can be found [here](https://jestjs.io/docs/en/api). They are how we're going to be writing tests in these files.

To summarize the stack:

- **Jest**: testing JS logic, computation, and using its global imports (e.g. snapshots, expect fns)
- **Enzyme**: testing React, using shallow rendering, mounting,

## Unit Testing

Unit testing is a super simple concept where you just make a bunch of edge cases for certain functions and operations and see whether or not they yield expected values. It's not very useful for React, but its a good concept in general for things like helper functions, or just logic in general. Take the following example, where `formatMoney` is a function which should turn a `number` of cents into a `string` formatted to look like currency:

```js
import formatMoney from "../lib/formatMoney"

describe("formatMoney function", () => {
  it("works with fractional dollars", () => {
    expect(formatMoney(1)).toEqual("$0.01")
    expect(formatMoney(10)).toEqual("$0.10")
    expect(formatMoney(9)).toEqual("$0.09")
    expect(formatMoney(40)).toEqual("$0.40")
  })
  it("leaves cents off for whole dollars", () => {
    expect(formatMoney(5000)).toEqual("$50")
    expect(formatMoney(100)).toEqual("$1")
    expect(formatMoney(500000)).toEqual("$5,000")
  })
  it("works with whole and fractional dollars", () => {
    expect(formatMoney(5012)).toEqual("$50.12")
    expect(formatMoney(101)).toEqual("$1.01")
    expect(formatMoney(110)).toEqual("$1.10")
    expect(formatMoney(17238948129384917)).toEqual("$172,389,481,293,849.16")
  })
})
```

## Mocking

Mocking is a more in-depth concept related to testing wherein you write tests so that they don't reach into external data sources. That means no databases, no API calls, nothing that isn't contained in the test. The reason for this is because you want to be testing your app, you don't want to be testing an external data source.

_If you run the data source as well, then you should be writing tests for the data source as well, but they shouldn't be related to the app._

So instead of fetching data in your app, you can just describe the data that comes back if it _were successful_, and test how your application uses it. If you ping an endpoint for a list of languages, and reorder them in your app, mocking is just having the list of languages stored in the test, and only testing how you reorder them.

In jest, it'll look a little something like this:

```js
describe("mocking a function", () => {
  it("can fetch data", async () => {
    api.fetchData = jest.fn().mockResolvedValue({
      message: "success",
      status: 200
    })
    const outputData = await api.fetchData()
    expect(outputData).toHaveProperty("message", "success")
    expect(outputData).toHaveProperty("status", 200)
  })
})
```

One of the major benefits from mocking return data is that your tests will take much less time to run compared to if they had to reach outside themselves and get the data on their own. It makes them much less brittle as well, since you don't have to worry about the external data source not working, or changing how the return data is shaped.

More commonly in web-apps you'll have to mock some of the common browser functionality, and your imported libraries. Say for instance if you call `window.alert()`, or use `Router` or `NProgress` as imports. All you have to do in your tests, is mock those functions:

```js
global.alert = jest.fn()
Router.router = {
  push: jest.fn(),
}
NProgress.start = jest.fn()

// In the tests...

expect(alert).toHaveBeenCalled()
expect(Router.router.push).toHaveBeenCalledWith({pathname: '/home'})
expect(NProgress.start).toHaveBeenCalledTimes(3)
```

## React Testing Concepts

There are a few concepts in testing that are unique to React (or more generally, frontend frameworks in JavaScript), and those will often involve transforming code to HTML. Here's a little explanation of what they are:

### Shallow Rendering

Shallow rendering refers to taking a React Component and only rendering the surface level of it's children. That means, whatever other react components the parent contains, those will show up in the return value from the shallow render. Shallow rendering is much simpler and used often to test self-contained components, where you only really need to know whether the props affect the content or whether the component has rendered.

Let's go through an example, the following code represents a component `<Parent />`:

```jsx
<Wrapper>
  <Child>
    {data.map(item => <li>{item}<li>)}
  </Child>
</Wrapper>
```

If we shallow render this component, it would look something like this:

```js
<Wrapper>
  <Child>{{...}}</Child>
</Wrapper>
```

The output is purely top level, and doesn't actually render the HTML that JSX is converted to.

### Mounting

Mounting a component is sort of different, in that it actually renders out the component in a browser like environment, and we get the raw HTML that would be sent to the client in our actual app. Usually this sort of thing is preferred since as a general rule of practice **we want our testing environment as close to the client environment as possible**, and mounting lends to that. The complicated stuff comes with things like `styled-components` and other libraries which randomly generate classnames and stuff, but we can also safely ignore things like render-props components, since we get the output of the whole thing anyway!

In the example above, a mounted `<Parent />` component would look something like this

```html
<section class="wrapper">
  <div class="child">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </div>
</section>
```

Now we can see the actual data output and compare it to what we'd expect in our test, making sure that classes, elements and values all match up.

## Snapshot Testing

Snapshot testing is the basis for testing React Components, and its a concept built on _shallow rendering/mounting_ components. It's super simple, a snapshot test just renders the component (shallow or mount) and compares it to a _snapshot_ of the component it has saved in a separate file. All it does is scan both and make sure they are identical, and will point out to the test-runner any changes that have been made.

In practice, it'll help to use the `toJSON` method from the _enzyme-to-json_ library, to make prettier component snapshots:
```js
import { shallow, mount } from "enzyme"
import toJSON from "enzyme-to-json"

import CartCount from "../components/CartCount"

describe("<CartCount />", () => {
  it("renders", () => {
    shallow(<CartCount count={10} />)
  })
  it("matches the snapshot", () => {
    const wrapper = shallow(<CartCount count={10} />)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
  it("updates via props", () => {
    const wrapper = mount(<CartCount count={50} />)
    expect(toJSON(wrapper)).toMatchSnapshot()
    wrapper.setProps({ count: 15 })
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
})
```

With snapshot testing, if you make a change to a component, it fails the test, so that means new features always fail. Still though, its super simple, jest lets you simple press `u` on the test runner, and the snapshots will update.

A benefit of this is that you'll be able to track the snapshots using git, along with your regular components, meaning if someone changes a component, they can also change the snapshot tests. This will let reviewers see the logic change in the component, along with the visual change to the UI, all in one!


## Simulating Events

Quick little concept to understand about testing React Components; since you're making a web app, your users are obviously going to interact with it (i.e. clicking buttons, filling out inputs), so we need to test those. The way we do that in `enzyme` is by **simulating events**. This means that we find the exact element we want to test, and use the `.simulate` chained method to describe the event, and event object passed to the component:

For example:
```js
const inputField = wrapper.find('input')
inputField.simulate('change', {target: {value: 'This is the typing value', name: 'inputFieldName' }})
```

The above example takes the input field and simulates a typing event which passes `This is the typing value` into the component under that event object. In the component, make sure you have values passed for whatever the handler is, so if you use `e.target.name` or `e.target.value` they are specified in your custom event object.

## Mocking Apollo

In order to Mock Apollo we need to actually set up a `MockedProvider` which is a helpful HOC, provided with **react-apollo**. All it does is wrap components that would be wrapped by the real provider in the application in order to test them. You provide all the mocks for the queries made by the component and the `MockedProvider` will just send them down to the component. Check it out:

```js
import wait from 'waait'
import { mount } from "enzyme"
import { MockedProvider } from 'react-apollo/test-utils'
import { CURRENT_USER_QUERY } from '../components/User'

const fakeUser = fakeUser()
const mocks = [
  {
    request: { query: CURRENT_USER_QUERY }
    result: { data: { me: fakeUser} }
  }
]

describe('<Component />', () => {
  it('can query the provider', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Component />
      </MockedProvider>
    )
    // This step is to get past the loading state
    await wait()
    wrapper.update()

    const testComp = wrapper.find('Component').instance()
    expect(testComp.makeCurrentUserQuery).toHaveBeenCalled()
    expect(testComp.state.user).toMatchObject(fakeUser)
  })
})
```

All we do is specify what we'd like the return data to send back to the component and the `MockedProvider` takes care of the rest!

**NOTE:** As of now, there really isn't a good way to go about testing the _clientState_ frontend resolvers. These are the ones that we actually write into the ApolloClient declaration. See below:

```js
function createClient({ headers }) {
  return new ApolloClient({
    uri: SERVER_ENDPOINT,
    request: operation => operation.setContext({
      fetchOptions: {credentials: "include"}, 
      headers
    })
  },
  // local data
  clientState: {
    resolvers: {
      Query: {
        // Any resolvers in here cannot be tested nicely
      },
      Mutation: {
        // Any resolvers in here cannot be tested nicely
      }
    },
  }
}
```

## Apollo Consumer

When you're testing to see if your operations actually had an affect on your application, you should be using the `ApolloConsumer` API. What you're really doing is seeing if the **client before the operation is equal to the client after**. With the `ApolloConsumer`, you can take the returned client above where it's mounted and see if it's changed after simulating some functionality:

```js
it('adds an item to cart when clicked', async () => {
  let apolloClient
  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <ApolloConsumer>
        {client => {
          apolloClient = client
          return <AddToCart id="abc123" />
        }}
      </ApolloConsumer>
    </MockedProvider>,
  )
  await wait()
  wrapper.update()
})
```

With that, our test now has access to the **apolloClient** _outside_ of the render-props setup. To test if our operation has succeeded all we need to do is perform the query ourselves:

```js
// Get the initial state after loading
const { data: beforeClick } = await apolloClient.query({ query: CURRENT_USER_QUERY })
expect(beforeClick.cart).toHaveLength(0)

// Simulate the mutation
wrapper.find('button').simulate('click')
await wait()

// See if the state changes
const { data: afterClick } = await apolloClient.query({ query: CURRENT_USER_QUERY })
expect(afterClick.cart).toHaveLength(1)
```

There are two ways of setting these sorts of tests up to pass, and they're a little different since it depends how the component interacts with the **ApolloClient**. If the component being tested has an **Optimistic UI** or an **Updater Function** (_See  5 - Persisting Client Side Data: Optimistic Response/UI_), then it'll work by default without having to do any more mocks, since you're manually changing the cached data.

If not, you'll have to create a second mock which contains what the data should look like after refetching the query from the database:

```js
const mocks = [
  // Before click mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: {data: { ...fakeUser(), cart: [], }, },
  },
  // Clicking mutation mock
  {
    request: {
      query: ADD_TO_CART_MUTATION,
      variables: { id: 'abc123', },
    },
    result: {
      data: { addToCart: { ...fakeCartItem(), quantity: 1, }, },
    },
  },
  // After click mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: {data: { ...fakeUser(), cart: [fakeCartItem()], }, },
  },
]
```
