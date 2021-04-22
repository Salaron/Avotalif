import { logger } from ".."
import Fia from "../fia"

let vkAway = true
let disableRightBar = true


export async function bar(visible: boolean) {
  let element = await Fia.getElementsByClass("left_menu_nav_wrap")
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