const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        enforce: "pre",
        test: "/.js$/",
        loader: "source-map-loader",
      },
    ],
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve("./dist"),
    filename: "main.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve("./index.html"),
    }),
  ],
}
