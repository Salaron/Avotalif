import { Configuration, BannerPlugin } from "webpack"
import * as path from "path"
import * as fs from "fs"
import pkg from "./package.json"

const scriptHeader = `\
// ==UserScript==
// @run-at       document-start
// @name         ${pkg.name}
// @description  ${pkg.description}
// @author       ${pkg.author}
// @version      ${pkg.version}
// @match        *://*.vk.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @noframes
// ==/UserScript==
`

const config: Configuration = {
  entry: "./src/index.ts",
  output: {
    filename: "avotalif.user.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts"]
  },
  plugins: [
    new BannerPlugin({
      banner: scriptHeader,
      raw: true
    })
  ],
  optimization: {
    minimize: false
  }
}

// write meta
fs.writeFileSync("dist/avotalif.meta.js", scriptHeader)

export default config
