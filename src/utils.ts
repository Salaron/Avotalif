import Fia from "./fia"
import { INotifier } from "./typings/notifier"

type IProto = {
  [k in number | string]: any
}

export default class Utils {
  public static async postRequest(url: string, body: any) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "POST",
        url,
        data: body,
        onload: resolve,
        onerror: reject
      })
    })
  }

  public static async onLPEvent(eventType: string, callback: (response: any) => void) {
    const Notifier = await Fia.getVariable<INotifier>("Notifier")
    Notifier.getLpInstance().onData((answer: any) => {
      if (answer.type === eventType || eventType === "") callback(answer)
    })
  }

  public static Hook(proto: IProto, name: string, replacement: (next: Function, ...args: any[]) => void) {
    if (!proto[`${name}_hook`]) {
      proto[`${name}_hook`] = {
        original: proto[name],
        hooks: []
      }
      proto[name] = function(...args: any[]) {
/*         if (!this.on_finish_hook_callbacks) this.on_finish_hook_callbacks = []
        this.callOnDone = function(callback: Function) {
          this.on_finish_hook_callbacks.push(callback)
        } */
        const ho = [...proto[`${name}_hook`].hooks] // create a copy of hooks
        const next = (..._args: any[]) => {
          const res = ho.shift()
          if (!res) {
            return proto[`${name}_hook`].original.call(this, ..._args)
          } else {
            return res.call(this, next, ..._args)
          }
        }
        const result = next(...args)
/*         if (this.on_finish_hook_callbacks.length > 0) {
          for (const cb of this.on_finish_hook_callbacks) {
            cb()
          }
        }
        this.on_finish_hook_callbacks = undefined
        this.callOnDone = undefined */
        return result
      }
    }

    proto[`${name}_hook`].hooks.push(replacement)
    // TODO: return function for hook remove
  }

  // not safe for functions
  public static clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
  }
}
