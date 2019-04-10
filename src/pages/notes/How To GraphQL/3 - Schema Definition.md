## Schema Definition Language

One of the fundamental parts of any API structure is the method in which we define the schema. As outlined before, this is required to be set before either front-end or back-end teams start with their use-cases.

GraphQL APIs use a special syntax, named the _Schema Definition Language (SDL)_ in order to create the Schema. This involves defining the **types** in the database, their **properties** and any **relations** which could come from the data.

Here are some examples of type definitions within the SDL:

```graphql
type Person {
  name: String!
  age: Int!
  posts: [Post!]!
}

type Post {
  title: String!
  author: Person!
  rating: Int
}
```

This would be how we would define the data retrieved by our API. Every `person` item has the `name`, `age`, and `posts` field attached, and they must be populated, since they have an **exclamation mark (!).** This is how we denote fields as mandatory. In this case, if the `Person` has not made a post yet, this requires that `Person.posts` at least returns an empty array, or `[]`.

Other than that, the types are fairly standard. We must define how our data looks (via `string`, or `int`) so that our database doesn't throw any errors,

As you can see though, we can also define **custom types**. These are pretty much required if you are persisting data, since you want to be able to store properties on each data type. If we want to relate these types, simply replace the regular `Boolean`, `String`, or `Int` with the custom type (ex. `Person` or `Post`).
