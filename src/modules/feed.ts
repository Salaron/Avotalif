import { Base, IRequest, IResponse } from "./base"

let instance: Feed | null = null
export default class Feed extends Base {
  public name = "Feed"

  public static getInstance() {
    if (instance === null) instance = new Feed()
    return instance
  }

  public async init() {
    //
  }

  public onRequest(req: IRequest) {
    if (req.url.includes("ads_rotate")) return false
    if (req.body.act === "ad_event") return false
    if (req.body.act === "seen") return false
    return true
  }

  public onResponse(res: IResponse) {
    // TODO: remove ad from response directly
  }
}