module.exports = {
	extends: "stylelint-config-recommended",
	rules: {
		"at-rule-no-unknown": [
			true,
			{
				"ignoreAtRules": [
					"import-normalize"
				]
			}
		],
		//	Disabled for too many false positives with <a> element pseudoclasses,
		//	though once portfolio.css is improved to use class selectors instead of
		//	using so many element selectors, this problem should go away.
		"no-descending-specificity": null
	}
};
