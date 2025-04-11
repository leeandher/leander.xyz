import * as Sentry from "@sentry/astro";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://07126f9ba496dbeb033a8acee0b3a8c6@o209069.ingest.us.sentry.io/4509074276286464",
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});
