module.exports = {
	extends: "stylelint-config-recommended",
	rules: {
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: ["import-normalize"],
			},
		],
	},
};
