// tslint:disable:no-console
import { Base, IRequest, IResponse } from "./base"

let instance: Debug | null = null
export default class Debug extends Base {
  public readonly name = "Debug"
  public static getInstance() {
    if (instance === null) instance = new Debug()
    return instance
  }
  public async init() {
    //
  }

  private debugAPI = false
  public onRequest(req: IRequest) {
    if (this.debugAPI) {
      Avotalif.Logger.Debug(`URL: ${req.url}${req.body?.act ? "?act=" + req.body.act : ""}, body:`)
      console.dir(req.body)
    }
    return true
  }

  public onResponse(res: IResponse) {
    if (this.debugAPI) {
      Avotalif.Logger.Debug(`URL: ${res.url}${res.reqBody?.act ? "?act=" + res.reqBody.act : ""}, response:`)
      console.dir(res.response)
    }
  }

  public onLpEvent(events: any[]) {
    console.dir(events)
  }

  public onModule(module: string) {
    Avotalif.Logger.Debug(`Current module is ${module}`)
  }
}