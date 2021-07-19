// tslint:disable:no-console
import { Base, IRequest, IResponse } from "./base"

export default class Debug extends Base {
  protected static instance: Debug
  public static getInstance() {
    if (!Debug.instance) Debug.instance = new Debug()
    return Debug.instance
  }

  public readonly name = "Debug"
  public async init() {
    //
  }

  private debugAPI = false
  public onRequest(req: IRequest) {
    if (this.debugAPI) {
      Avotalif.Logger.Debug(`URL: ${req.url}${req.body?.act ? "?act=" + req.body.act : ""}, body: ${req.body}`)
    }
    return true
  }

  public onResponse(res: IResponse) {
    if (this.debugAPI) {
      Avotalif.Logger.Debug(`URL: ${res.url}${res.reqBody?.act ? "?act=" + res.reqBody.act : ""}, response: ${res.response}`)
    }
  }

  public onLpEvent(events: any[]) {
    // console.dir(events)
  }

  public onModule(module: string) {
    Avotalif.Logger.Debug(`Current module: ${module}`)
  }
}