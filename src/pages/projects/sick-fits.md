---
type: projects
showcase: true
slug: sick-fits
title: Sick Fits
description: >
  An online store where you can buy overpriced street wear and even post your
  own products for sale! Made with a hyper modern stack, with actual credit card
  processing! I even wrote some tests for this bad boy. 

  👚Stay Fresh👗
image: /assets/project__sick-fits.png
repo: https://github.com/leeandher/Sick-Fits
link: https://sick-fits.leanderr.vercel.app/
tech:
  - react
  - apollo
  - prisma
  - graphql
  - jest
  - enzyme
date: 2019-09-04T23:08:01.393Z
---

Sick Fits is a eCommerce website built on a super fresh framework of _Prisma_, _GraphQL-Yoga_, _React (Next)_, and _Apollo_, but even has some other buzzwords like _JWTs_, _Jest_, and _Enzyme_.

Totally functional, fluid animations, and a clean design, so feel free to peruse the site and pick something up to 👚 freshen up your wardrobe 👗.

I don't think I need to say it, but this guy is just a demo running a Stripe Testing environment. You don't actually have to put your real credit card in, but you're welcome to try I guess 😂.

## Using the app

You've been to other online merchants haven't you?! Just browse around the multitude of clothes until you find something you fancy. After that, you should probably make an account so you can actually buy something.

With an account set up, you'll have access to the bulk of the application, including the ability to sell your own products (and manage them), view your profile, add items to your cart, checkout/purchase those items, and review past orders as well!

## How it Works

This app follows a very similar stack to the [Stacker News](https://leander.xyz/projects/stacker-news). It is built on a **Prisma** backend that's been deployed to Heroku, since they have an awesome integration set up. Another **GraphQL-Yoga** server sits on top of the backend, and acts as the proxy for the database manipulations, and also sits on Heroku!

For the Frontend, it was built entirely in the _React_ framework **Next** for the quick loading, built-in SSR, and Router, but also uses **Apollo** for GraphQL/caching. I even managed to write a heck of a lot of tests for the frontend in **Jest** (for logic) and **Enzyme** (for testing, shallow rendering and mounting components)!

For authentication between to the frontend and backend, **JWTs** were used in request **cookies** to ensure a secure connection! Credit card checkout is also handled completely through **Stripe**, that way I don't have to touch any credit card details in the app 😁😁.
