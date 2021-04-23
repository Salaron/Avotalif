import { Configuration, BannerPlugin } from "webpack"
import * as path from "path"
import * as fs from "fs"
import pkg from "./package.json"

export default function (env: any, options: any): Configuration {
  let updateURL = ""
  let downloadURL = ""
  if (options.mode === "production") {
    // github release
    updateURL = "https://raw.githubusercontent.com/Salaron/Avotalif/main/dist/avotalif.meta.js"
    downloadURL = "https://raw.githubusercontent.com/Salaron/Avotalif/main/dist/avotalif.user.js"
  }
  if (process.env.GITHUB_SHA && process.env.GITHUB_ACTION) {
    // nightly gist
    pkg.name = "avotalif-nightly"
    pkg.version = process.env.GITHUB_ACTION
    updateURL = "https://gist.githubusercontent.com/Salaron/26433a26b29cef790d2302703bab980d/raw/avotalif.meta.js"
    downloadURL = "https://gist.githubusercontent.com/Salaron/26433a26b29cef790d2302703bab980d/raw/avotalif.user.js"
  }

  const scriptHeader = `\
// ==UserScript==
// @run-at       document-start
// @name         ${pkg.name}
// @description  ${pkg.description}
// @author       ${pkg.author}
// @version      ${pkg.version}\
${updateURL.length > 0 ? `
// @updateURL    ${updateURL}` : ""}\
${downloadURL.length > 0 ? `
// @downloadURL  ${downloadURL}` : ""}
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

  return config
}
