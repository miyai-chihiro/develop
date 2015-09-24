var webpack = require('webpack');
module.exports = {
  entry: {
    application: './src/js/application.js',
    template: './src/js/template.js',
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('application','application.js')
  ]
}
