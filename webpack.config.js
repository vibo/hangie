var common = require('./config/webpack.common.config');
var merge = require('webpack-merge');
var dasConfig;

process.env.ENV  = process.env.ENV || JSON.stringify('development');

if (process.env.ENV === 'production') {
    dasConfig = require('./config/webpack.prod.config');
} else {
    dasConfig = require('./config/webpack.dev.config');
}

module.exports = merge({}, common, dasConfig);