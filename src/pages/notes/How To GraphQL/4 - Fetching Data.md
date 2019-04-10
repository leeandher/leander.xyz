## 4 - Fetching Data.md

In a GraphQL API, there are 3 main actions which we can take with the data. We can **Query** it, **Mutate** it, or **subscribe** to it. These are the fundamental building blocks of GraphQL, and let us define how we use the API for each use case.

### Queries

Simple enough, queries are the most basic, and rudimentary way of _retrieving data_ from our API. In this way, we are simply serving existing data from our endpoint, to the user, but in this case, the User is the one who defines what type of data they would like to receive, instead of having a designated payload for our API endpoint

### Mutations

Mutations involve manipulating our persisted data in some way. If we have a database, this can be seen as the CUD part of our CRUD design, where we create, update, or delete data. We'll get into it more later but GraphQL relies on resolvers to handle the actual operation based on the API request that's being made, so our mutation resolver is responsible for understanding that we mean to manipulate data.

### Subscriptions

Subscriptions are like real subscriptions online today, or in the old magazines. You are asking to be notified of any changes to the payload you specify in the request. This is the type of API call that would be made for live updates, and would only take one request for multiple responses.
