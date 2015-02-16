var gulp = require("gulp");

var autoprefixer = require("gulp-autoprefixer"),
    combineMediaQueries = require("gulp-combine-media-queries"),
    concat = require("gulp-concat"),
    imagemin = require("gulp-imagemin"),
    jshint = require("gulp-jshint"),
    less = require("gulp-less"),
    minifyCss = require("gulp-minify-css"),
    minifyHtml = require("gulp-minify-html"),
    pixrem = require("gulp-pixrem"),
    uglify = require("gulp-uglify");

gulp.task("copy-assets", function() {
    gulp.src("./node_modules/normalize.css/normalize.css")
        .pipe(gulp.dest("./src/css"));
});

gulp.task("images", function() {
    gulp.src("./src/img/**/*.{gif,jpg,png,svg}")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/img"));
});

gulp.task("css", function() {
    gulp.src("./src/less/main.less")
        .pipe(less())
        .pipe(pixrem())
        .pipe(autoprefixer())
        .pipe(combineMediaQueries())
        .pipe(minifyCss())
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("js", function() {
    gulp.src("./src/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));

    gulp.src(["./src/js/libs/jquery-1.7.2.min.js", "./src/js/main.js"])
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js/"));
});

gulp.task("minifyHtml", function() {
    gulp.src("./src/**/*.{html,php}")
        .pipe(minifyHtml())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("default", ["images", "css", "js", "minifyHtml"]);