import { Base, IRequest, IResponse } from "./base"

export default class Feed extends Base {
  protected static instance: Feed
  public static getInstance() {
    if (!Feed.instance) Feed.instance = new Feed()
    return Feed.instance
  }

  public readonly name = "Feed"
  public async init() {
    //
  }

  public onRequest(req: IRequest) {
    if (req.url.includes("ads_rotate")) return false
    if (req.body.act === "ad_event") return false
    // if (req.body.act === "seen") return false
    return true
  }

  public onResponse(res: IResponse) {
    // TODO: remove ad from response directly
  }
}