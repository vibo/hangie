const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },

    resolve: {
        extensions: [".js", ".ts", ".tsx", "jsx", ".json"]
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: 'raw'
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                loader: 'css-loader'
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                loader: 'css-loader!less-loader'
            })
        }, {
            test: /\.tsx?$/,
            use: 'awesome-typescript-loader'
        }, {
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            enforce: "pre",
            test: /\.js$/, 
            use: "source-map-loader"
        }]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};