## CSS in JS

Styled Components is just one of many of what are called '_CSS in JS_' libraries. These self-explanatory packages let you write all your styling in JS files, which then get compiled into custom classes/style tags along with taking care of the boring stuff like _vendor prefixing_. Whether or not these libraries are better/cleaner than SCSS or standard CSS is a subjective, but there are some cool things, that these libraries let you do.

---

## Fluid Transition

Specifically with Styled Components, one of the best parts about transitioning over to this method of styling, is the fluidity from CSS. Since it uses [tagged template literals](https://wesbos.com/tagged-template-literals/), you can write your CSS exactly as you would in a `.css` file! Feel free to use spaces, dashes, semi-colons, selectors, depth, nesting, all of it!

---

## Intro to Styled Components

Styled Components is based on React, and template literals. With these concepts combines, you get a library that can easily add styles to custom components, and standard HTML5 tags all at once. Checkout the following examples:

```js
import styled from 'styled-components'
import Header from './Header'

// Based on HTML5 tag
const StyledTitle = styled.h1`
  border: 2px solid red;
  font-size: 25px;
`
// Based on Custom Component
const StyledHeader = styled(Header)`
  bordder: 3px solid blue;
  font-size: 20px;
`
// Other cool stuff
const StyledForm = styled.input.attrs({
  name: 'username',
  placeholder: 'stylish-boi'
})`
  background: dimgrey;
  color: #fefefe;
`
```

For more information, [check out the docs](https://www.styled-components.com/)!

---

## The JavaScript Perk

Since you are writing in JS, you still have all the neat parts of the logical language to add to your CSS. It's just text in a string after all, so you can throw in a `${}` and start adding logic to your styling! Styled Components actually passes your custom component the `props` so that you can write varying styles with JS logic.

```js
// One kind of use case you can use props for!
const StyledHeader = styled(Header)`
  border: 2px solid ${props => props.user.favouriteColour};
`
```

---

## Creating a Theme

Often times, in your React App, you're going to be reusing styles a bunch. Some people call this the websites **palette** or **scheme**, but for Styled Components, this is referred to as the **theme**. The theme is an object of standard JS styles (i.e. with "strings instead of spaces") that will get passed down as `props` onto every Component within the `ThemeProvider` HOC. See here:

```js
import styled, { ThemeProvider } from 'styled-components'

const theme = {
  accent: #00CCCC;
  someCoolOtherStyle: "0 15px";
}

const StyledNav = styled.nav`
  opacity: 0.5;
  background: ${props => props.theme.accent};
`

...
const Page = (props) => (
  <ThemeProvider theme={theme}>
    <StyledNav>
    {props.children}
  </ThemeProvider>
)

export default Page
```

---

## Styling Globally

If you ever need to style the entire application one way, the best tool for the job is the `injectGlobal` function that Styled Components comes with. Think of it like a `<style>` tag at the top of your app!

```js
import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
  }
`
```

---

## Server-Side Rendered Styles

When rendering React Server Side, it's nice that we can get the DOM super fast, but it loses the appeal if we just see ugly black text and blue/purple underlined links on a white background. That's just because our CSS isn't rendered server side, meaning even though were getting our page source with the content, it doesn't have the styles, and instead has to compute them on the first load. You can see this whenever you refresh your Next.js app manually.

To avoid this, Next.js gives us a handy tool known as the Document component. This component is completely rendered server-side and specifically designed to customize the markup for the initial load of the application. It uses the reserved filename of `_document.js` but besides that, it's super easy to setup.

Literally copying the following into your `./pages/` directory, will yield a server-rendered and styled initial load:

```js
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class SickDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
```

This is thanks to the `getInitialProps` method. We'll go more into detail on this in a future note (hopefully) but long story short, it runs before the first render, allowing you to customize the output.

---

## Bonus: Useful React UI - NProgress

Since React-Routed Applications change based on the URL, but don't ever actually refresh, there is no visual feedback to the user whether or not their page is loading. The browser doesn't show progress, or a little pinwheel since React is taking care of all of that.

Because of this, NProgress is a helpful little library that will give you that snazzy indicator at the top of your page to show exactly that, while making it look pretty neat at the same time.

When using this library with Next.js, there are a few lifecycle methods you should hook into. Check out the following:

```js
// In any persistant HOC file
import Router from 'next/router'
import NProgress from 'nprogress'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}
Router.onRouteChangeError = () => {
  NProgress.done()
}
```

They're pretty self-explanatory, but checkout the [docs for Next.js](https://nextjs.org/docs/), or the [NProgress docs](http://ricostacruz.com/nprogress/) for further reading.
