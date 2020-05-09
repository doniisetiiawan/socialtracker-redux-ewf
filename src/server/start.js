// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

module.exports = require('./server');
