module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/webfonts");

	return {
		dir: {
			data: "data",
			input: "src",
			output: "dist",
		},
	};
};
