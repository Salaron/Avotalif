import { logger } from ".."
import Fia from "../fia"

import darkCSS from "../css/dark_theme.css"


const vkAway = true
const hideLinksInMenu = true
const hideMiniChat = false

export async function bar(visible: boolean) {
  const element = await Fia.getElementsByClass("left_menu_nav_wrap")
  let visibility = "hidden"
  if (visible) {
    visibility = ""
  }
  element[0].style.visibility = visibility
}

export async function miniChat(visible: boolean) {
  const element = await Fia.getElementById("chat_onl_wrap")
  let visibility = "hidden"
  if (visible) {
    visibility = ""
  }
  element.style.visibility = visibility
}

export function darkTheme(enable: boolean) {
  GM_addStyle(darkCSS)
}

(async() => {
  await bar(!hideLinksInMenu)
  await miniChat(!hideMiniChat)
  darkTheme(true)
  logger.Info("Loaded module 'misc'")
})()
