# stevecochrane.com

[stevecochrane.com](https://stevecochrane.com/) has been my little corner of the World Wide Web since I was a college
student back in 2005, and the site is now in its seventh design iteration.

### Setup

Assuming you already have [Node](https://nodejs.org/) installed, navigate to the base directory with a command line
interface and do this:

```bash
npm install       # Install Node dependencies
npm run prepare   # Install Husky pre-commit hook
npm start         # Run Eleventy's dev server for local development
npm run build     # Run an Eleventy build for production
npm run deploy    # Deploy to AWS (requires AWS CLI, script file isn't in Git for security)
```

### Notes

- The site has a perfect score of 100 for Performance, Best Practices, and SEO in
  [Lighthouse](https://developers.google.com/web/tools/lighthouse) as of July 2022. Accessibility is at 97/100
  because of insufficient contrast between background and foreground colors, which will need to wait until the next
  redesign.
- Now that all major browsers natively support lazy loading for images, this site serves zero JavaScript!
  Most bundling tools like Webpack are JS-centric, but [Eleventy](https://www.11ty.dev) is perfect for a simple site
  like this. I can build an HTML document from Nunjucks templates populated with data, and process, minify, and inline
  my styles, all with
  [a tiny config file](https://github.com/stevecochrane/stevecochrane.com/blob/main/.eleventy.js).
- I've dropped both Less and Sass in favor of [PostCSS](https://github.com/postcss/postcss). The intent is to write
  plain, valid CSS, plus proposed CSS features with PostCSS polyfills if needed. So this follows proposed standards and
  does not include things like mixins.
- I would like to have used CSS Grid, but the page’s grid, which I carried over from version 6, is weird and
  unconventional. I’ve kept things as-is for now.
