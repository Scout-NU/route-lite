const dev = require('./webpack.config');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = Object.assign({}, dev, {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'route-lite.min.js',
    library: 'routeLite'
  },
  plugins: [new UglifyPlugin()]
});
