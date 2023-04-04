const path = require('path');
const fs = require('fs');
const root = './src/blocks/';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getSources = () => fs.readdirSync('./src/blocks').reduce((entries, entry) => {
    entries[entry] = `${root}${entry}/${entry}.ts`;  
    return entries;
    }, {});

module.exports = (env, argv) => {

const config = {
  entry: getSources(),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: `./[name]/[name].css`
    }),
  ],
  output: {
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, 'blocks'),
  },
  mode: 'production',
};


  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.watch = true;
    config.mode = 'development';
  }
  
  return config;
}