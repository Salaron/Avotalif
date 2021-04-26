import { api, logger } from ".."
import { ContextMenu } from "../elements/contextMenu"
import Fia from "../fia"
import Utils from "../utils"

// TODO: store settings in localStorage
const DNR = {
  DM: true,
  conversations: true,
  groups: true
}
const DNT = {
  DM: false,
  conversations: false,
  groups: false
}
const DNRSpecial: ISpecialSettings = {}
const DNTSpecial: ISpecialSettings = {}
const showSeconds = true
const audioToText = true

interface ISpecialSettings {
  [peerID: number]: boolean
}

export function isDNREnabled(peerID: number) {
  if (typeof DNRSpecial[peerID] === "boolean")
    return DNRSpecial[peerID]
  const info = Utils.peerInfo(peerID)
  if (info.isConversation && DNR.conversations) return true
  if (info.isDM && DNR.DM) return true
  if (info.isGroup && DNR.groups) return true
  return false
}
export function isDNTEnabled(peerID: number) {
  if (typeof DNTSpecial[peerID] === "boolean")
    return DNTSpecial[peerID]
  const info = Utils.peerInfo(peerID)
  if (info.isConversation && DNT.conversations) return true
  if (info.isDM && DNT.DM) return true
  if (info.isGroup && DNT.groups) return true
  return false
}

export function changeDNRForChat(peerID: number) {
  if (typeof DNRSpecial[peerID] === "boolean")
    DNRSpecial[peerID] = !DNRSpecial[peerID]
  else {
    const info = Utils.peerInfo(peerID)
    DNRSpecial[peerID] = !DNR.DM
    if (info.isConversation)
      DNRSpecial[peerID] = !DNR.conversations
    if (info.isGroup)
      DNRSpecial[peerID] = !DNR.groups
  }

  if (DNRSpecial[peerID] === true) {
    Utils.showNotification("Нечиталка включена для данного чата")
  } else {
    Utils.showNotification("Нечиталка выключена для данного чата")
    curNotifier.idle_manager.is_idle = false
  }
}
export function changeDNTForChat(peerID: number) {
  if (typeof DNTSpecial[peerID] === "boolean")
    DNTSpecial[peerID] = !DNTSpecial[peerID]
  else {
    const info = Utils.peerInfo(peerID)
    DNTSpecial[peerID] = !DNR.DM
    if (info.isConversation)
      DNTSpecial[peerID] = !DNR.conversations
    if (info.isGroup)
      DNTSpecial[peerID] = !DNR.groups
  }

  if (DNTSpecial[peerID] === true) {
    Utils.showNotification("Неписалка включена для данного чата")
  } else {
    Utils.showNotification("Неписалка выключена для данного чата")
  }
}

export async function markAsRead(peerID: number) {
  const dialog = document.querySelector(`._im_dialog_${peerID}`)
  let upToId
  if (dialog) {
    upToId = parseInt(dialog.getAttribute("data-msgid")!, 10)
  }
  Utils.pushLPEvent({
    type: "event_read_inbound",
    peerId: peerID,
    unread: 0,
    upToId,
    force: true
  })
}

export async function changePinState(peerID: number, pin: boolean) {
  const pinnedDialogs = document.querySelectorAll(".nim-dialog_pinned")
  if (pinnedDialogs.length === 5 && pin) {
    Utils.showNotification("Вы не можете закрепить больше 5 диалогов")
    return
  }
  const majorId = 16 * (pinnedDialogs.length + 1)
  Utils.pushLPEvent({
    type: "event_convo_major_id_changed",
    peerId: peerID,
    majorId: pin ? majorId : 0
  })
}

export async function changeMuteState(peerID: number, mute: boolean) {

/*   Notifier.lcSend("im", {
    act: mute ? "mute" : "unmute",
    peer: peerID
  }) */
}

/*
// possible css for background image in dialog
im-page--chat-body:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  background-image: url("https://i.pinimg.com/originals/f7/ae/e8/f7aee8753832af613b63e51d5f07011a.jpg");
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
}
*/

(async () => {
  // wait for all needed global variables
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
      return val.type !== "event_read_inbound" ||
        (val.type === "event_read_inbound" && !isDNREnabled(val.peerId)) ||
        (val.type === "event_read_inbound" && val.force)
    })
    if (args[0].length > 0) next(...args)
  })

  const dialogContext = new ContextMenu(".nim-dialog")
  dialogContext.onClick(event => {
    logger.Debug("Show context menu for dialog")
    const target: HTMLElement = event.currentTarget

    const peerID = parseInt(event.currentTarget.getAttribute("data-peer"), 10)
    const peerInfo = Utils.peerInfo(peerID)
    const isUnreaded = target.classList.contains("nim-dialog_unread")
    const isMuted = target.classList.contains("nim-dialog_muted")
    const isPinned = target.classList.contains("nim-dialog_pinned")

    if (isUnreaded)
      dialogContext.addElement("Отметить прочитанным", `Avotalif.markAsRead(${peerID})`)
    if (peerInfo.isGroup)
      dialogContext.addElement("Перейти в группу", `window.open("https://vk.com/club${Math.abs(peerID)}")`)
    if (peerInfo.isDM)
      dialogContext.addElement("Открыть профиль", `window.open("https://vk.com/id${peerID}")`)

    dialogContext.addElement(`${isMuted ? "Включить" : "Выключить"} уведомления`, `Avotalif.changeMuteState(${peerID}, ${isMuted})`)
    dialogContext.addElement(`${isPinned ? "Открепить" : "Закрепить"}`, `Avotalif.changePinState(${peerID}, ${!isPinned})`)

    dialogContext.addElement(`${isDNREnabled(peerID) ? "Выключить" : "Включить"} нечиталку`, `Avotalif.changeDNRForChat(${peerID})`)
    dialogContext.addElement(`${isDNTEnabled(peerID) ? "Выключить" : "Включить"} неписалку`, `Avotalif.changeDNTForChat(${peerID})`)

    dialogContext.show(event)
  })

  // context menu for messages [WIP]
  const selectedByContext: null | HTMLElement = null
  const msgContext = new ContextMenu(".im-mess")
  // fixme: menu closes if forward message selected
  msgContext.onClick(event => {
    logger.Debug("Show context menu for message")
    const target: HTMLElement = event.currentTarget

    // TODO: mark unreaded messages
    // dummy elements for now
    if (true) // unreaded
      msgContext.addElement("Прочитать")
    msgContext.addElement("Ответить")
    msgContext.addElement("Переслать")
    if (true) // conversantion && have rights to pin && !isPinned
      msgContext.addElement("Закрепить")
    if (true) // outgoing
      msgContext.addElement("Редактировать")
    msgContext.addElement("Удалить")
    msgContext.addElement("Это спам")
    msgContext.show(event)
  })

  // seconds in messages, audio messages
  window.addEventListener("load", () => {
    new MutationObserver(mutations => {
      if (cur.module !== "im" || (!showSeconds && !audioToText)) return
      const elements = Array.from(document.querySelectorAll<HTMLElement>(".im-mess-stack:not(.av_checked"))
      for (const element of elements) {
        element.classList.add("av_checked")

        const span = element.querySelector("span.im-mess-stack--tools")
        if (span && showSeconds) {
          // possible pure js equalient: element.getElementsByTagName("ul")[0].getElementsByTagName("li")[0].getAttribute("data-ts")
          const timeStamp = parseInt($(element).find("[data-ts]").attr("data-ts")!, 10)
          const d = new Date(timeStamp * 1000)
          const hours = d.getHours().toString().padStart(2, "0")
          const minutes = d.getMinutes().toString().padStart(2, "0")
          const seconds = d.getSeconds().toString().padStart(2, "0")

          const lnk = span.querySelector("a._im_mess_link")
          if (lnk) {
            lnk.textContent = `${hours}:${minutes}:${seconds}`
          } else if (span.textContent?.includes(":")) {
            span.textContent = span.textContent.replace(`${d.getHours()}:${minutes}`, `${hours}:${minutes}:${seconds}`)
          } else {
            span.textContent = `${hours}:${minutes}:${seconds} ${span.textContent}`
          }
        }

        const audioMessages = Array.from(element.getElementsByClassName("im_msg_audiomsg"))
        if (audioMessages.length > 0 && audioToText) {
          for (const messsage of audioMessages) {
            const id = parseInt(messsage.id.split("_")[1], 10)
          }
        }
      }
    }).observe(document.body, { subtree: true, childList: true, attributes: false })
  })

  logger.Info("Loaded module 'im'")
})()
