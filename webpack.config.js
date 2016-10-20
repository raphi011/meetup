var webpack = require('webpack');
var path = require('path');
var DashboardPlugin = require('webpack-dashboard/plugin');


var ENV_PRODUCTION = process.env.NODE_ENV || false;

const HOST = '0.0.0.0';
const PORT = 3000;

const config = {
  context: path.join(__dirname, './src'),
  entry: [
    './index'
  ],
  output: {
    path: './dist/',
    filename: 'bundle.js'
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
      },
      {
        test: /\.(html)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  }
};

if (ENV_PRODUCTION) {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true,
      mangle: false
    })
  ];
} else {
  config.entry.unshift(
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server'
  );
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  ];

  config.devServer = {
    colors: true,
    historyApiFallback: true,
    inline: false,
    port: PORT,
    hot: true
  };
}

module.exports = config;
