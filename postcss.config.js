const PostcssNormalize = require('postcss-normalize');
const PostcssPresetEnv = require('postcss-preset-env');
const Stylelint = require('stylelint');

module.exports = {
	plugins: [
		Stylelint(),
		PostcssNormalize(),
		PostcssPresetEnv()
	]
};
