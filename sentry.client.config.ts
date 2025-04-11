import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://07126f9ba496dbeb033a8acee0b3a8c6@o209069.ingest.us.sentry.io/4509074276286464",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
