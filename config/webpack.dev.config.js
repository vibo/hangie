const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = {
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};