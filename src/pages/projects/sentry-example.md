---
type: projects
showcase: true
slug: sentry-example
title: Sentry Integration Example
description: As part of an effort to grow the integrations platform at
  Sentry.io, I led a project to develop and realistic example app to serve as a
  reference for developers.
image: /assets/project__sentry-example.png
repo: https://github.com/getsentry/integration-platform-example/
link: https://docs.sentry.io/product/integrations/integration-platform/
tech:
  - typescript
  - react
  - python
  - flask
  - node
  - api development
  - documentation
date: 2022-06-22T14:28:25.113Z
---
This Example App was built for [Sentry](https://sentry.io) as part of an effort to grow the integration platform. As the company grew, and the scale/bandwidth of teams changed, building new integrations was becoming more difficult, especially if we wanted them to be as feature rich as some of the original ones. To address this, we'd developed the integration platform, a standardized publication platform to get your app in front of Sentry users, with a consistent API and documentation.

Unfortunately, it was not the easiest thing to use/understand. Features in Sentry were often not documented, and quirks of the platform started to harm the developer experience in more than a few ways. To reduce this friction, I was responsible for building a maintainable, easy to set up starter app that we could point to as a jumping off point!

This example app serves as a reference for how best to implement and integration with Sentry. I went over what data models you will need, how to design your installation flow, and how to authenticate/verify requests for security. The repository itself contains a wealth of helpful docs, a single command for setup/teardown and two entirely distinct codebases for TypeScript and Python code snippets to use while you're building!