"use strict";

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

gulp.task("webfonts", () => {
	return gulp.src("src/webfonts/**/*")
		.pipe(gulp.dest("dist/webfonts"));
});

gulp.task("css", ["clean"], () => {
	return gulp.src([
			"src/css/main.css",
			"src/css/portfolio.css"
		])
		.pipe(stylelint({
			"reporters": [
				{
					"console": true,
					"formatter": "string"
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
				"propWhiteList": []
			}),
			postcssUrl({
				"url": "inline"
			}),
			autoprefixer(),
			cssnano()
		]))
		.pipe(gulp.dest("dist/css"));
});

gulp.task("js-build-home", ["clean", "js-lint"], () => {
	return gulp.src("src/js/main.js")
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest("dist/js/"));
});

gulp.task("js-build-portfolio", ["clean", "js-lint"], () => {
	return gulp.src([
			"src/js/lib/intersection-observer-0.5.0.js",
			"src/js/lib/lozad-1.3.0.js",
			"src/js/portfolio.js"
		])
		.pipe(concat("portfolio.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js/"));
});

gulp.task("html", () => {
	//  Normally the locals would be out of Gulp and in a controller but this site is otherwise all static.
	let dateObj = new Date();
	let currentYear = dateObj.getFullYear();

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
	let manifest = gulp.src("dist/rev-manifest.json");

	return gulp.src("dist/**/*.html")
		.pipe(revReplace({ "manifest": manifest }))
		.pipe(gulp.dest("dist"));
});

gulp.task("default", [
	"clean",
	"webfonts",
	"css",
	"js-build-home",
	"js-build-portfolio",
	"html",
	"revision",
	"revisionReplace"
]);
