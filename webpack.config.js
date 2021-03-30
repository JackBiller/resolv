const path = require('path');

module.exports = { 
	entry: './resolvConfig.full.js',
	// mode: "development",
	mode: "production",
	output: { 
		filename: 'resolvConfig.min.js',
		path: path.resolve(__dirname, 'dist'),
	},
};