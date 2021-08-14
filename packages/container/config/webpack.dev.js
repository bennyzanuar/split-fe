const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const { ModuleFederationPlugin } = require('webpack').container;
const packageJson = require('../package.json');

const devConfig = {
	mode: 'development',
	output: {
		publicPath: 'http://localhost:3000/',
	},
	devServer: {
		port: 3000,
		historyApiFallback: { index: '/', disableDotRule: true },
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				marketing: 'marketing@http://localhost:8081/remoteEntry.js',
				auth: 'auth@http://localhost:8082/remoteEntry.js',
			},
			shared: packageJson.dependencies,
			// shared: ['react', 'react-dom'],
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
