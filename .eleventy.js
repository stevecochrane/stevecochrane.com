const path = require("path");

const cssnano = require("cssnano");
const htmlMinify = require("html-minifier");
const postcss = require("postcss");
const postcssCustomMedia = require("postcss-custom-media");
const postcssNormalize = require("postcss-normalize");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/webfonts");

	eleventyConfig.addNunjucksAsyncFilter("postcss", function (code, callback) {
		const filepath = path.join(__dirname, "./src/css/main.css");
		postcss([postcssCustomMedia(), postcssNormalize(), cssnano()])
			.process(code, { from: filepath })
			.then((result) => callback(null, result.css));
	});

	eleventyConfig.addTransform("htmlmin", function (content) {
		if (this.outputPath.endsWith(".html")) {
			let minified = htmlMinify.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
			return minified;
		}
		return content;
	});

	return {
		dir: {
			data: "data",
			input: "src",
			output: "dist",
		},
	};
};
