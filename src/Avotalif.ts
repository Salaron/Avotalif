import Utils from "./utils/utils"
import API from "./api"
import { IRequest, IResponse } from "./modules/base"
import Fia from "./utils/fia"
import { Logger, LEVEL } from "./utils/logger"
import Modules from "./modules/index"

type Unpacked<T> = T extends (infer U)[] ? U : T

export default class Avotalif {
  public API: API = new API()
  public Logger: Logger = new Logger("Avotalif", LEVEL.DEBUG)
  public Utils: Utils = Utils

  public modules: (InstanceType<Unpacked<typeof Modules>>)[] = []
  public initDone = false
  private onInitListeners: (() => void)[] = []

  public async init() {
    if (this.initDone) return

    Fia.getVariable("ajax").then(() => {
      // onRequest & onResponse
      Utils.Hook(unsafeWindow.ajax, "post", (next, ...args) => {
        const req: IRequest = { url: args[0], body: args[1], callbacks: args[2] }
        const res = this.onRequest(req)
        if (res === true) next(...Object.values(req))
      })
    })

    Fia.getVariable("Notifier").then(() => {
      // onLpEvent
      Utils.Hook(unsafeWindow.Notifier.getLpInstance(), "push", (next, ...args) => {
        const events = args[0]
        this.onLpEvent(events)
        next(events)
      })
    })

    let prevCur: Window["cur"] | null = null
    setInterval(() => {
      if (unsafeWindow.cur && unsafeWindow.cur.module && prevCur !== unsafeWindow.cur) {
        prevCur = unsafeWindow.cur
        this.onModule(unsafeWindow.cur.module)
      }
    }, 100)


    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => { this.DOMReady().catch(err => this.Logger.Error(err)) })
    } else {
      await this.DOMReady()
    }
  }

  public onInitDone(callback: () => void) {
    if (this.initDone) {
      callback()
    } else {
      this.onInitListeners.push(callback)
    }
  }

  public async loadModule(module: Unpacked<typeof Modules>) {
    try {
      const instance = module.getInstance()
      if (this.initDone) {
        await instance.init()
        this.Logger.Info(`Loaded module ${instance.name}`)
      }
      this.modules.push(instance)
    } catch (err) {
      this.Logger.Error(err)
    }
  }

  private async DOMReady() {
    if (this.initDone) return
    this.initDone = true
    for (const callback of this.onInitListeners) {
      callback()
    }
    for (const module of this.modules) {
      await module.init()
      this.Logger.Info(`Loaded module ${module.name}`)
    }
    new MutationObserver(mutations => {
      try {
        for (const module of this.modules) {
          if (typeof module.onMutation === "function") module.onMutation(mutations)
        }
      } catch (err) {
        this.Logger.Error(err)
      }
    }).observe(document.body, { subtree: true, childList: true, attributes: false })
    this.onInitListeners = []
  }

  private onLpEvent(events: any[]) {
    try {
      for (const module of this.modules) {
        if (module.onLpEvent)
          module.onLpEvent(events)
      }
    } catch (err) {
      this.Logger.Error(err)
    }
  }

  private onRequest(req: IRequest): boolean {
    try {
      for (const module of this.modules) {
        if (
          typeof module.onRequest === "function" &&
          module.onRequest(req) === false
        ) {
          this.Logger.Debug(`Module ${module.name} rejected request to ${req.url}`)
          return false
        }
      }
      if (req.callbacks && req.callbacks.onDone) {
        const onDoneOriginal = req.callbacks.onDone
        req.callbacks.onDone = (...response: any[]) => {
          this.onResponse({
            url: req.url,
            reqBody: req.body,
            response: [...response]
          })
          return onDoneOriginal(...response)
        }
      }
      return true
    } catch (err) {
      this.Logger.Error(err)
      return true // ?
    }
  }

  private onResponse(res: IResponse) {
    try {
      for (const module of this.modules) {
        if (typeof module.onResponse === "function") {
          module.onResponse(res)
        }
      }
    } catch (err) {
      this.Logger.Error(err)
    }
  }

  private onModule(name: string) {
    try {
      for (const module of this.modules) {
        if (typeof module.onModule === "function") {
          module.onModule(name)
        }
      }
    } catch (err) {
      this.Logger.Error(err)
    }
  }
}