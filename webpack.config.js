const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		main: './src/js/main.js',
		portfolio: './src/js/portfolio.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist', 'js')
	}
};
