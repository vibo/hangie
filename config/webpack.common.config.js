const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
    // TODO: Separate entry levels depending on prod/dev
    entry: [
        'react-hot-loader/patch',
        './src/Index.tsx',
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", "jsx", ".json"]
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'raw-loader'
        }, {
            test: /\.css$/,
            // TODO: Compress styles for prod
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                loader: 'css-loader'
            })
        }, {
            // TODO: Compress styles for prod
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                loader: 'css-loader!less-loader'
            })
        }, {
            test: /\.tsx?$/,
            // TODO: Move hot loader from common to dev
            loaders: [
                "react-hot-loader/webpack",
                "awesome-typescript-loader"
            ],
            // Exclude node_modules for performance.
            exclude: path.resolve(__dirname, '../node_modules')
        }, {
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            enforce: "pre",
            test: /\.js$/, 
            use: "source-map-loader"
        }]
    },

    plugins: [
        // Generate HTML index file for dist
        // Dynamically injets bundle
        new HtmlWebpackPlugin({
            chunksSortMode: 'dependency',
            inject: true,
            template: './src/index.html'
        }),
    ],
};
