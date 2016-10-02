var autoprefixer     = require("autoprefixer");
var calc             = require("postcss-calc");
var colorFunction    = require("postcss-color-function");
var concat           = require("gulp-concat");
var cssnano          = require("cssnano");
var customMedia      = require("postcss-custom-media");
var customProperties = require("postcss-custom-properties");
var del              = require("del");
var gulp             = require("gulp");
var imagemin         = require("gulp-imagemin");
var jade             = require("gulp-jade");
var jshint           = require("gulp-jshint");
var nested           = require("postcss-nested");
var pxtorem          = require("postcss-pxtorem");
var postcss          = require("gulp-postcss");
var postcssImport    = require("postcss-import");
var postcssUrl       = require("postcss-url");
var rev              = require("gulp-rev");
var revReplace       = require("gulp-rev-replace");
var stylelint        = require("gulp-stylelint");
var uglify           = require("gulp-uglify");

gulp.task("clean", function() {
    return del([
        "dist/css/*.css",
        "dist/js/*.js"
    ]);
});

gulp.task("images", function() {
    return gulp.src("src/img/**/*")
        .pipe(imagemin({
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest("dist/img"));
});

gulp.task("css", ["clean"], function() {
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

gulp.task("js-lint", function() {
    return gulp.src("src/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("js-build-home", ["clean", "js-lint"], function() {
    return gulp.src("src/js/main.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("js-build-portfolio", ["clean", "js-lint"], function() {
    return gulp.src([
            "src/js/lib/jquery-2.0.3.min.js",
            "src/js/lib/jquery.lazyload.min.js",
            "src/js/portfolio-main.js"
        ])
        .pipe(concat("portfolio-main.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("html", function() {
    //  Normally the locals would be out of Gulp and in a controller but this site is otherwise all static.
    var dateObj = new Date();
    var currentYear = dateObj.getFullYear();

    return gulp.src("src/views/pages/**/*.jade")
        .pipe(jade({
            "locals": {
                "currentYear": currentYear
            }
        }))
        .pipe(gulp.dest("dist/"));
});

gulp.task("revision", ["css", "js-build-home", "js-build-portfolio"], function() {
    return gulp.src([
            "dist/**/*.css",
            "dist/**/*.js"
        ])
        .pipe(rev())
        .pipe(gulp.dest("dist"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("dist"));
});

gulp.task("revisionReplace", ["revision"], function() {
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
