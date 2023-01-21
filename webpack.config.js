/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const { merge } = require("webpack-merge");

const sharedConfig = {
  mode: "production",
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        //exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  externals: {
    kolmafia: "commonjs kolmafia"
  },
  optimization: {
    minimize: false
  }
};

const scriptsConfig = merge(
  {
    entry: {
      greyday: "./src/GreyYouMain.ts"
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "./built/scripts/"),
      libraryTarget: "commonjs"
    }
  },
  sharedConfig
);

// handle the file creating the greyday UI html file
const otherRelayConfig = merge(
  {
    entry: "./src/relay/relay_greyday.ts",
    output: {
      path: path.join(__dirname, "./built/relay/"),
      filename: "relay_Greyday.js",
      libraryTarget: "commonjs"
    }
  },
  sharedConfig
);

module.exports = [scriptsConfig, relayConfig, otherRelayConfig];
