import { logger } from ".."
import Fia from "../fia"

const vkAway = true
const disableRightBar = true


export async function bar(visible: boolean) {
  const element = await Fia.getElementsByClass("left_menu_nav_wrap")
  let visibility = "hidden"
  if (visible) {
    visibility = ""
  }
  element[0].style.visibility = visibility
}

(async() => {
  await bar(false)
  logger.Info("Loaded module 'misc'")
})()