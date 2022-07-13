const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/webfonts");

	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	return {
		dir: {
			data: "data",
			input: "src",
			output: "dist",
		},
	};
};
