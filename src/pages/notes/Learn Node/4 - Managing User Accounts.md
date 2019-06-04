# Learn Node

_A compilation of useful notes and tricks that could come in handy in the future. Better to be safe than sorry!_

---

## Creating the Schema

Just like any other set of data we have to save, we need to create a User Schema in order to receive data in a format we can use. The thing is, with handling users, you also have to handle their passports and that kind of sensitive data needs to be `hash`ed so that if our DB leaks, or we have any sort of breach, our users aren't compromised. Here's an example User Account Schema:

```js
...
const validator = require("validator"); // Backend validation
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please supply an email address"
  },
  name: {
    type: String,
    trim: true,
    required: "Please supply a name"
  }
});
// passportLocalMongoose
// Adds a bunch of custom methods to our User schema
// usernameField specifies which field on our schema to use for login
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

// Cleans up how the userSchema.email.validate error looks when conflicted with {unique: true}
userSchema.plugin(mongodbErrorHandler);
...
```

This schema seems pretty complicated, but seemingly empty at the same time. The reason for this is the lack of password or passphrase or any verification field for the user. Well, this is actually completely handled by the `passport-local-mongoose` plugin which itself modifies our schema behind-the-scenes to add in the `hash` and `salt` field, so that we never have to deal with the user's passwords.

When we create our `.register` middleware, we can call these methods on our instance of the schema. In the following example, we can use the additional `promisify` library to get rid of the callback API, and still easy save the `req.body.password` field to our User database.

```js
exports.register = async (req, res, next) => {
  // Create the user
  const user = new User({ name: req.body.name, email: req.body.email })
  // .register(createdUser, password, callback)
  // User.register(user, req.body.password, function(err, user) {});
  // Since .register returns a callback, we need to turn it into a promise and await that
  const register = promisify(User.register, User)
  await register(user, req.body.password)
  next() // pass to authController.login
}
```

The reason we pass it a `next()` instead of simply redirecting somewhere is because Passport.js can be used for authentication in an easy manor, but, as we'll talk about later on, it makes our code more readable to keep authentication controls separate.

---

## Validating User Data

Whenever we accept data from the user into a sensitive database (such as the `User` schema), we should run validation on each of the queried fields. This is to prevent scoundrels from sending _copied emails_, and `<script>` tags, and other nonsense when they create their entries in our database. There is a really helpful library for this, called `express-validators` which can be globally imported for requests via `app.use()`.

```js
exports.validateRegister = (req, res, next) => {
  req.sanitizeBody("name");
  req.checkBody("name", "You must supply a name!").notEmpty();
  req.checkBody("email", "That email is not valid!").isEmail();
  req.sanitizeBody("email").normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  ...

  const errors = req.validationErrors();
  if (errors) {
    req.flash("error", errors.map(err => err.msg));
    res.render("register", {
      title: "Register",
      body: req.body,
      flashes: req.flash()
    });
    return;
  }
  next();
```

These will throw errors into the `validationErrors()` function if anything goes awry, and if not, we'll just skip to the next middleware! This control function is also an example of self contained error handling rather than using `catchErrors` like we have been doing.

---

## Using Passport.js for Authentication

Another note to keep in mind is that with the ability to sign-in, comes the need to view and change profile data, register, validate the register data, and that can get pretty hairy. This is especially true when you take into account the need to interface with the database when authenticating the user login, logout and password resets. Therefore, to keep things distinct we write two separate controllers: `authController.js` for handling profile authentication, and `userController.js` for handling individual user actions.

A lot of the methods you'd expect to find in the `authController` are simplified since we can call an import and use Passport.js globally through our `app.js` file.

Now that we've set it up, we don't even have to think twice about setting logins and authentication, we can just use the methods in our `authController` and continue with developing our app. Lots of code incoming, but the gist of it is that we can write these controllers in very readable, clear code that take a lot of the messy work off our hands.

```js
// "local" --> type of strategy on Passport.js
exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: "Failed Login!",
  successRedirect: "/",
  successFlash: "You are now logged in!",
})

exports.logout = (req, res) => {
  req.logout()
  req.flash("success", "👋 You are now logged out! 👋")
  res.redirect("/")
}

exports.isLoggedIn = (req, res, next) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    next() // They are logged in
  } else {
    req.flash("error", "🛑 Sorry, you gotta log in first! 🛑")
  }
}
```

---

## Editing Account Data

We need to allow the user to modify the information they provided for their account (i.e. email or name, passwords are covered in the next note). This is actually pretty self explanatory, similar to editing any other piece of data, but just to drill it into memory, since can change many fields at any time, you just need to update the `document` using a field which cannot change. For MongoDB, this would be the `_id` field, which is automatically generated for every entry.

```js
exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email,
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user._id }, // Query
    { $set: updates }, // Updates
    { new: true, runValidators: true, context: "query" }, // Options
  )
  req.flash("success", "👍 Updated your profile! 👍")
  res.redirect("back")
}
```

The `_id` is a point of reference, and we can change the values within that document as much as we want. The _options_ object let's you further specify some parameters. In this example `new` means that we should display the new data on the next response, `runValidators` checks the legitimacy of data (i.e. email format), and `context` is a mongoose-requirement, which can be read about more on the docs (along with some validation stuff) over [here](https://mongoosejs.com/docs/api.html).

---

## Dynamic Layouts

Regardless of whether or not our user is signed in, in most cases we will display the same layout. There will be some differences, perhaps it says '_logout_' instead of '_login_', or there is an avatar where the register button used to be, but this doesn't merit copying 90% of the layout into another view (a separate `.pug` file).
We can programmatically determine whether the user is signed in by instantiating it as a global middleware with `app.use` as follows:

```js
app.use((req, res, next) => {
  // res.locals.h = helpers; -> helpers within pug
  // res.locals.flashes = req.flash(); -> flashing messages to the user
  res.locals.user = req.user || null
  // res.locals.currentPath = req.path; -> gets the path of the view
  next()
})
```

This will set the `locals.user` object directly to the `user` object, which Passport.js creates, so that we can reference the user fields in our layouts. If no user is signed in, no worries, since Pug won't render the `null` values.

```pug
<!-- In a template -->
if user
  li.nav__item: a.nav__link(href="/hearts", class=(currentPath.startsWith('/hearts') ? 'nav__link--active' : ''))
    != h.icon('heart')
    span.heart-count #{user.hearts && user.hearts.length}
  li.nav__item: a.nav__link(href="/logout", class=(currentPath.startsWith('/logout') ? 'nav__link--active' : ''))
    != h.icon('logout')
    span Logout
  li.nav__item: a.nav__link(href="/account", class=(currentPath.startsWith('/account') ? 'nav__link--active' : ''))
    img.avatar(src=user.avatar + '&d=retro')
```
