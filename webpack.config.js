const HtmlWebpackPlugin = require("html-webpack-plugin");

const package = require("./package.json");
const commonPaths = require("./commonPaths");

const isDebug = !process.argv.includes("release");
const port = process.env.PORT || 3000;

module.exports = {
  entry: commonPaths.entryPath,
  output: {
    uniqueName: package.name,
    publicPath: "/",
    path: commonPaths.outputPath,
    filename: isDebug
      ? "js/[name].js"
      : `${package.version}/js/[name].[chunkhash:8].js`,
    chunkFilename: isDebug
      ? "js/[name].js"
      : `${package.version}/js/[name].[chunkhash:8].js`,
    assetModuleFilename: isDebug
      ? `images/[path][name][ext]`
      : `images/[path][contenthash:8][ext]`,
    crossOriginLoading: "anonymous",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    port: port,
    hot: true,
    liveReload: true,
    static: {
      directory: commonPaths.outputPath,
    },
    historyApiFallback: {
      index: "index.html",
    },
    webSocketServer: false,
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};
