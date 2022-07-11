const PostcssImport = require("postcss-import");
const PostcssNormalize = require("postcss-normalize");
const PostcssPresetEnv = require("postcss-preset-env");
const Stylelint = require("stylelint");

module.exports = {
	plugins: [
		Stylelint(),
		PostcssPresetEnv({
			stage: 2,
			features: {
				"nesting-rules": true,
			},
		}),
		PostcssImport(PostcssNormalize()),
	],
};
