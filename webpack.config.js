const miniCssExtractPlugin = require('mini-css-extract-plugin')
const purgeCSSPlugin = require('purgecss-webpack-plugin')
const path = require('path')
const glob = require('glob')

const PATHS = {
  dist: path.join(__dirname, 'dist')
}

const myOutput = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist')
}

const myDevServer = {
  static: path.resolve(__dirname, 'dist'),
  port: 8080,
  hot: true
}

const myModule = {
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

const myPlugins = {
  // plugins for development
  development: [
    new miniCssExtractPlugin(),
  ],
  // plugins for production
  production: [
    new miniCssExtractPlugin(),
    new purgeCSSPlugin({
      paths: glob.sync(`${PATHS.dist}/**/*`,  { nodir: true }),
      // Fix dropdown navbar bootstrap 5
      safelist: [/show/]
    }),
  ],
}

// file src
const myEntry = {
  main: './src/js/main.js',
}

module.exports = function(env, argv) {
  return {
    mode: env.production ? 'production' : 'development',
    entry: myEntry, 
    plugins: argv.mode === 'production' ? myPlugins.production : myPlugins.development,
    output: myOutput,
    devServer: myDevServer,
    module: myModule
  }
}