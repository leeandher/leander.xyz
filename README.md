<p align="center">
	<a href="https://leander.xyz">
		<img src="https://dev.leander.xyz/icons/logo-d.png" width="200" alt="leander.xyz logo">
	</a>
  
</p>
<p align="center">
  <a href="https://app.netlify.com/sites/leander/deploys">
    <img src="https://api.netlify.com/api/v1/badges/071321f2-5fa8-47f2-8652-941fc830ae54/deploy-status" alt="Netlify Status">
  </a>
  <img src="https://img.shields.io/static/v1.svg?label=version&message=2.0&color=informational">
	<a href="https://circleci.com/gh/leeandher/leander.xyz">
		<img src="https://img.shields.io/circleci/project/github/leeandher/leander.xyz/live.svg" alt="CircleCI Branch">
	</a>
	<a href="https://gitmoji.carloscuesta.me">
		<img src="https://img.shields.io/badge/gitmoji-%20😎-FFDD67.svg" alt="Gitmoji">
	</a>
  <img src="https://img.shields.io/static/v1.svg?label=JAM&message=stack&color=00c7b7">
</p>

---

# leander.xyz

Hey there, welcome to my site's repository! Here's a bunch of code that powers the site over at [leander.xyz](https://www.leander.xyz) and all the subdomains. Some of the stuff is probably confusing but take a look in the `docs/` folder if there's something you need clarification on.

This site is based on the JAMstack: "the modern web development architecture based on client-side JavaScript, reusable APIs and prebuilt Markup" (https://jamstack.org). It stands for JavaScript, APIs and Markup. It's actual tech stack is the following:

- [React](https://reactjs.org/) on the frontend
- [Gatsby](https://www.gatsbyjs.org/) as the static React framework (SSR, Code-splitting, dynamic pages)
- Markdown/JSON as the content API
- [GraphQL](https://graphql.org/) for turning the markdown into pages (via Gatsby)
- [NetlifyCMS](https://www.netlifycms.org/) as the OAuth protected content management system
- [Netlify](https://www.netlify.com/) as the build process

I try to keep everything as modular as possible, but if you see something wrong, or that you can improve feel free to fork this repo and submit a pull request.

If you just wanna let me know where I messed up, send me an issue and I'll get to it ASAP.

## Dev Usage

Launch the local site with:

```shell
npm install && npm run start
```

It runs a basic Gatsby setup with a few catches for things like `styled-components` and deployable subdomains. Check out the `docs/` directory for more of the complicated stuff

The continuous deployment is done completely through Netlify, as well as the Form and Identity handling.
You can see the Identity configuration in `static/admin/config.yml`.

This is also the configuration file for the entire content management system (CMS).

It is accessible at `localhost:8000/admin/`, but with it's current setup it will still be redirected to Netlify.
You can test your configuration by changing the backend as follows:

```diff
backend:
-  name: git-gateway
+  name: test-repo
-  accept_roles:
-    - admin
-    - editor
-  repo: leeandher/leander.xyz
-  branch: dev
-  commit_messages:
-    create: ✨ Create entry in {{collection}} collection - "{{slug}}"
-    update: ✏️ Edit in {{collection}} collection - "{{slug}}"
-    delete: 🔥 Deletion in {{collection}} collection - "{{slug}}"
-    uploadMedia: 🍱 Upload media - "{{path}}"
-    deleteMedia: 🔥 Delete media - "{{path}}"
```

For making actual changes to site content, head over to https://www.leander.xyz/admin/
