require('dotenv/config');
const path = require('path');

const clientPath = path.join(__dirname, 'client/');
const publicPath = path.join(__dirname, 'server/public/');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: clientPath,
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: publicPath,
    port: process.env.PORT,
    proxy: {
      '/api': `http://localhost:${process.env.DEV_SERVER_PORT}`,
      '/socket.io': {
        target: `http://localhost:${process.env.DEV_SERVER_PORT}`,
        we: true
      }
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    stats: 'minimal',
    watchContentBase: true
  }
};
