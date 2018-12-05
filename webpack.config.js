const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PostcssPresetEnv = require('postcss-preset-env');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		main: './src/js/main.js',
		portfolio: './src/js/portfolio.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it use publicPath in webpackOptions.output
							publicPath: '../'
						}
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								PostcssPresetEnv()
							]
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					}
				]
			},
			{
				test: /\.pug$/,
				use: [
					'pug-loader'
				]
			}
		]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCssAssetsPlugin()
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			chunks: ['main'],
			filename: 'index.html',
			template: 'src/views/pages/index.pug'
		}),
		new HtmlWebpackPlugin({
			chunks: ['main'],
			filename: 'fonts/index.html',
			template: 'src/views/pages/fonts/index.pug'
		}),
		new HtmlWebpackPlugin({
			chunks: ['main'],
			filename: 'music/index.html',
			template: 'src/views/pages/music/index.pug'
		}),
		new HtmlWebpackPlugin({
			chunks: ['portfolio'],
			filename: 'portfolio/index.html',
			template: 'src/views/pages/portfolio/index.pug'
		}),
		new HtmlWebpackPlugin({
			chunks: ['main'],
			filename: 'videogames/index.html',
			template: 'src/views/pages/videogames/index.pug'
		})
	],
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	}
};
