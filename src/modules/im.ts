import { logger } from ".."
import Fia from "../fia"
import Utils from "../utils"

// TODO: store settings in localStorage
let DNR = true
let DNT = false
let specialStates: ISpecialSettings = {}

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
//@ts-expect-error
unsafeWindow.changeDNRState = function(state: boolean) {
  DNR = state
}
//@ts-expect-error
unsafeWindow.changeDNTState = function(state: boolean) {
  DNT = state
};

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

(async() => {
  // prepare all needed global variables
  await Promise.all([
    Fia.getVariable("ajax"),
    Fia.getVariable("Notifier"),
    Fia.getVariable("curNotifier")
  ])

  Utils.Hook(ajax, "post", (next, ...args) => {
    let url = args[0]
    let body = args[1]
    if (url === "al_im.php" && body.act === "a_mark_read" && isDNREnabled(body.peer)) {
      logger.Debug(`Don't read messages`)
      // is it safe to kill idle_manager?
      curNotifier.idle_manager.is_idle = true
      args[2].onFail()
      return;
    }
    if (url === "al_im.php" && body.act === "a_activity" && isDNTEnabled(body.peer)) {
      logger.Debug(`Don't send type status`)
      return;
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
    if(args[0].length > 0) next(...args)
  })

  $(document).on("contextmenu", ".nim-dialog", function(event) {
    console.log("hi")
    event.preventDefault()
  })
  $(document).on("contextmenu", ".im-mess", function(event) {
    console.log("bye")
    event.preventDefault()
  })

  logger.Debug("Loaded module 'im'")
})()

