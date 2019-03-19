https://img.shields.io/circleci/project/github/leeandher/leander.xyz/live.svg

## How to Create Pages

![CircleCI branch](https://img.shields.io/circleci/project/github/leeandher/leander.xyz/live.svg)

Create a new `.js` file in the `src/pages/` directory as a default export React component. This will create the entire page.

If the page needs data, import `graphql` from `gatsby` and then use it as an export. That is, include:

```js
export const queryName = graphql`
  // Some fancy query
`
```

and Gatsby will do the heavy lifting by passing it into your Component as a prop under the name `data`.

If the page needs info from `gatsby-node.js` file, then you can pass it via `pageContext`. It will be accessible in the `pageContext` prop.
