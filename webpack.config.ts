import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import { config as commonConfig } from './config/webpack.common.config';
import { config as prodConfig } from './config/webpack.prod.config';
import { config as devConfig } from './config/webpack.dev.config';

process.env.ENV = process.env.ENV || JSON.stringify('development');

let config: webpack.Configuration = process.env.ENV === 'production'
    ? prodConfig
    : devConfig;

const mergedConfig: webpack.Configuration = merge({}, commonConfig, config);

export default mergedConfig;