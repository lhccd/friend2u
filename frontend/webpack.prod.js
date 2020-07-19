"use strict";

const webpack        = require('webpack');
const merge          = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const common         = require('./webpack.common.js');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin({
            output: {
                comments: false,
            },
            compress: {
				// remove warnings
				warnings: false,
				
				// Drop console statements
				drop_console: true
			},
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});
