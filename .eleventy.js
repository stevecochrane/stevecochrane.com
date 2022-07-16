const path = require("path");

const cssnano = require("cssnano");
const postcss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");
const postcssNormalize = require("postcss-normalize");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/webfonts");

	eleventyConfig.addNunjucksAsyncFilter("postcss", function (code, callback) {
		const filepath = path.join(__dirname, "./src/css/main.css");
		postcss([
			postcssPresetEnv({
				stage: 2,
				features: {
					"nesting-rules": true,
				},
			}),
			postcssNormalize(),
			cssnano(),
		])
			.process(code, { from: filepath })
			.then((result) => callback(null, result.css));
	});

	return {
		dir: {
			data: "data",
			input: "src",
			output: "dist",
		},
	};
};
