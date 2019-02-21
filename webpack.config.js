const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlInlineCssWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const indexData = require("./src/data/index.js");

module.exports = {
	mode: "production",
	entry: "./src/js/main.js",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "../"
						}
					},
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
				test: /\.(woff2|woff)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[hash].[ext]",
							outputPath: "webfonts"
						}
					}
				]
			},
			{
				test: /\.handlebars$/,
				use: ["handlebars-loader"]
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
		new CopyWebpackPlugin([
			{
				from: "src/img/",
				to: "img"
			}
		]),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash].css"
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/views/index.handlebars",
			templateParameters: indexData
		}),
		new HtmlInlineCssWebpackPlugin()
	],
	output: {
		filename: "js/[name].[contenthash].js",
		path: path.resolve(__dirname, "dist")
	},
	performance: {
		maxAssetSize: 1000000
	}
};
