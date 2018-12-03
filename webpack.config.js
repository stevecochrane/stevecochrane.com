const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		main: './src/js/main.js',
		portfolio: './src/js/portfolio.js'
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [
					'pug-loader'
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/views/pages/index.pug'
		}),
		new HtmlWebpackPlugin({
			filename: 'fonts/index.html',
			template: 'src/views/pages/fonts/index.pug'
		}),
		new HtmlWebpackPlugin({
			filename: 'music/index.html',
			template: 'src/views/pages/music/index.pug'
		}),
		new HtmlWebpackPlugin({
			filename: 'portfolio/index.html',
			template: 'src/views/pages/portfolio/index.pug'
		}),
		new HtmlWebpackPlugin({
			filename: 'videogames/index.html',
			template: 'src/views/pages/videogames/index.pug'
		})
	],
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	}
};
