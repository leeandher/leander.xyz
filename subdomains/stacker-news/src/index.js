// create-react-app generics
import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./components/App"

// Required Apollo imports
import { ApolloProvider } from "react-apollo"
import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { BrowserRouter } from "react-router-dom"

// Required subscription server imports
import { split } from "apollo-link"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"

// Link to GraphQL Context for setting http headers
import { setContext } from "apollo-link-context"
import { AUTH_TOKEN, GRAPHQL_ENDPOINT } from "./constants"

import * as serviceWorker from "./serviceWorker"

// Connect to GraphQL Server
const httpsLink = createHttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
})

// Set authentication headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

// Establish the WebSocketLink
const wssLink = new WebSocketLink({
  uri: `wss://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
    connectionParams: {
      // Authenticate ws:// connection
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
})

// Create a split link for both the WebSocket, and Http/Auth
// 1. param => func : boolean, a test function
// 2. param => link, if (func() === true) return this link
// 3. param => link, if (func() === false) return this link
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  wssLink,
  authLink.concat(httpsLink)
)

// Instantiate the ApolloClient
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
