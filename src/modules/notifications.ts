import { api, logger } from ".."
import Utils from "../utils"

const typingNotif = true;

(async() => {
  Utils.onLPEvent("event_typing", async (event: { peerId: any; }) => {
    if (typingNotif) {
      const isConversantion = event.peerId >= 2000000000
      const isGroup = event.peerId < 0

      if (isConversantion) {
        // get conversantion name
      }
      if (isGroup) {
        // get group name
      }
    }
  })

  logger.Info("Loaded module 'notifications'")
})()