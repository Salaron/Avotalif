import { logger } from ".."
import Fia from "../fia"

const vkAway = true
const hideLinksInMenu = true
const hideMiniChat = true

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

(async() => {
  await bar(!hideLinksInMenu)
  await miniChat(!hideMiniChat)
  logger.Info("Loaded module 'misc'")
})()