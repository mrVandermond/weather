const path = require('path');
const webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: process.argv.includes('serve') ? 'development' : 'production',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './dist/js/[name].[contenthash:4].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm-bundler.js',
      '@': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'assets'),
      '@test': path.resolve(__dirname, 'test'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },  devtool: 'source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: '8888',
    client: {
      logging: 'warn',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      publicPath: '/',
    },
    static: {
      directory: './',
      publicPath: '/',
      watch: {
        usePolling: false,
      },
    },
    watchFiles: {
      paths: ['/src/**/*'],
      options: {
        usePolling: false,
      },
    },
    allowedHosts: 'all',
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    new EslintWebpackPlugin({
      extensions: ['ts', 'vue'],
      files: [path.join(__dirname, 'src')],
    }),
  ]
}
