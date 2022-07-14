const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/webfonts");

	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

	eleventyConfig.addPairedShortcode("cssPostProcess", function (code) {
		return code;
	});

	return {
		dir: {
			data: "data",
			input: "src",
			output: "dist",
		},
	};
};
