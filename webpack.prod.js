const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
console.log('NODE_ENV: ', process.env.NODE_ENV);
let config = {
  mode: 'production',
  entry: {
    index: ['./src/index']
  },
  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    hashDigestLength: 8,
    path: path.resolve(__dirname, 'docs'),
    publicPath: '' //相对于HTML页面解析的输出目录的url
  },
  plugins: [
    new CleanWebpackPlugin(),
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[id].css',
      chunkFilename: 'css/[name].[id].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  cache: true,
  resolve: {
    alias: {
      static: path.resolve(__dirname, './src/static'),
      tools: path.resolve(__dirname, './src/tools'),
      styles: path.resolve(__dirname, './src/styles'),
      components: path.resolve(__dirname, './src/components'),
      containers: path.resolve(__dirname, './src/containers'),
      reducers: path.resolve(__dirname, './src/reducers'),
      contexts: path.resolve(__dirname, './src/contexts')
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
        use: ['babel-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1
            }
          },
        ]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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

process.env.NODE_ENV === 'analyze' &&
  config.plugins.push(new BundleAnalyzerPlugin());
module.exports = config;
