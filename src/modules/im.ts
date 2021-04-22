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
  if (Object.keys(specialStates).map(parseInt).includes(peerID))
    return specialStates[peerID].DNR
  return DNR
}
export function isDNTEnabled(peerID: number) {
  if (Object.keys(specialStates).map(parseInt).includes(peerID))
    return specialStates[peerID].DNT
  return DNT
}

// temporary solution
// @ts-expect-error
unsafeWindow.changeDNRState = (state: boolean) => {
  DNR = state
}
// @ts-expect-error
unsafeWindow.changeDNTState = (state: boolean) => {
  DNT = state
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
    /*     args[0] = args[0].map((val: any) => {
          if (val.type === "event_read_inbound") {
            val.unread = 1111
          }
          return val
        }) */
    if (args[0].length > 0) next(...args)
  })

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

  $(() => {
    const newHTML = document.createElement('ul')
    newHTML.innerHTML = `<ul id="custom-context-menu" class='custom-menu'></ul>`
    document.body.appendChild(newHTML)
  })

  function createLi(actionName: string, callback: any) {
    return `<li>${actionName}</li>`
  }

  $(document).on("contextmenu", ".nim-dialog", event => {
    logger.Debug("Show dialog context menu")

    let menu = ""
    const peerID = parseInt(event.currentTarget.getAttribute("data-peer"), 10)
    const isGroup = peerID < 0
    const isConversation = peerID > 2000000000
    const isDM = !isGroup && !isConversation
    const isUnreaded = (event.currentTarget as HTMLElement).classList.contains("nim-dialog_unread")
    const isMuted = (event.currentTarget as HTMLElement).classList.contains("nim-dialog_muted")

    if (isUnreaded)
      menu += createLi("Отметить прочитанным", null)

    if (isGroup)
      menu += createLi("Перейти в группу", null)

    if (isDM)
      menu += createLi("Открыть профиль", null)

    if (isMuted)
      menu += createLi("Включить уведомления", null)
    else
      menu += createLi("Выключить уведомления", null)

    if (isDNREnabled(peerID))
      menu += createLi("Выключить нечиталку", null)
    else
      menu += createLi("Включить нечиталку", null)

    if (isDNTEnabled(peerID))
      menu += createLi("Выключить неписалку", null)
    else
      menu += createLi("Включить неписалку", null)


    $("#custom-context-menu").append(menu)
    $("#custom-context-menu").finish().toggle(100).css({
      top: event.pageY + "px",
      left: event.pageX + "px"
    })
    event.preventDefault()
  })

  let selectedByContext: null | HTMLElement = null
  $(document).on("contextmenu", ".im-mess", event => {
    logger.Debug("Show message context menu")
    selectedByContext = event.currentTarget
    selectedByContext?.classList.add("im-mess_selected")
    $("#custom-context-menu").append("<li>Test</li>")
    $("#custom-context-menu").finish().toggle(100).css({
      top: event.pageY + "px",
      left: event.pageX + "px"
    })
    event.preventDefault()
  })

  $(document).on("mousedown", event => {
    // If the clicked element is not the menu
    if ($(event.target).parents(".custom-menu").length === 0) {
      // Hide it
      $("#custom-context-menu").hide(100)
      $("#custom-context-menu").empty()
      if (selectedByContext) {
        selectedByContext.classList.remove("im-mess_selected")
        selectedByContext = null
      }
    }
  })

  logger.Debug("Loaded module 'im'")
})()

