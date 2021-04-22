import { logger } from ".."
import Utils from "../utils"

let typingNotif = true;

(async() => {
  Utils.onLPEvent("event_typing", (response: { peerId: any; }) => {
    if (typingNotif) {
      const isConversantion = response.peerId >= 2000000000
      const isGroup = response.peerId < 0

      if (isConversantion) {
        // get conversantion name
        // 
      }
      Notifier.showEvent({
        title: "Avotalif",
        text: `${response.peerId} печатает...`
      })
    }
  })

  logger.Info("Loaded module 'notifications'")
})()