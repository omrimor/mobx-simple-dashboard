const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin       = require('clean-webpack-plugin');
const autoprefixer      = require('autoprefixer');

const packageConfig = require('./package.json');
const appEnv        = process.env.NODE_ENV || 'development';
const appPath       = path.join(__dirname, 'app');
const testPath      = path.join(__dirname, 'test');
const distPath      = path.join(__dirname, 'dist');
const exclude       = /node_modules/;

const config = {

  // The base directory for resolving `entry` (must be absolute path)
  context: appPath,

  entry: {
    app: 'app.js',
    vendor: Object.keys(packageConfig.dependencies)
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // Set proper base URL for serving resources
    publicPath: '/',
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: 'bundle.[hash].js'
  },

  plugins: [

    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html'
    }),

    // Pass environment variable to frontend scipts
    new webpack.DefinePlugin({
      $_ENVIRONMENT: JSON.stringify(appEnv),
      // We must envify CommonJS builds:
      // https://github.com/reactjs/redux/issues/1029
      'process.env.NODE_ENV': JSON.stringify(appEnv)
    })
  ],

  // Enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: [appPath, testPath],
    alias: {
      'react': __dirname + '/node_modules/react',
      'react/addons': __dirname + '/node_modules/react/addons',
    }
  },

  sassLoader: {
    includePaths: [appEnv]
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        exclude
      }
    ],
    loaders: [
      { test: /\.json$/, loader: 'json' },

      // Expose React as global object
      { test: require.resolve('react'), loader: 'expose?React' },

      {
        test: /\.js$/,
        loaders: [
          'babel?cacheDirectory&plugins=babel-plugin-rewire'
        ],
        exclude: exclude
      },

      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          `css?root=${encodeURIComponent(appPath)}`,
          'sass'
        ]
      },

      // Allow `require`ing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(eot|woff2?|ttf|otf)(\?.*)?$/i,
        loader: 'url?limit=5120&name=[path][name].[hash].[ext]'
      },

      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
        loader: 'url?limit=5120&name=[path][name].[hash].[ext]'
      }

    ]
  },

  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'ENV': JSON.stringify(require(`./config/${appEnv}.json`))
  },

  // Settings for webpack-dev-server
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: appPath,
    colors: true,
    noInfo: true,
    inline: true,
    historyApiFallback: true
  },

  eslint: {
    configFile: '.eslintrc'
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]

};

if (appEnv === 'development') {
  config.devtool           = '#inline-source-map';
}

if (appEnv !== 'test') {
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin(
      /* chunkName: */ 'vendor',
      /* filename: */ 'vendor.[hash].js'
    )
  );
}

if (appEnv === 'production') {
  config.plugins.push(
    // Remove build related folders
    new CleanPlugin(['dist'])
  );
}

module.exports = config;
