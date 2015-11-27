var autoprefixer = require("gulp-autoprefixer");
var concat       = require("gulp-concat");
var gulp         = require("gulp");
var imagemin     = require("gulp-imagemin");
var jshint       = require("gulp-jshint");
var less         = require("gulp-less");
var minifyCss    = require("gulp-minify-css");
var minifyHtml   = require("gulp-minify-html");
var pixrem       = require("gulp-pixrem");
var rev          = require("gulp-rev");
var revReplace   = require("gulp-rev-replace");
var uglify       = require("gulp-uglify");

gulp.task("copy-assets", function() {
    return gulp.src("./node_modules/normalize.css/normalize.css")
        .pipe(gulp.dest("./src/css/lib"));
});

gulp.task("images", function() {
    return gulp.src("./src/img/**/*.{gif,jpg,png,svg}")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/img"));
});

gulp.task("css", function() {
    return gulp.src("./src/less/main.less")
        .pipe(less())
        .pipe(pixrem())
        .pipe(autoprefixer())
        .pipe(minifyCss({ "noAdvanced": true })) // noAdvanced is true so pixrem fallback styles don't get removed
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("js-lint", function() {
    return gulp.src("./src/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("js-build", ["js-lint"], function() {
    return gulp.src(["./src/js/lib/jquery-1.7.2.min.js", "./src/js/main.js"])
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js/"));
});

gulp.task("html", function() {
    return gulp.src("./src/**/*.html")
        .pipe(minifyHtml())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("revision", ["css", "js-build"], function() {
    return gulp.src(["./dist/**/*.css", "./dist/**/*.js"])
        .pipe(rev())
        .pipe(gulp.dest("./dist"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./dist"));
});

gulp.task("revisionReplace", ["revision"], function() {
    var manifest = gulp.src("./dist/rev-manifest.json");

    return gulp.src("./dist/**/*.html")
        .pipe(revReplace({"manifest": manifest}))
        .pipe(gulp.dest("./dist"));
});

gulp.task("default", [
    "copy-assets",
    "images",
    "css",
    "js-lint",
    "js-build",
    "html",
    "revision",
    "revisionReplace"
]);
