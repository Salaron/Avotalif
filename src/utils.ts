import Fia from "./fia"
import { INotifier } from "./typings/notifier"

type IProto = {
  [k in number | string]: any
}

export default class Utils {
  public static urlEncode(object: any): string {
    const str = []
    for (const p in object) {
      if (object.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(object[p]))
      }
    }
    return str.join("&")
  }

  public static async postRequest(url: string, data: any) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "POST",
        url,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: Utils.urlEncode(data),
        onload: response => {
          const result = JSON.parse(response.response)
          if (typeof result === "object" && result.error) {
            if (result.error.error_code === 5) {
              Utils.showNotification("Token invalid")
            }
            reject(result.error)
          }
          resolve(result.response)
        },
        onerror: reject
      })
    })
  }

  public static async onLPEvent(eventType: string, callback: (event: any) => void) {
    const Notifier = await Fia.getVariable<INotifier>("Notifier")
    Notifier.getLpInstance().onData((answer: any) => {
      if (answer.type === eventType || eventType === "") callback(answer)
    })
  }

  public static async pushLPEvent(data: any) {
    const Notifier = await Fia.getVariable<INotifier>("Notifier")
    Notifier.getLpInstance().push([data])
  }

  public static Hook(proto: IProto, name: string, replacement: (next: (...args: any[]) => any, ...args: any[]) => void) {
    if (!proto[`${name}_hook`]) {
      proto[`${name}_hook`] = {
        original: proto[name],
        hooks: []
      }
      proto[name] = function (...args: any[]) {
        const ho = [...proto[`${name}_hook`].hooks] // create a copy of hooks
        const next = (..._args: any[]) => {
          const res = ho.shift()
          if (!res) {
            return proto[`${name}_hook`].original.call(this, ..._args)
          } else {
            return res.call(this, next, ..._args)
          }
        }
        return next(...args)
      }
    }

    proto[`${name}_hook`].hooks.push(replacement)
    // TODO: return function for hook remove
  }

  // not safe for functions
  public static clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
  }

  public static showNotification(text: string) {
    Notifier.showEvent({
      title: "Avotalif",
      text
    })
  }

  public static peerInfo(peerID: number) {
    return {
      isGroup: peerID < 0,
      isConversation: peerID > 2000000000,
      isDM: peerID > 0 && peerID < 2000000000
    }
  }
}
