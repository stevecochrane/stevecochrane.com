# stevecochrane.com

[stevecochrane.com](https://stevecochrane.com/) has been my little corner of the World Wide Web since I was a college
student back in 2005, and the site is now in its seventh design iteration.

## Local Development Setup

Assuming you already have [Node](https://nodejs.org/) installed, navigate to the base directory with a command line
interface and do this:

```bash
npm install       # Install Node dependencies
npm start         # Run Eleventy's dev server for local development
npm run build     # Run an Eleventy build for production
```

## More About the Site

- When I was younger and less experienced, I made this site a showcase for my technical skills, and it had a rather
  complex toolchain. Now that I’m older and my priorities have changed, I’m doing what is best for long-term
  maintenance. (In other words, I have little patience for updating Node dependencies.)
- The site has a perfect score of 100 for Performance, Best Practices, and SEO in
  [Lighthouse](https://developers.google.com/web/tools/lighthouse) as of July 2022. Accessibility is at 97/100
  because of insufficient contrast between background and foreground colors, which will need to wait until the next
  redesign.
- The site has light and dark color themes, and your operating system preference determines which theme you see.
- Now that all major browsers natively support lazy loading for images, the site serves zero JavaScript!
  Most bundling tools are JS-centric, but [Eleventy](https://www.11ty.dev) is perfect for a simple site like this.
  I can build an HTML document from Nunjucks templates populated with data, and process, minify, and inline
  my styles, all with
  [a tiny config file](https://github.com/stevecochrane/stevecochrane.com/blob/main/.eleventy.js).
- I dropped CSS preprocessors such as Sass a long time ago and I try to do as much as possible with standard CSS.
  The only thing I still feel I need that isn’t broadly supported yet is custom media queries, so that’s the only thing
  I still use PostCSS for. Once that
  ([or a similar technique](https://www.stefanjudis.com/notes/the-death-of-custom-media-queries/)) has broad support,
  bye bye PostCSS.
