import Raven from 'raven-js'

//Our app specific Sentry URL
const sentry_key = '09d93d04d1464364a4f37ada41799fc3'
const sentry_app = '1331156'
export const sentry_url = `https://${sentry_key}@app.getsentry.com/${sentry_app}`

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  })
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex)
}
