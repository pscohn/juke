module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: './static/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  resolve: {
   extensions: ['', '.js'],
 }
};
