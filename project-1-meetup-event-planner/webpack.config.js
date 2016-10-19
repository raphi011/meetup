var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: false,
    port: 3000,
    hot: true
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css',
        exclude: /flexboxgrid/
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
