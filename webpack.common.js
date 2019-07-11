const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/client/index.js',
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new CopyWebpackPlugin(
      [
        {
          from: './src/public',
          to: './public',
        },
      ],

    ),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/client/layout/index.pug',
    }),
  ],
  output: {
    filename: './js/[name].bundle.js',
    chunkFilename: './js/[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
