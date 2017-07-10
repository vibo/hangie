const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = {
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                loader: 'css-loader'
            })
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                loader: 'css-loader!less-loader'
            })
        }, {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
        }]
    }
};