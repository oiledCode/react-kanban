var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var TARGET    = process.env.npm_lifecycle_event;

// Set Babel Env 
process.env.BABEL_ENV = TARGET;

// Common target
var common = {
	entry: path.resolve(ROOT_PATH, 'App'),
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: path.resolve(ROOT_PATH, 'Build'),
		filename : 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: path.resolve(ROOT_PATH, 'App')
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'React Kanban'
		})
	]
};

// Development Target
var development = {
	devtool: 'eval-source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel'],
				include: path.resolve(ROOT_PATH, 'App')
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, development);
}
