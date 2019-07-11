const merge = require('webpack-merge');
const MiniCssPlug = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssPlug({
      filename: './css/[name].bundle.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
          loader: MiniCssPlug.loader,
          options: {
            publicPath: '../',
          },
        },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              autoprefixer({
                browsers: ['ie >= 8', 'last 4 version'],
              }),
            ],
          },
        },
        'sass-loader',
        ],
      },
      {
        test: /\.(mp3|wav)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'audio/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|cur)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
});
