const miniCssExtractPlugin = require('mini-css-extract-plugin')
const purgeCSSPlugin = require('purgecss-webpack-plugin')
const path = require('path')
const glob = require('glob')

const PATHS = {
  dist: path.join(__dirname, 'dist')
}

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  plugins: [
    new miniCssExtractPlugin(),
    new purgeCSSPlugin({
      paths: glob.sync(`${PATHS.dist}/**/*`,  { nodir: true }),
      safelist: [/show/]
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  module: {
    rules: [
      {
        mimetype: 'image/svg+xml',
        scheme: 'data',
        type: 'asset/resource',
        generator: {
          filename: 'icons/[hash].svg'
        }
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
            // Extracts CSS for each JS file that includes CSS
            loader: miniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}