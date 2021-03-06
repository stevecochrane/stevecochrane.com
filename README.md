# stevecochrane.com

[stevecochrane.com](https://stevecochrane.com/) has been my little corner of the World Wide Web since I was a college
student back in 2005, and the site is now in its seventh design iteration.

### Setup

Assuming you already have [Node](https://nodejs.org/) installed, navigate to the base directory with a command line
interface and do this:

```bash
npm install       # Install Node dependencies
npm run start     # Run webpack-dev-server for local development
npm run lint:css  # Lint CSS with Stylelint (also runs during start/build/pre-commit)
npm run lint:js   # Lint JavaScript with ESLint (also runs during start/build/pre-commit)
npm run build     # Build for production
npm run deploy    # Deploy to AWS (requires AWS CLI, script file isn't in Git for security)
```

### Notes

- This development setup is overly complex for a tiny personal site developed by one person, but I do this to try out
  the latest tools and to get some experience with them.
- The site has a perfect score of 100 for Performance, Best Practices, and SEO in
  [Lighthouse](https://developers.google.com/web/tools/lighthouse) as of September 2019. Accessibility is at 93/100
  because of insufficient contrast between background and foreground colors, which will need to wait until the next
  redesign.
- I've dropped both Less and Sass in favor of [PostCSS](https://github.com/postcss/postcss). The intent is to write
  plain, valid CSS, plus proposed CSS features, and then polyfill for older browsers using
  [postcss-preset-env](https://github.com/csstools/postcss-preset-env), just like using Babel for writing modern
  JavaScript. So this follows proposed standards and does not include things like mixins.
- Now that I've tried using just PostCSS, there are definitely some Sass features that I miss, such as unit conversion
  and color functions. Manually converting the units everywhere is really verbose, and I need to make color operations
  outside of my CSS. So this approach definitely isn’t perfect.
- I would like to have used CSS Grid, but the page’s grid, which I carried over from version 6, is weird and
  unconventional. I’ve kept things as-is for now.
