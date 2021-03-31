const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = { 
	entry: './resolvConfig.full.js',
	// mode: "development",
	mode: "production",
	output: { 
		filename: 'resolvConfig.min.js',
		path: path.resolve(__dirname, 'dist'),
	},
	// optimization: {
	// 	minimizer: [new UglifyJsPlugin({
	// 		uglifyOptions: {
	// 			compress: { 
	// 				// Drop only console.logs but leave others
	// 				pure_funcs: ['console.log'],
	// 			},
	// 			mangle: { 
	// 				// Note: I'm not certain this is needed.
	// 				reserved: ['console.log']
	// 			}
	// 		}
	// 	})],
	// },
};