const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js"
  },

  entry: {
    popup: "./src/popup.js",
    content: "./src/content.js",
    nonce: "./src/nonce.js",
    background: "./src/background.js"
  },


  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
    new HtmlWebPackPlugin({
      template: "./src/popup.html",
      chunks: ["popup", "nonce"],
    }),
    new Dotenv()
  ],
};