/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
console.log('NODE_ENV: ', process.env.NODE_ENV);
let config = {
  entry: {
    index: [hotMiddlewareScript, './src/index']
  },
  output: {
    publicPath: '/'
  },
  mode: 'development',
  optimization: {
    noEmitOnErrors: true
  },
  devtool: 'eval-source-map', //'cheap-eval-source-map';//转换过的代码（仅限行）
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyWebpackPlugin(
      [
        {
          from: 'src/static/',
          to: 'static/',
          toType: 'dir'
        }
      ],
      {}
    ),
    new ManifestPlugin({
      fileName: 'assets/static_list.json',
      filter: function(obj) {
        return obj.path.indexOf('assets/') > -1;
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': './src',
      'static': path.resolve(__dirname, './src/static'),
      'tools': path.resolve(__dirname, './src/tools'),
      'styles': path.resolve(__dirname, './src/styles'),
      'components': path.resolve(__dirname, './src/components'),
      'containers': path.resolve(__dirname, './src/containers'),
      'reducers': path.resolve(__dirname, './src/reducers'),
      'contexts': path.resolve(__dirname, './src/contexts')
    },
    extensions: ['.js', '.json', '.tsx', '.ts', 'jsx']
  },
  externals: ['axios'],
  stats: {
    colors: true,
    modules: false
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader', 
          {
            loader: 'eslint-loader',
            options: { fix: false }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader',{ loader: 'postcss-loader' }, 'sass-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          { loader: 'postcss-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[hash].[ext]',
              publicPath: '../'
            }
          },
          {
            loader: 'image-webpack-loader', // minifying your images
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader?name=[hash].[ext]',
            options: {
              limit: 10000
            }
          },
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }
    ]
  }
};
module.exports = config;
