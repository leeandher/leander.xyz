## Introduction to Stripe

Stripe is a really useful way for handling credit cards in your online store. The main selling point is that as a developer, you no longer have to deal with the hassle of handling your user's credit cards and associated data, or worry about the charges, taxes, international fees, exchange rates, or any of that stuff. Instead, all you have to do in your application, is pass the user through a **Stripe Checkout**, and then parse the information that comes back from that.

## How Stripe works

By _parse the information_, I really just mean to extract the one important part that comes as a response from the Stripe API; the **charge token**. This is the beautiful part about Stripe, after the user enters their credit card information, Stripe will save that, and set up an associated Credit Card charge for the dollar amount you send to them. Next, you'll receive that charge token, and essentially, just call a function with it as an argument that charges the card! On your end, you never see the card number, CVC, or any of the user's private info, just this charge token that Stripe sets up.

## Setting up Stripe (Frontend)

With React, setting up an entire Stripe checkout flow is really just a few steps:
1. Install the node module `react-stripe-checkout`, import `StripeCheckout` into your checkout procedure ([Link](https://github.com/azmenak/react-stripe-checkout)). 
2. Now, you need to setup a Stripe account over at [stripe.com](https://www.stripe.com).
3. Make sure you account is either in _Test_, or _Production_, depending on your needs, and copy the **Publishable API Key**
4. Setup the HOC `StripeCheckout` component with your applications props:
   
```js
  <StripeCheckout
    amount={calcTotalPrice(user.cart)}
    name="My App"
    description={`Order of ${this.totalItems(user.cart)} items!`}
    image={user.cart[0].item.image}
    stripeKey={PUBLISHABLE_STRIPE_KEY}
    currency="USD"
    email={user.email}
    token={res => this.onToken(res, createOrder)}
  >
    {children}
  </StripeCheckout>
```
The `onToken` method does a lot of the heavy lifting for this application's frontend. The rest of the code is just information to help Stripe with the CC Charge, the `onToken` method is where we will send the actual **charge token** to the backend of our application. In this example, `createOrder` is a function coming from a GraphQL mutation HOC.

## Setting up Stripe (Backend)

On the backend, setting up a stripe has a few more gotchas associated with it:

1. Set up an _OrderItem_ type based on your initial _Item_ type.
```graphql
type Item {
  id: ID! @id
  title: String!
  description: String!
  image: String
  largeImage: String
  price: Int!
  updatedAt: DateTime! @updatedAt
  createdAt: DateTime! @createdAt
  user: User!
}

type OrderItem {
  id: ID! @id
  title: String!
  description: String!
  image: String!
  largeImage: String!
  price: Int!
  user: User
  quantity: Int! @default(value: 1)
}
```
This is done for the user when they complete the purchase, saving a copy of the items as they were for their records. If the item is ever deleted, or the description/price/title of it were to change, that wouldn't be reflected on their previous order or invoice!

2. Setup an _Order_ type to save the transaction information

```graphql
type Order {
  id: ID! @id
  items: [OrderItem!]!
  total: Int!
  user: User!
  charge: String!
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
}
```
3. Copy your application's **Secret API Key** from your Stripe account
4. Install the `stripe` official node module ([Link](https://github.com/stripe/stripe-node))
5. Setup the new library with the Secret Key:
   
```js
// root/stripe.js
module.exports = require('stripe')(process.env.STRIPE_SECRET);

// root/resolvers/Mutation.js
const stripe = require("../stripe")
```

1. Setup a `Mutation` to handle creating a User's order

This is the bulk of the work that goes into setting up Stripe. Your mutation should do the following steps:

```js
async createOrder(parent, { token }, ctx, info) {
 // 1. Query the current user, make sure they're signed in
 // 2. Recalculate the total for the price
 // 3. Create the stripe charge
 // 4. Convert the CartItems to OrderItems
 // 5. Create the Order
 // 6. Clear the user's cart, delete the CartItems
 // 7. Return the order to the frontend
}
```
Steps 1, 4, 5, 6, and 7 are all normal GraphQL backend steps, so we really just need to dive into steps 2 and 3.

The reason why we recalculate the total price for step 2 is because we never want to trust the data coming from the frontend, we want to control the price safely. A malicious user could try to send a price of 1 cent back from the frontend after messing with the code, and if we charge that as normal, they'll be undercutting the product sale.

Step 3 is something pretty much directly from the Stripe API:

```js
const charge = await stripe.charges.create({
  amount,
  currency: "USD",
  source: token
})
```
The `charge` object will contain a lot of info about the transaction. While it'll also be on your Stripe dashboard, it's a good idea to save the value of `charge.id` to the `order` in your database. 

## Testing with Stripe

Last little thing on implementing Stripe, if you want to make sure it works, you're going to need to run some Credit Cards through it. Luckily Stripe has a bunch of test numbers and tokens you can use to make sure you have all your error handling set up correctly: [stripe.com/docs/testing](https://stripe.com/docs/testing)