import { logger } from ".."
import Fia from "../fia"
import Utils from "../utils"

import darkCSS from "../css/dark_theme.css"

const darkVK = true
const disableAway = true
const hideLinks = true
const hideFastChat = true

export async function leftMenuLinks(hide: boolean): Promise<void> {
  const element = await Fia.getElementsByClass("left_menu_nav_wrap")
  let visibility = ""
  if (hide) {
    visibility = "hidden"
  }
  element[0].style.visibility = visibility
}

export async function fastChat(hide: boolean): Promise<void> {
  const element = await Fia.getElementById("chat_onl_wrap")
  let visibility = ""
  if (hide) {
    visibility = "hidden"
  }
  element.style.visibility = visibility
}

let darkCSSElement: HTMLStyleElement | null = null
export function darkTheme(enable: boolean): void {
  if (darkCSSElement === null && enable === true) {
    darkCSSElement = GM_addStyle(darkCSS)
  }
  if (darkCSSElement !== null && enable === false) {
    darkCSSElement.remove()
    darkCSSElement = null
  }
}

(async() => {
  await leftMenuLinks(hideLinks)
  await fastChat(hideFastChat)
  darkTheme(darkVK)
  logger.Info("Loaded module 'misc'")
})()
