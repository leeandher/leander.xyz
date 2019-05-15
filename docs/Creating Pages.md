# Creating Pages

Gatsby v2.0 already has a plugin pre-installed which easily allows converting React Higher-Order Components into web pages. All you have to do is create a new `.js` file in the `src/pages/` directory and make sure to designate the default export as a React Component.

If the file is named `test-page.js`, the component's content will be rendered on `localhost:8000/test-page` as well as on the live URL. The API also supports nesting and index pages allowing for more complicated routes. The following table provides some examples:

| File Location                | Resource Path   |
| ---------------------------- | --------------- |
| `src/pages/test.js`          | `/test`         |
| `src/pages/folder1/index.js` | `/folder1`      |
| `src/pages/folder1/test.js`  | `/folder1/test` |

# Extracting Data

If the page you're creating requires data, the `graphql` API can help out. Firstly add the following import statement:

```js
import { graphql } from "gatsby"
```

To register the query within the component, the page file must export a graphql query using the imported module. The data returned from this query will be populated under the `data` prop attached to the React component:

```javascript
const BlogPostTemplate = ({ data }) => {
  const { html } = data.markdownRemark
  const { date, title, description, tags } = data.markdownRemark.frontmatter
  return <>
    <h2>{title}</h2>
    <time>{date}</time>
    <p>{description}<p>
    {tags.map(tag => <li>{tag}<li>)}
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </>
}

export default BlogPostTemplate

export const blogPostQuery = graphql`
  markdownRemark(frontmatter: { slug: { eq: $slug }, type: { eq: "blog" } }) {
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      title
      description
      tags
    }
  }
`
```

You can see certain pre-defined variables in the query such as `$slug`. These come from the `createPages` API defined in `gatsby-node.js`. They attach the `$` to any context properties, making it easier to systematically create pages.

The actual data the GraphQL endpoint has access to is determined by the `gatsby-config.js` in the project root, usually under plugins which start with `gatsby-source-`. Along with that, there are some default APIs which are accessible by the built-in Gatsby endpoint. To check out the sandbox and data options, visit `localhost:8000/___graphql/`.

# Static Queries

If data in the API is static you may want to look into the `StaticQuery` API given by Gatsby. It functions much like the regular graphql queries except that:
 - It doesn't accept any variables (hence static, not even `pageContext`)
 - The regular queries outlined above exclusively work with the pages, Static Queries can operate in components

For a more detailed explanation, including usage, check out: https://www.gatsbyjs.org/docs/static-query/




