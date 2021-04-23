import { logger } from ".."
import Fia from "../fia"
import Utils from "../utils"

// TODO: store settings in localStorage
let DNR = true
let DNT = false
const specialStates: ISpecialSettings = {}
interface ISpecialSettings {
  [peerID: number]: {
    DNR?: boolean
    DNT?: boolean
  }
}

export function isDNREnabled(peerID: number) {
  if (specialStates[peerID] && typeof specialStates[peerID].DNR === "boolean")
    return specialStates[peerID].DNR
  return DNR
}
export function isDNTEnabled(peerID: number) {
  if (specialStates[peerID] && typeof specialStates[peerID].DNT === "boolean")
    return specialStates[peerID].DNT
  return DNT
}

unsafeWindow.changeDNRForChat = (peerID: number) => {
  if (!specialStates[peerID])
    specialStates[peerID] = {}
  if (typeof specialStates[peerID].DNR !== "boolean")
    specialStates[peerID].DNR = !DNR
  else
    specialStates[peerID].DNR = !specialStates[peerID].DNR
  const contextLabel = document.getElementById("context-dnr")
  if (specialStates[peerID].DNR === true) {
    // нечиталка была включена
    Utils.showNotification("Нечиталка включена для данного чата")
    // update context menu action
    if (contextLabel)
      contextLabel.innerText = "Выключить нечиталку"
  } else {
    // нечиталка была выключена
    Utils.showNotification("Нечиталка выключена для данного чата")
    curNotifier.idle_manager.is_idle = false
    if (contextLabel)
      contextLabel.innerText = "Включить нечиталку"
  }
}

unsafeWindow.changeDNTForChat = (peerID: number) => {
  if (!specialStates[peerID]) specialStates[peerID] = {}
  if (typeof specialStates[peerID].DNT !== "boolean")
    specialStates[peerID].DNT = !DNT
  else
    specialStates[peerID].DNT = !specialStates[peerID].DNT
  const contextLabel = document.getElementById("context-dnt")
  if (specialStates[peerID].DNT === true) {
    Utils.showNotification("Неписалка включена для данного чата")
    if (contextLabel)
      contextLabel.innerText = "Выключить неписалку"
  } else {
    Utils.showNotification("Неписалка выключена для данного чата")
    if (contextLabel)
      contextLabel.innerText = "Включить неписалку"
  }
}

unsafeWindow.changeDNRState = (state: boolean) => {
  DNR = state
  Utils.showNotification(`Нечиталка ${state === true ? "включена" : "выключена"}`)
}
unsafeWindow.changeDNTState = (state: boolean) => {
  DNT = state
  Utils.showNotification(`Неписалка ${state === true ? "включена" : "выключена"}`)
}

/*
// css for background image in dialog
im-page--chat-body:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  background-image: url(https://i.pinimg.com/originals/f7/ae/e8/f7aee8753832af613b63e51d5f07011a.jpg);
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
}
*/

(async () => {
  // prepare all needed global variables
  await Promise.all([
    Fia.getVariable("ajax"),
    Fia.getVariable("Notifier"),
    Fia.getVariable("curNotifier")
  ])

  Utils.Hook(ajax, "post", (next, ...args) => {
    const url = args[0]
    const body = args[1]
    if (url === "al_im.php" && body.act === "a_mark_read" && isDNREnabled(body.peer)) {
      logger.Debug(`Don't read messages`)
      // is it safe to kill idle_manager?
      curNotifier.idle_manager.is_idle = true
      args[2].onFail()
      return
    }
    if (url === "al_im.php" && body.act === "a_activity" && isDNTEnabled(body.peer)) {
      logger.Debug(`Don't send type status`)
      return
    }

    return next(...args)
  })

  Utils.Hook(Notifier.getLpInstance(), "push", (next, ...args) => {
    args[0] = args[0].filter((val: any) => {
      return val.type !== "event_read_inbound" || (val.type === "event_read_inbound" && !isDNREnabled(val.peer))
    })
    /*args[0] = args[0].map((val: any) => {
        if (val.type === "event_read_inbound") {
          val.unread = 1111
        }
        return val
      }) */
    if (args[0].length > 0) next(...args)
  })

  // style for context menu
  GM_addStyle(`
    .custom-menu {
      display: none;
      z-index: 1000;
      position: absolute;
      overflow: hidden;
      border: 1px solid #CCC;
      white-space: nowrap;
      font-family: sans-serif;
      background: #FFF;
      color: #333;
      border-radius: 5px;
      padding: 0;
    }

    /* Each of the items in the list */
    .custom-menu li {
      padding: 8px 12px;
      cursor: pointer;
      list-style-type: none;
      transition: all .3s ease;
      user-select: none;
    }

    .custom-menu li:hover {
      background-color: #DEF;
    }
  `)
  window.addEventListener("load", () => {
    document.body.insertAdjacentHTML("afterbegin", `<div><ul id="custom-context-menu" class="custom-menu"></ul></div>`)
  })

  function createLi(id: string, actionName: string, clickAction: string | null) {
    return `<li id="context-${id}" onclick=${clickAction === null ? "" : clickAction}>${actionName}</li>`
  }

  // context menu for dialogs
  $(document).on("contextmenu", ".nim-dialog", event => {
    logger.Debug("Show context menu for dialog")

    let menu = ""
    const peerID = parseInt(event.currentTarget.getAttribute("data-peer"), 10)
    const isGroup = peerID < 0
    const isConversation = peerID > 2000000000
    const isDM = !isGroup && !isConversation
    const isUnreaded = (event.currentTarget as HTMLElement).classList.contains("nim-dialog_unread")
    const isMuted = (event.currentTarget as HTMLElement).classList.contains("nim-dialog_muted")
    const isPinned = (event.currentTarget as HTMLElement).classList.contains("nim-dialog_pinned")

    if (isUnreaded)
      menu += createLi("mark-as-read", "Отметить прочитанным", null)

    if (isGroup)
      menu += createLi("open-group", "Перейти в группу", `window.open("https://vk.com/club${Math.abs(peerID)}")`)

    if (isDM)
      menu += createLi("open-profile", "Открыть профиль", `window.open("https://vk.com/id${Math.abs(peerID)}")`)

    if (isMuted)
      menu += createLi("notifications", "Включить уведомления", null)
    else
      menu += createLi("notifications", "Выключить уведомления", null)

    if (isPinned)
      menu += createLi("pin", "Открепить", null)
    else
      menu += createLi("pin", "Закрепить", null)

    if (isDNREnabled(peerID))
      menu += createLi("dnr", "Выключить нечиталку", `changeDNRForChat(${peerID})`)
    else
      menu += createLi("dnr", "Включить нечиталку", `changeDNRForChat(${peerID})`)

    if (isDNTEnabled(peerID))
      menu += createLi("dnt", "Выключить неписалку", `changeDNTForChat(${peerID})`)
    else
      menu += createLi("dnt", "Включить неписалку", `changeDNTForChat(${peerID})`)


    $("#custom-context-menu").append(menu)
    $("#custom-context-menu").finish().toggle(100).css({
      top: event.pageY + "px",
      left: event.pageX + "px"
    })
    event.preventDefault()
  })

  // context menu for messages [WIP]
  let selectedByContext: null | HTMLElement = null
  $(document).on("contextmenu", ".im-mess", event => {
    logger.Debug("Show message context menu")
    if (selectedByContext) {
      selectedByContext.classList.remove("im-mess_selected")
    }
    selectedByContext = event.currentTarget
    selectedByContext?.classList.add("im-mess_selected")

    let menu = ""
    if (true) // (unreaded)
      menu += createLi("read", "Прочитать до текущего", "")
    menu += createLi("reply", "Ответить", "")
    menu += createLi("forward", "Переслать", "")
    menu += createLi("delete", "Удалить", "")
    menu += createLi("spam", "Это спам", "")

    $("#custom-context-menu").append(menu)

    $("#custom-context-menu").finish().toggle(100).css({
      top: event.pageY + "px",
      left: event.pageX + "px"
    })
    event.preventDefault()
  })

  $(document).on("mousedown keyup", event => {
    // If the clicked element is not the menu
    if ($(event.target).parents(".custom-menu").length === 0) {
      // Hide it
      $("#custom-context-menu").hide(100)
      // and remove elements
      $("#custom-context-menu").empty()
      if (selectedByContext) {
        selectedByContext.classList.remove("im-mess_selected")
        selectedByContext = null
      }
    }
  })

  logger.Info("Loaded module 'im'")
})()
