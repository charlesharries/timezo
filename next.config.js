const withCSS = require('@zeit/next-css');
require('dotenv').config();
const { join, resolve } = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = withCSS({
  webpack(config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '~pages': resolve(__dirname, 'pages'),
      '~components': resolve(__dirname, 'components'),
      '~css': resolve(__dirname, 'assets', 'css'),
      '~store': resolve(__dirname, 'store'),
    };

    config.plugins.push(
      new Dotenv({
        path: join(__dirname, '.env'),
        systemvars: true,
      })
    );

    return config;
  },
});
