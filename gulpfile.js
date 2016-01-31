var concat       = require("gulp-concat");
var del          = require("del");
var gulp         = require("gulp");
var imagemin     = require("gulp-imagemin");
var jade         = require("gulp-jade");
var jshint       = require("gulp-jshint");
var minifyCss    = require("gulp-minify-css");
var postcss      = require("gulp-postcss");
var rev          = require("gulp-rev");
var revReplace   = require("gulp-rev-replace");
var uglify       = require("gulp-uglify");

gulp.task("clean", function() {
    return del([
        "dist/css/*.css",
        "dist/js/*.js"
    ]);
});

gulp.task("copy-assets", function() {
    return gulp.src("node_modules/normalize.css/normalize.css")
        .pipe(gulp.dest("src/css/lib"));
});

gulp.task("images", function() {
    return gulp.src("src/img/**/*.{gif,jpg,png,svg}")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task("css", ["clean", "copy-assets"], function() {
    return gulp.src([
            "src/less/main.less",
            "src/less/portfolio-main.less"
        ])
        .pipe(less())
        .pipe(pixrem())
        .pipe(autoprefixer())
        .pipe(minifyCss({ "noAdvanced": true })) // noAdvanced is true so pixrem fallbacks aren't marked as duplicates and removed.
        .pipe(gulp.dest("dist/css"));
});

gulp.task("css-new", function() {
    return gulp.src("src/css/main.css")
        .pipe(postcss([
            require("postcss-import"),
            require("postcss-mixins"),
            require("postcss-simple-vars"),
            require("postcss-calc"),
            require("postcss-nested"),
            require("autoprefixer")
        ]))
        // .pipe(minifyCss())
        .pipe(gulp.dest("dist/css"));
});

gulp.task("js-lint", function() {
    return gulp.src("src/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("js-build-home", ["clean", "js-lint"], function() {
    return gulp.src([
            "src/js/lib/jquery-1.7.2.min.js",
            "src/js/main.js"
        ])
        .pipe(concat("main.js"))
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
    "copy-assets",
    "images",
    "css",
    "js-lint",
    "js-build-home",
    "js-build-portfolio",
    "html",
    "revision",
    "revisionReplace"
]);
