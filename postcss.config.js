const PostcssNormalize = require('postcss-normalize');
const PostcssPresetEnv = require('postcss-preset-env');

module.exports = {
	plugins: [
		PostcssPresetEnv(),
		PostcssNormalize()
	]
}
