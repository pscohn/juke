var path = require('path');
var webpack = require('webpack');
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: './static/bundle.js'
  },
  module: {
    loaders: [
    { test: /pixi.js/, loader: "expose?PIXI" },
    { test: /p2\.js/, loader: 'expose?p2' },
    { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }],
  },
  resolve: {
   extensions: ['', '.js'],
   alias: {
    'phaser': phaser,
    'pixi.js': pixi,
    'p2': p2
   }
 }
};
