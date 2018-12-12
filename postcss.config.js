const PostcssNormalize = require("postcss-normalize");
const PostcssPxtorem = require("postcss-pxtorem");
const PostcssPresetEnv = require("postcss-preset-env");
const Stylelint = require("stylelint");

module.exports = {
	plugins: [Stylelint(), PostcssPresetEnv(), PostcssPxtorem(), PostcssNormalize()]
};
