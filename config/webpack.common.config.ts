import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

export const config: webpack.Configuration = {
    entry: ['./src/Index.tsx'],
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
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            enforce: "pre",
            test: /\.js$/, 
            use: "source-map-loader"
        }]
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),
        // Generate HTML index file for dist
        // Dynamically injets bundle
        new HtmlWebpackPlugin({
            chunksSortMode: 'dependency',
            inject: true,
            template: './src/index.html'
        }),
    ],

    devtool: 'source-map',
};

export default config;