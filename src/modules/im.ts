import ContextMenu from "../components/contextMenu"
import Utils from "../utils/utils"
import { Base, IRequest } from "./base"
import { IMessage } from "@apidog/vk-typings"
import ShortcutManager, { Keys } from "../utils/shortcutManager"
import Fia from "../utils/fia"

interface ISttCache {
  [messageId: number]: IMessage
}

let instance: IM | null = null
export default class IM extends Base {
  public name = "IM"
  private sttCache: ISttCache = {}

  constructor() {
    super()
    if (instance) throw new Error("?")
  }

  public static getInstance() {
    if (!instance) instance = new IM()
    return instance
  }

  public async init(): Promise<void> {
    const originalGetShortDateOrTime = unsafeWindow.getShortDateOrTime
    unsafeWindow.getShortDateOrTime = (...args: any[]) => {
      let res: string = originalGetShortDateOrTime(...args)
      if (res.includes(":")) {
        res = Utils.formatDate(args[0], "HH:mm:ss")
      }
      return res
    }

    const dialogContext = new ContextMenu("dialog-context", ".nim-dialog")
    dialogContext.onClick(event => {
      event.preventDefault()
      Avotalif.Logger.Debug("Show context menu for dialog")
      const target: HTMLElement = event.currentTarget

      const peerID = parseInt(event.currentTarget.getAttribute("data-peer"), 10)
      const peerInfo = Utils.peerInfo(peerID)
      const isUnreaded = target.classList.contains("nim-dialog_unread")
      const isMuted = target.classList.contains("nim-dialog_muted")
      const isPinned = target.classList.contains("nim-dialog_pinned")

      const isGroupMessages = unsafeWindow.cur.gid !== 0

      if (isUnreaded) {
        dialogContext.addElement("Отметить прочитанным", () => {
          this.markAsRead(peerID, undefined, isGroupMessages ? unsafeWindow.cur.gid : undefined).catch(err => Avotalif.Logger.Error(err))
        })
      }

      if (peerInfo.isGroup) {
        dialogContext.addElement("Перейти в группу", () => {
          window.open(`https://vk.com/club${Math.abs(peerID)}`)
        })
      }
      if (peerInfo.isDM) {
        dialogContext.addElement("Открыть профиль", () => {
          window.open(`https://vk.com/id${Math.abs(peerID)}`)
        })
      }

      if (!isGroupMessages) {
        dialogContext.addElement(`${isMuted ? "Включить" : "Выключить"} уведомления`, () => {
          this.changeMuteState(peerID, !isMuted).catch(err => Avotalif.Logger.Error(err))
        })
        dialogContext.addElement(`${isPinned ? "Открепить" : "Закрепить"}`, () => {
          this.changePinState(peerID, !isPinned).catch(err => Avotalif.Logger.Error(err))
        })
      }

      dialogContext.addElement(`${this.isDNREnabled(peerID) ? "Выключить" : "Включить"} нечиталку`, () => {
        // should be done in settings
      })
      dialogContext.addElement(`${this.isDNREnabled(peerID) ? "Выключить" : "Включить"} неписалку`, () => {
        // should be done in settings
      })

      if (!isGroupMessages) {
        dialogContext.addElement("Скрыть диалог", () => {
          // append to settings
          target.setAttribute("style", "display: none;")
        })
      }

      dialogContext.show(event)
    })

    // TODO: move to separate module with all shortcuts
    ShortcutManager.getInstance().register("im", [Keys.ControlLeft, Keys.KeyQ], () => {
      const textArea = document.querySelector("._im_text")
      if (textArea) {
        textArea.textContent = Utils.convertLetters(textArea.textContent || "")
      }
    })

    // wdd test
/*     const wddWrap = await Fia.querySelector("#im_editable2000000054_composer_wdd_term")
    const wddInput = wddWrap.firstChild
    const e = await Fia.querySelector("#im_editable2000000054")
    console.log(wddWrap)
    const wdd = WideDropdown.initSelect(wddWrap, {
      text: wddWrap,
      input: e,
      noResult: "Пусто",
      introText: "Intro",
      toup: true,
      searchKeys: [1, 7, 9],
      width: "auto",
      onItemSelect: (i: any) => {
        console.log(i)
      }
    })

    const test = await cur.wallMentions
    WideDropdown.items(wdd.id, test)
    WideDropdown._updateList(wdd, !1, "")
    WideDropdown._showList(wdd) */
  }

  public onRequest(req: IRequest): boolean {
    if (req.url.includes("al_im") === false) return true // proccess only im requests
    if (req.body.act === "a_mark_read" && this.isDNREnabled(req.body.peer)) {
      return false
    }
    if (req.body.act === "a_activity" && this.isDNTEnabled(req.body.peer)) {
      return false
    }
    if (req.body.act === "a_send") {
      // send messages via VK Me api
      this.sendMessage(req.body).catch(err => {
        if (typeof req.callbacks.onFail === "function") req.callbacks.onFail()
        Avotalif.Logger.Error(err)
      })
      return false
    }

    return true
  }

  public onLpEvent(events: any[]) {
    for (let i = events.length - 1; i >= 0; i--) {
      const event = events[i]
      if (event.type === "event_read_inbound" && this.isDNREnabled(event.peerId) && !event.force) {
        events.splice(i, 1)
      }
    }
  }

  public onMutation(mutations?: MutationRecord[]) {
    if (unsafeWindow.cur?.module !== "im") return // nothing to modify

    const stacks = Array.from(document.querySelectorAll<HTMLElement>(".im-mess-stack:not(.av-stack-checked)"))
    for (const msgStack of stacks) {
      msgStack.classList.add("av-stack-checked")

      const span = msgStack.querySelector("span.im-mess-stack--tools")
      if (span) {
        // possible pure js equalient: element.getElementsByTagName("ul")[0].getElementsByTagName("li")[0].getAttribute("data-ts")
        const timeStamp = parseInt($(msgStack).find("[data-ts]").attr("data-ts")!, 10)
        const secondsStr = Utils.formatDate(timeStamp, "HH:mm:ss")
        const lnk = span.querySelector("a._im_mess_link")
        if (lnk) {
          lnk.textContent = secondsStr
        } else if (span.textContent?.includes(":")) {
          span.textContent = span.textContent.replace(/(\d+:\d+)+/, secondsStr)
        } else {
          span.textContent = `${secondsStr} ${span.textContent}`
        }
      }
    }

    const messages = Array.from(document.querySelectorAll<HTMLElement>(".im-mess:not(.av-msg-checked)"))
    const audioMessages = Array.from(document.querySelectorAll(".im_msg_audiomsg:not(.av-audiomsg-checked)"))
    for (const audioMsg of audioMessages) {
      audioMsg.classList.add("av-audiomsg-checked")
      const parent = audioMsg.parentElement?.parentElement?.parentElement?.parentElement!
      const msgID = parseInt(parent.getAttribute("data-msgid")!, 10)
      const peerID = parseInt(parent.getAttribute("data-peer")!, 10)

      // audioMsg.insertAdjacentHTML("afterend", `<a id="av-${}>Распознать</a>`)

      if (this.sttCache[msgID]) {

      } else {

      }

    }


    const dialogs = Array.from(document.querySelectorAll<HTMLElement>(".nim-dialog:not(.av-dialog-checked)"))
    const toModify: HTMLElement[] = []
    for (const dialog of dialogs) {
      dialog.classList.add("av-dialog-checked")
      const date = dialog.querySelector(".nim-dialog--date")
      if (date && date.textContent && ((date.textContent.match(/:/g) || []).length === 1 || date.textContent === unsafeWindow.getLang("global_date")[3])) {
        toModify.push(dialog)
      }
    }
    if (toModify.length > 0) {
      Avotalif.API.call("messages.getConversations", {}).then(response => {
        for (const dialog of toModify) {
          const peerId = parseInt(dialog.getAttribute("data-peer")!, 10)
          const date = dialog.querySelector(".nim-dialog--date")
          for (const conv of response.json.response.items) {
            if (conv.conversation.peer.id === peerId) {
              date!.textContent = Utils.formatDate(conv.last_message.date, "HH:mm:ss")
              break
            }
          }
        }
      }).catch(err => Avotalif.Logger.Error(err))
    }

    const textInput = document.querySelector(".im-chat-input--textarea div.ph_content")
    if (textInput) {
      textInput.textContent = "абоба"
      // textInput.textContent = getLang("mail_im_enter_msg")
    }

    const hidden: never[] = []
    for (const dialog of hidden) {
      const element = document.getElementsByClassName(`_im_dialog_${dialog}`)
      if (element.length > 0)
        element[0].setAttribute("style", "display: none")
    }
  }

  public onModule(module: string) {
    if (module !== "im") return

    const menu = document.querySelector(".im-page--redesigned-menu.ui_actions_menu")
    if (menu) {
      menu.insertAdjacentHTML("beforeend", unsafeWindow.getTemplate("sImUiActionMenuItem", {
        name: "Показать скрытые диалоги"
      }))
    }

    this.onMutation()
  }

  /**
   * Mute/Unmute conversantion notifications
   * @param peerID
   * @param state false - unmute; true - mute
   */
  public async changeMuteState(peerID: number, state: boolean) {
    const dialog = await Utils.alRequest("im", {
      act: "a_start",
      peer: peerID,
      msgid: false,
      history: true,
    })
    await Utils.alRequest("im", {
      act: "a_mute",
      peer: peerID,
      hash: dialog.hash,
      value: Number(state),
      until: -1
    })
  }

  /**
   * Pin/Unpin conversantion in the list
   * @param peerID
   * @param state false - unpin; true - pin
   */
  public async changePinState(peerID: number, state: boolean) {
    const dialog = await Utils.alRequest("im", {
      act: "a_start",
      peer: peerID,
      msgid: false,
      history: true,
    })
    let act = "a_unpin_convo"
    if (state) {
      act = "a_pin_convo"
    }
    await Utils.alRequest("im", {
      act,
      peer_id: peerID,
      hash: dialog.hash,
    })
  }

  /**
   * Mark conversantion as read
   * @param peerID
   * @param startMessageId
   * @param groupID
   */
  public async markAsRead(peerID: number, startMessageId?: number, groupID?: number) {
    if (typeof groupID === "number") {
      const conv = await Utils.alRequest("im", {
        act: "a_start",
        block: true,
        gid: groupID,
        history: true,
        msgid: false,
        peer: peerID,
        prevpeer: 0
      })
      await Utils.alRequest("im", {
        act: "a_mark_read",
        gid: groupID,
        hash: conv.hash,
        peer: peerID,
        ids: [conv.lastmsg]
      })
    } else {
      await Avotalif.API.call("messages.markAsRead", {
        peer_id: peerID,
        mark_conversation_as_read: typeof startMessageId === "number" ? undefined : 1,
        start_message_id: startMessageId
      })
    }
  }

  /**
   * Check if "do not read" is enabled for specific peer
   * @param peerID
   * @returns boolean
   */
  public isDNREnabled(peerID: number) {
    return peerID !== 388227110
  }

  /**
   * Check if "do not type" is enabled for specific peer
   * @param peerID
   * @returns boolean
   */
  public isDNTEnabled(peerID: number) {
    return false
  }

  private async sendMessage(body: any) {
    const params: any = {
      message: body.msg,
      peer_id: body.to,
      random_id: body.random_id
    }
    if (body.msg.length === 0 && body.share_url && body.share_url.length !== 0) {
      params.message = body.share_url
    }
    const attachments = []
    const a = body.media.split(",")
    for (const media of a) {
      const parts = media.split(":")
      switch (parts[0]) {
        case "map":
          const coord = parts[1].split("_")
          params.lat = coord[0]
          params.long = coord[1]
          break
        case "reply":
          params.reply_to = parts[1]
          break
        case "mail":
          params.forward_messages = parts[1].replace(/;/g, ",")
          break
        case "sticker":
          params.sticker_id = parts[1]
          break
        case "photo":
        case "video":
        case "audio":
        case "doc":
        case "market":
          attachments.push(`${parts[0]}${parts[1]}`)
          break
        case "poll":
          const answers = []
          for (let i = 0; i < 10; i++) {
            if (body[`answers[${i}]`] !== undefined)
              answers.push(body[`answers[${i}]`])
            else
              break
          }
          // create a poll
          // fixme: bug with photo background
          const pool = await Avotalif.API.call("polls.create", {
            question: body.question,
            is_anonymous: body.anonymous,
            owner_id: unsafeWindow.vk.id,
            add_answers: answers.toString(),
            is_multiple: body.poll_is_multiple,
            background_id: body.poll_background_id !== 0 ? body.poll_background_id : undefined,
            end_date: body.poll_until !== 0 ? body.poll_until : undefined,
            disable_unvote: body.poll_disable_unvote,
            photo_id: body.photo_id !== 0 ? body.photo_id : undefined,
          })
          attachments.push(`poll${pool.json.response.id}`)
          break
      }
    }

    let silent = 0 // send message w/o sound?
    let expireTtl = 0 // bomb message a.k.a. message with specific time of live
    let disableMentions = 0 // don't send notifications when tagging @
    let dontParseLinks = 0 // as is
    const commands = ["audiomsg", "shrug", "bomb", "silent", "nolinks", "nomentions"]
    if (params.message && params.message.length > 0) {

      const s = ":(" + commands.join("|") + ")(.*?)[:]"
      const r = new RegExp(s, "gi")

      const actions = params.message.match(r) ?? []
      actions.forEach((action: string, i: number) => {
        action = action.split(":").join("")
        if (action.startsWith("shrug")) {
          params.message = params.message.replace(/:(shrug)(.*?)[:]/gi, "¯\\_(ツ)_/¯")
        }
        if (action.startsWith("audiomsg")) {
          // TODO: check if current user is owner
          // and upload audio messages if it is not owner
          attachments.push(action.replace("audiomsg", "doc"))
        }
        if (action.startsWith("bomb")) {
          expireTtl = 15
          const aa = action.match(/\d+/g)
          if (aa !== null && aa.length > 0) {
            expireTtl = parseInt(aa[0], 10)
          }
        }
        if (action.startsWith("silent")) {
          silent = 1
        }
        if (action.startsWith("nolinks")) {
          dontParseLinks = 1
        }
        if (action.startsWith("nomentions")) {
          disableMentions = 1
        }
      })
      params.message = params.message.replace(r, "")
    }

    await Avotalif.API.call("messages.send", {
      ...params,
      silent,
      expire_ttl: expireTtl,
      disable_mentions: disableMentions,
      dont_parse_links: dontParseLinks,
      attachment: attachments.join(",")
    })
  }

  private async leaveChat() {

  }
}