var common = require('./config/webpack.common.config');
var merge = require('webpack-merge');
var config;

process.env.ENV  = process.env.ENV || JSON.stringify('development');

if (process.env.ENV === 'production') {
    config = require('./config/webpack.prod.config');
} else {
    config = require('./config/webpack.dev.config');
}

module.exports = merge({}, common, config);