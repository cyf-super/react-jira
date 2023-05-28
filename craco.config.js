const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
    },
    configure: (webpackConfig, { env, paths }) => {
      console.log(env);
      if (env === "development") {
        webpackConfig.devtool = "source-map";
      }
      return webpackConfig;
    },
  },
};
