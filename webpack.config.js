const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const theme = require('./theme');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: path.resolve(__dirname, 'src/js/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src/js'),
        query: {
          plugins: [
            ['import', {
              libraryName: 'antd',
              style: true
            }],
            'transform-runtime'
          ],
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, 'src/less'),
        loader: ExtractTextPlugin.extract(
          'css-loader!' +
          `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme())}}`
        )
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2)/,
        loader: 'file-loader?name=font/[name].[ext]',
        include: [path.resolve(__dirname, 'src/font')]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new HtmlWebpackPlugin({
      title: '主页',
      filename: 'index.html',
      template: 'src/template.ejs'
    }),
    new ExtractTextPlugin('css/[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer],
        devServer: {
          colors: true,
          historyApiFallback: true,
          hot: true,
          inline: true,
          progress: true
        }
      }
    })
  ]
};