import { LEVEL, Logger } from "./logger"
import Fia from "./fia"
import Utils from "./utils"
import API from "./api"

export const logger = new Logger("Avotalif", LEVEL.DEBUG)
export const api = new API();

/*
Planned features:
0. Replace a_send calls with messages.send
0.1. Don't parse links option
0.2. Don't send notification option
1. Enchanced DNR // done 20.04
2. Ability to HIDE call buttons
3. Return old buttons order in profiles
4. Dark mode
5. Audio sync between tabs
6. Show time with seconds
7. DNR & DNT managers
8. Dialog stats
9. Ability to hide some dialogs from dialog list?
10. Settings
11. Hide small buttons under left menu // done 20.04
12. Image background in dialog
13. Custom context menu for dialogs and messages
14. Dialog like in mobile apps
15. Additional information in profile
*/

(async () => {
  await Fia.getVariable("Notifier")
  await Fia.getVariable("ajax")

  Utils.Hook(ajax, "post", (next, ...args) => {
    logger.Verbose(`${args[0]} : ${JSON.stringify(args[1], null, 2)}`, "Ajax POST")
    next(...args)
  })
  Utils.onLPEvent("", (response: any) => {
    logger.Verbose(JSON.stringify(response, null, 2), "LP")
  })
  unsafeWindow.Avotalif = await import("./modules/index")
})()

