# stevecochrane.com

[stevecochrane.com](https://stevecochrane.com/) has been my personal space on the internet since I was a college student
back in 2005, and the site is now in its seventh design iteration.

### Setup

Assuming you already have [Node](https://nodejs.org/) installed, navigate to the base directory with a command line
interface and do this:

```bash
npm install       # Install Node dependencies
npm run start     # Run webpack-dev-server for local development
npm run lint:css  # Lint CSS with Stylelint (also runs during start/build)
npm run lint:js   # Lint JavaScript with ESLint (also runs during start/build)
npm run prettify  # Run Prettier on staged files (also runs on pre-commit)
npm run build     # Build for production
```

### Notes

- This development setup is overly complex for a tiny personal site developed by one person, but I do this to try out
  the latest tools and to get some experience with them.
- I've dropped both Less and Sass in favor of [PostCSS](https://github.com/postcss/postcss). The intent is to write
  plain, valid CSS, plus proposed CSS features, and then polyfill for older browsers using
  [postcss-preset-env](https://github.com/csstools/postcss-preset-env), just like using Babel for writing modern
  JavaScript. So this follows proposed standards and does not include things like mixins.
- Now that I've tried using just PostCSS, there are definitely some Sass features that I miss, such as unit conversion
  and color functions. Manually converting the units everywhere is really verbose, and I need to make color operations
  outside of my CSS. So this approach definitely isn’t perfect.
- The image files are currently the same for all screen sizes, which isn’t ideal for smaller screens because the
  aspect ratio is too wide, resulting in some pretty tiny images. I’d like to add another set of image files at a
  taller aspect ratio for smaller screens.
- I would like to have used CSS Grid, but the page’s grid, which I carried over from version 6, is weird and
  unconventional. I’ve kept things as-is for now.
