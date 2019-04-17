# Adding Subdomains

If you ever need to add a subdomain to the site, there are a few different parts that you'll need to set up. This document will help guide you through those steps. There are so many steps since it kind of involves a work around that's built into Netlify. We're not really using it as intended but it's fine. _Note:_ This will only work for registered custom domains, not a `example.netlify.com` site.

## Step 0: Verify the content

Whatever you're putting into a subdomain, make sure everything is working, and spell-checked. There is no `dev` branch for subdomains, so think of this like deploying to production. Make sure the README has good spelling, links, etc. Also, this would be a good time to verify the `package.json` by adding/fixing the necessary fields, and pinning the dependency versions.

## Step 1: Checkout a new branch

In order to use Netlify's deploy contexts, you have to checkout a seperate branch that we tell Netlify to use seperate instructions for. The name of this branch must be the name of the subdomain that you wish to publish.

```shell
$ git checkout -b my-new-subdomain
```

## Step 2: Add the contents of your subdomain

Whatever you're choosing to deploy, you can add it to the `subdomains/` directory, in a folder or structure that best suits the application. It can be static, or even be built when deployed, but you should verify that this all works before this step so that everything's up to par.

```shell
$  cp -r src-code subdomains/my-new-subdomain
```

## Step 3: Modify the `netlify.toml` file

In the root of this repository is a `netlify.toml` file. This will tell Netlify how it should deploy each branch that's pushed to GitHub. You have to add a section for your new subdomain, along with the build command. If there isn't one, it will default to the production deployment build command, so be sure to put something to avoid deployment errors:

```toml
[context.my-new-subdomain]
  base    = "subdomains/my-new-subdomain"
  publish = "subdomains/my-new-subdomain/build"
  command = "npm run build"
```

[More Info](https://www.netlify.com/docs/continuous-deployment/#deploy-contexts)

## Step 4: Address redirects and rewrites

If you are deploying a single page application, you're going to need to have HTTP rewrites to avoid 404-ing your users whenever they refresh the page. Additionally, if you want the subdomain to route to any specific URI, you can do that now with Netlify's `_redirects` plain text file. **This file must go in the directory marked as `publish` in your `netlify.toml` file** for it to take effect. It won't be able to redirect properly otherwise.

Plainly, for SPA's, you'll more than likely have a rewrite looking like the following:

```txt
/* /index.html 200
```

which you can put in your `build/` or `static/` (or whatever is similar for your project)

[More Info](https://www.netlify.com/docs/redirects/)

## Step 5: Add the branch deploy context to Netlify

Go to [app.netlify.com](app.netlify.com) and navigate to:

```
YOUR_SITE > Settings > Build & deploy > Continuous Deployment
```

Scroll down to find `Deploy contexts` and click **Edit Settings** to modify the field for Branch deploys. Add the name of the branch you'd deploy over here.

## Step 6: Push to Github

With your entire project ready to go, you can now push to GitHub. If you've done the above steps correctly, Netlify will see your `.toml` file, and proceed with the build based on what you specified. It will also mark this as a branch deploy to give you a prettier `my-new-subdomain--SITE_NAME.netlify.com` URL to preview the deploy. Check it out via the deploy page, and make sure that the app is working as it should.

## Step 6: Add the subdomain to your custom domain on Netlify

Go to [app.netlify.com](app.netlify.com) and navigate to

```
YOUR_SITE > Settings > Domain management > Domains
```

Scroll down to find `Branch subdomains`. If your build was successfully deployed, you should see a button that says `New subdomain`. Click here, and select your branch from the dropdown. Netlify will show you the name of the subdomain that you're about to create. Now you just have to click `Create subdomain` and woosh, it's done! Once it's finished loading you can click the link to go to your new subdomain!

## Step 7: Checkout and Merge

Now that the deployment is done you should make sure to checkout back to the development branch, and merge your new branch. You don't need to delete it, as this could affect your deployed site. Instead, adding it to the main repository branch would be better practice since it won't be affected by the rest of the app (hopefully), and any onlooker on GitHub can get a full glance into your subdomains without having to learn your branch naming scheme and file locations.

And just like that, we have a new subdomain!
