import Avotalif from "./Avotalif"
import Modules from "./modules/index"
import BaseCSS from "./css/base.css"
import Settings from "./utils/settings"
import ShortcutManager from "./utils/shortcutManager"


/*
Planned features:
0. Replace a_send calls with messages.send // done 10.05
0.1. Don't parse links option
0.2. Don't send notification option // done 10.05
1. Enchanced DNR // done 20.04
2. Ability to HIDE call buttons
3. Return old buttons order in profiles
4. Themes
4.1 Dark theme
4.2 Image background
4.3 Accent color
5. Audio sync between tabs
6. Show time with seconds
6.1 Time with seconds in dialogs // done 21.05
6.2 Time with seconds in messages // done
7. DNR & DNT managers
8. Dialog stats
9. Ability to hide some dialogs from dialog list
10. Settings
11. Hide small buttons under left menu // done 20.04
12. Image background in dialog
13. Custom context menu for dialogs and messages
13.1 Context menu for dialogs // Done
14. Dialog like in mobile apps
15. Additional information in profile // done 22.05
16. Shortcuts for Avotalif actions
17. Spy for friends actions (offline, typing)
*/

// Трекеры:
// top-fwz1.mail.ru
// r3.mail.ru
// pu.vk.com ?
// www.tns-counter.ru ?
// ad.mail.ru
// api.ok.ru ?
// stats.vk-portal.net

(async () => {
  const av = new Avotalif()
  unsafeWindow.Avotalif = av

  // init settings
  Settings.getInstance()
  // init shortcut manager
  ShortcutManager.getInstance()
  // const tokens = GM_getValue<ITokens>("avTokens", {})
  /* if (!tokens[unsafeWindow.vk.id] || !av.API.checkToken(tokens[unsafeWindow.vk.id])) {
      tokens[unsafeWindow.vk.id] = await api.getNewToken(6146827)
  } */
  // init avotalif
  await av.init()

  for (const module of Modules) {
    await av.loadModule(module)
  }

  av.onInitDone(() => { GM_addStyle(BaseCSS) })
})().catch(err => {
  // tslint:disable-next-line
  console.error(err)
})
