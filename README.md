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
