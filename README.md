# stevecochrane.com
[stevecochrane.com](http://stevecochrane.com) has been my personal space on the internet since I was a college student
back in 2005, and the site is now in its sixth design iteration.

### Setup
Assuming you already have [Node](https://nodejs.org/) installed, navigate to the base directory with a command line
interface and do this:

```bash
npm install
gulp
```

### Notes
* I've dropped both Less and Sass in favor of [PostCSS](https://github.com/postcss/postcss). I'm not necessarily
  advocating for this approach as this was mainly for research, but it's definitely growing on me.
* The intent of the PostCSS usage here was to write valid CSS (plus
  [proposed CSS features](http://cssnext.io/features/)) and then enhance and optimize it with PostCSS. So this follows
  proposed standards and does not include things like mixins.
* The CSS naming convention is [SMACSS](https://smacss.com/) but if I were writing it today, it would be like
  [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) instead.
* The JavaScript is a little embarrassing but I haven't gotten around to updating it. jQuery really isn't necessary
  here.
