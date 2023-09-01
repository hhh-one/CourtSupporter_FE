const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')

module.exports = (env, options) => {
  return {
    entry: {
      main: './src/index.js',
    },
    mode: 'development',
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].chunk.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.?(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/fonts/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      new Dotenv({ path: `.env.${env.dev ? 'dev' : 'prd'}` }),
    ],
    devServer: {
      hot: true,
      host: 'localhost',
      port: 3000,
      historyApiFallback: true,
    },
  }
}