import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

export const config: webpack.Configuration = {
    // Entry for HMR support
    entry: ['react-hot-loader/patch'],
    
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: false,
                        sourceMap: true
                    }
                }]
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: false,
                        sourceMap: true
                    }
                }, {
                    loader: 'less-loader',
                    options: {
                        minimize: false,
                        sourceMap: true
                    }
                }]
            })
        }, {
            test: /\.tsx?$/,
            loaders: [
                "react-hot-loader/webpack",
                "awesome-typescript-loader"
            ],
            // Exclude node_modules for performance.
            exclude: path.resolve(__dirname, '../node_modules')
        }]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],

    devServer: {
        hot: true
    }
};

export default config;