# stevecochrane.com

[stevecochrane.com](https://stevecochrane.com/) has been my personal space on the internet since I was a college student
back in 2005, and the site is now in its sixth design iteration.

### Setup

Assuming you already have [Node](https://nodejs.org/) installed, navigate to the base directory with a command line
interface and do this:

```bash
npm install
npm run build
```

### Notes

- This development setup is overly complex for a tiny personal site developed by one person, but I do this to try out
  the latest tools and to get some experience with them.
- I've dropped both Less and Sass in favor of [PostCSS](https://github.com/postcss/postcss). I'm not necessarily
  advocating for this approach as this was mainly for research, but it's definitely growing on me.
- The intent of the PostCSS usage here was to write plain, valid CSS, plus proposed CSS features, and then polyfill for
  older browsers using [postcss-preset-env](https://github.com/csstools/postcss-preset-env), just like using Babel for
  writing modern JavaScript. So this follows proposed standards and does not include things like mixins, though I do
  currently use [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) for convenience.
- The CSS naming convention is [SMACSS](https://smacss.com/) but if I were writing it today, it would be like
  [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) instead.
- I could reduce repetition in the Portfolio template by populating it with data.
