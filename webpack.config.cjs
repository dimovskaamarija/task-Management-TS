const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
  entry: {
    main: './src/ts/main.ts',
    model: './src/ts/model.ts'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(process.cwd(), 'dist/js'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], 
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', 
      template: './src/templates/index.html', 
      chunks: ['main'], 
    }),
  ],
  mode: 'development',
};
