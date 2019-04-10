# Learn Node

_A compilation of useful notes and tricks that could come in handy in the future. Better to be safe than sorry!_

---

## Accepting User Input

When you have to reset the password for existing user accounts, the method to do so is through a specific url with `POST` handling. In the case of this project, we add an extra form to the login page using a mixin entitled `forgotForm`, which will send the user to `/account/forgot`.

```pug
<!-- View -->
form(action="/account/forgot")
    h2 I forgot my password!
    label(for="email") Email Address
    input(type="email" name="email" required)
    input.button(type="submit" value="Send a Reset")
```

```js
// Route Handling
router.post("/account/forgot", catchErrors(authController.forgot))
```

This route is only setup to handle a `POST` request, since it requires the email (`usernameField`) which the user is trying to reset. Nothing needs to be rendered here, instead we need to perform the three steps responsible for resetting a password in the backend. In the example, this is done entirely through the `authController`'s `forgot` method.

---

## Handling Reset Through Tokens

There are four steps which should be taken when providing the user with a password reset method. They are as follows:

1. See if the user's email is in the database
2. Add a reset token and expiry on their account
3. Send them an email with the token (usually as a URL)
4. Redirect them to the login page

---

### Step 1

Step 1 is easy enough with the `mongoose` package using the `.findOne` method on the `User` schema. If no user is found, the process ends here, since there is no associated account.

```js
// 1. See if that user's email is in the DB
const user = await User.findOne({ email: req.body.email }) // via the forgotForm
if (!user) {
  req.flash(
    "error",
    "🤷‍ Couldn't find an account associated with that email 🤷‍",
  )
  return res.redirect("/login")
}
```

**NOTE**: You should take into consideration how you communicate the lack of associated account to the user. Saying that there is '_No account associated with that email_' will disclose information to the user which might be sensitive. If this is, consider instead always displaying that '_An email has been sent_' regardless. **However**, note that this may confuse users who forgot which email they've signed up with.

### Step 2

Step 2 is to add the reset token as well as it's expiry onto the user account. Well since we have all our data stored in a database, we can't just add whatever we want whenever, we need to modify the schema so that it accepts the new data. We simply add:

```js
// Model
const userSchema = new mongoose.Schema({
    ...
    resetPasswordToken: String, // They are not required, and random
    resetPasswordExpires: Date // They must become invalid after some time
});
```

Now we can modify the user's account in our database by adding a few lines. We use the `crypto` package which is actually built-in to Node.js without having to `npm install` it, so we can just add the dependency at the top of our controller. It's done as follows:

```js
// Controller
const crypto = require("crypto") // Built-in sequence generator within Node.js

user.resetPasswordToken = crypto.randomBytes(20).toString("hex")
user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
await user.save()
```

### Step 3

Step 3 is to send the user an email containing the reset token that has been added to their account. The email sending part is covered in the next note, so for now we can just imagine we got the link and move on.

### Step 4

Now, for Step 4, we just redirect the user to the `login` page while they wait on the email, which can be done easily through `res.redirect('/login')`. Now once they've used the email link to reset their password, they can enter it here and log in to the web app.

---

## Reset Token Verification

In between Step 3 and 4, a lot of validation has to go on, besides just sending the email. We need to make sure that our randomly generated token, matches the token on their account from when they prompted the reset. After that, we need to ensure that the token isn't yet expired, followed by prompting them to enter/confirm a new password. To make things more complicated, in case there is anything wrong along the way, we need to handle and communicate those errors to the user. In order to accomplish this, we need to string together middleware for validation, as well as some syntactic MongoDB queries to check the expiry.

The first thing we're going to want to do is setup the proper routing and outline the middlewares we will need to use for security along the way. Since the token is dynamically generated, the link will also be dynamic, meaning we'll specify the token in our routes as follows:

```js
router.get(
  "/account/reset/:token",
  catchErrors(authController.verifyResetToken),
  authController.resetForm,
)
router.post(
  "/account/reset/:token",
  authController.confirmedPasswords,
  catchErrors(authController.verifyResetToken),
  catchErrors(authController.updatePassword),
)
```

The validation middleware is the root of this functionality. It will take in the token from the URL (being emailed) and ensure that it belongs to a user, and is not expired. We do this with `mongoose` by making a query to our database to return the user with the specified token field. Since our registration workflow doesn't assign any values to these fields, they can only be generated when a user forgets their password.

```js
exports.verifyResetToken = async (req, res, next) => {
  // Find the user if the token is valid, and not expired
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  })
  if (!user) {
    req.flash(
      "error",
      "🙅‍‍ ‍‍‍The password reset token is invalid or has expired! 🙅‍",
    )
    return res.redirect("/login")
  }

  // Attach the user to the request
  res.locals.resetUser = user
  next() // User & token have been verified!
}
```

This validation middleware uses the `$gt` mongoose expression in order to ensure that the token exists, and is not expired. In case you're wondering about the `req.params.token`, just for clarity, that's actually attached to the request as a parameter because it's a specified variable in the route.

After running this validation, the `GET` route will display the fields for inputting/confirming the new password for the account. The `POST` route however, will have to update the hash/salt that are currently saved in the database, as well as handle clearing the used tokens from the user account.

```js
exports.updatePassword = async (req, res) => {
  // Get the user from the verifyResetToken middleware
  const user = res.locals.resetUser
  const setPassword = promisify(user.setPassword, user)
  await setPassword(req.body.password)
  // Get rid of the fields from MongoDB
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  const updatedUser = await user.save()
  await req.login(updatedUser)
  req.flash(
    "success",
    "😎 Your password has been reset, you are now logged in! 😎",
  )
  res.redirect("/")
}
```

In this last piece of functionality, we are retrieving the `user` data from the previous middleware, and then setting the password to the new entry, just as we had when we originally `.save`d the user. In order to clear data fields from MongoDB, we have to set the desired fields to `undefined` and then save those changes. Once we're done with that, we can call `.login` thanks to Passport.js, and then redirect the user to the homepage, just so they don't have to sign in twice for no reason.

---

## Sending Email in Node

There's a lot of technical stuff that goes into sending Email, specifically the templating, credentials, inlining, and dynamic addresses to which you'll have to send them. For **development** purposes, at least the credentials part can be taken care of via something like _MailTrap_. Once you've created an account, _MailTrap_ gives you the credentials to set up the `HOST`, `PORT`, `USER`, and `PASS` for sending mail, without actually sending it. These sort of variables should be taken care of in your `.env` file.

We will handle all our mail setup and templating in a separate file as a handler (ex. `./handlers/mail.js`). In this file, we will be important the required libraries, setting up the mailer config, and generating the HTML template.

```js
const nodemailer = require("nodemailer") // Sends the email
const pug = require("pug") // Compiles the template
const juice = require("juice") // Inlines the CSS
const htmlToText = require("html-to-text") // Converts Email HTML to text
const promisify = require("es6-promisify") // Converts Callbacks to ES6 Promises

// Create the nodemailer 'sender'
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

// Send an email
exports.send = async options => {
  const html = generateHTML(options.template, options)
  const text = htmlToText.fromString(html)
  const mailOptions = {
    from: "Leander Rodrigues <noreply@leander.xyz>",
    to: options.user.email,
    subject: options.subject,
    html,
    text,
  }
  // Convert the sendMail function response to a promise
  const sendMail = promisify(transport.sendMail, transport)
  return sendMail(mailOptions)
}

// Generate HTML via a template
const generateHTML = (template, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/email/${template}.pug`,
    options,
  )
  const inlined = juice(html)
  return inlined
}
```

_Note:_ You will want to keep all the sensitive server data in your environment file, and reference them as shown, and remember, if you clone a repo with code like this in it, you need to declare your own variables in order for it to work.

You might also notice that `generateHTML` isn't actually exported like we usually do for handlers. This is because this function is only ever going to be used locally, so we don't have to export it!

The code itself is pretty self explanatory, since not much is going on. All we need to do is `import` this javascript file and call `.send` on it with the correct options attached, and we'll successfully send the email! Here's the call we use in this app:

```js
const mail = require("./handlers/mail")
const resetURL = `http://${req.headers.host}/account/reset/${
  user.resetPasswordToken
}`
mail.send({
  user,
  resetURL,
  subject: "Password Reset",
  template: "password-reset", // References a template name
})
req.flash("success", `You have been sent a password reset link.`)
```

---

## User Permissions

In order to create _User Permissions_ to restrict content, or access to certain features on our content, we first need to create a relationship between the two. That means, whenever we have data to limit access to, we need to specify (at creation time) who can or cannot make changes to it. This can be via declaring User Levels:

```js
// Our User
user.level = 25;

// Our Content's Schema
...
text: String,
accessLevel: Number

// Our Content
const content = await new Content({accessLevel: 20}).save()

// Logic
if (user.level >= content.accessLevel) ...
```

You could also use different titles for different users:

```js
// Our User
user.title = 'Admin';

// Our Content's Schema
...
text: String,
accessTitle: String

// Our Content
const content = await new Content({accessTitle: 'Manager'}).save()

// Logic
if (user.title === content.accessTitle || 'Admin') ...
```

And lastly, the way it's been done for this app, is through authorship:

```js
// Our User
user;

// Our Content's Schema
...
text: String,
author: {
  type: mongoose.Schema.ObjectId,
  ref: 'User' // References the User schema in our database
}

// Our Content
const content = await new Content({}).save()

// Logic
if (content.author.equals(user._id)) ...
```

The first two examples showed restricting access through implicit relationships, since both schemas contain a field with related data, which can be used to restrict access. The last example showed an explicit relationship, which directly links the data of that `User` to the `Content` on its creation via the `ref` property.

This property can be pretty useful since `mongoose` can use it to easily gather the data from the `User` schema via the method `.populate()`.

```js
console.log(JSON.stringify(content.author))
// ft6789olkmnbdewe45678ygjhyui  --> the ObjectId of the user

console.log(JSON.stringify(content.populate("author").author))
// {_id: 'ft6789olkmnbdewe45678ygjhyui', name: '...', email: '...'} --> replaces the ObjectId with the associated document
```
