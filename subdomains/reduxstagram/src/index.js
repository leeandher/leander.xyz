import React from 'react'
import { render } from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

//Import Components
import App from './components/App'
import Single from './components/Single'
import PhotoGrid from './components/PhotoGrid'

//Import React Router Dependencies
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './store'

/* CRASH REPORTING */

//Import our SDK
import Raven from 'raven-js'

//Import our error stream (and a custom exception handling method)
import { sentry_url } from './data/config'

//Let Sentry watch our code for errors
Raven.config(sentry_url).install()

//Send custom data along with all errors
// Raven.config(sentry_url, {
//   tags: {
//     git_commit: 'asdf9876',
//     userLevel: 'editor'
//   }
// }).install();

//Don't send an error with a stack trace, just send a message
// Raven.captureMessage('Something went wrong!');

//Ask the user for feedback when an error occurs
// Raven.showReportDialog();

//If the exception goes through, send the error with some additional info
// logException(new Error('Some error occured!'), {
//   email: 'fake@gmail.com'
// });

const Reduxstagram = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={PhotoGrid} />
        <Route path="/view/:postId" component={Single} />
      </Route>
    </Router>
  </Provider>
)

render(<Reduxstagram />, document.getElementById('root'))

serviceWorker.unregister()
