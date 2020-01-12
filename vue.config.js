// const webpack = require('webpack')
const path = require('path');
module.exports = {
    pluginOptions: {
      "style-resources-loader": {
        preProcessor: "less",
        patterns: [path.resolve(__dirname, "./src/static/styles/var.less")]
      }
    }
  };