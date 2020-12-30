module.exports = {
  mode: "production",
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
    path: __dirname,
    filename: "./dist/main.js",
  },
}
