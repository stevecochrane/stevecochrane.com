const autoprefixer     = require("autoprefixer");
const babel            = require("gulp-babel");
const calc             = require("postcss-calc");
const colorFunction    = require("postcss-color-function");
const concat           = require("gulp-concat");
const cssnano          = require("cssnano");
const customMedia      = require("postcss-custom-media");
const customProperties = require("postcss-custom-properties");
const del              = require("del");
const gulp             = require("gulp");
const imagemin         = require("gulp-imagemin");
const jshint           = require("gulp-jshint");
const nested           = require("postcss-nested");
const pxtorem          = require("postcss-pxtorem");
const postcss          = require("gulp-postcss");
const postcssImport    = require("postcss-import");
const postcssUrl       = require("postcss-url");
const pug              = require("gulp-pug");
const rev              = require("gulp-rev");
const revReplace       = require("gulp-rev-replace");
const stylelint        = require("gulp-stylelint");
const uglify           = require("gulp-uglify");

gulp.task("clean", () => {
    return del([
        "dist/css/*.css",
        "dist/js/*.js"
    ]);
});

gulp.task("images", () => {
    return gulp.src("src/img/**/*")
        .pipe(imagemin({
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest("dist/img"));
});

gulp.task("css", ["clean"], () => {
    return gulp.src([
            "src/css/main.css",
            "src/css/portfolio.css"
        ])
        .pipe(stylelint({
            reporters: [
                {
                    console: true,
                    formatter: "string"
                }
            ]
        }))
        .pipe(postcss([
            postcssImport(),
            customProperties(),
            customMedia(),
            calc(),
            nested(),
            colorFunction(),
            pxtorem({
                //  Apply pxtorem to all style properties.
                propWhiteList: []
            }),
            postcssUrl({
                url: "inline"
            }),
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("js-lint", () => {
    return gulp.src("src/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("js-build-home", ["clean", "js-lint"], () => {
    return gulp.src("src/js/main.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("js-build-portfolio", ["clean", "js-lint"], () => {
    return gulp.src([
            "src/js/lib/jquery-2.0.3.min.js",
            "src/js/lib/jquery.lazyload.min.js",
            "src/js/portfolio-main.js"
        ])
        .pipe(concat("portfolio-main.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("html", () => {
    //  Normally the locals would be out of Gulp and in a controller but this site is otherwise all static.
    var dateObj = new Date();
    var currentYear = dateObj.getFullYear();

    return gulp.src("src/views/pages/**/*.pug")
        .pipe(pug({
            "locals": {
                "currentYear": currentYear
            }
        }))
        .pipe(gulp.dest("dist/"));
});

gulp.task("revision", ["css", "js-build-home", "js-build-portfolio"], () => {
    return gulp.src([
            "dist/**/*.css",
            "dist/**/*.js"
        ])
        .pipe(rev())
        .pipe(gulp.dest("dist"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("dist"));
});

gulp.task("revisionReplace", ["revision"], () => {
    var manifest = gulp.src("dist/rev-manifest.json");

    return gulp.src("dist/**/*.html")
        .pipe(revReplace({"manifest": manifest}))
        .pipe(gulp.dest("dist"));
});

gulp.task("default", [
    "clean",
    "images",
    "css",
    "js-lint",
    "js-build-home",
    "js-build-portfolio",
    "html",
    "revision",
    "revisionReplace"
]);
