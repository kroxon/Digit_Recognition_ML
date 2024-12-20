const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    host: "localhost",
    watchFiles: ["./src/template.html"],
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 8080,
    open: true,
    hot: true, // Włączenie hot module replacement
    historyApiFallback: true,
  },
});
