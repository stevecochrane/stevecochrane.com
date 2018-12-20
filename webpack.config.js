const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	mode: "production",
	entry: "./src/js/main.js",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1
						}
					},
					"postcss-loader"
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: true
						}
					},
					"eslint-loader"
				]
			},
			{
				test: /\.pug$/,
				use: ["pug-loader"]
			}
		]
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true
			}),
			new OptimizeCssAssetsPlugin()
		]
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash].css"
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/views/index.pug"
		})
	],
	output: {
		filename: "js/[name].[contenthash].js",
		path: path.resolve(__dirname, "dist")
	}
};
