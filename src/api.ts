import { logger } from "."
import Utils from "./utils"

export default class API {
  private API_URL = "https://api.vk.com"
  private API_VERSION = "5.130" // latest on 24.04.2021

  public async call(method: string, params: any): Promise<any> {
    // TODO
  }

  public async checkToken(token: string) {
    try {
      await this.send("users.get", {}, token)
      return true
    } catch (err) {
      return false
    }
  }

  public async getNewToken() {
    // TODO
  }

  private async send(method: string, params: any, token: string) {
    logger.Debug(method)
    try {
      const response = await Utils.postRequest(`${this.API_URL}/method/${method}`, {
        ...params,
        v: this.API_VERSION,
        access_token: token
      })
      logger.Verbose(response as any)
      return response
    } catch (err) {
      logger.Error(err)
    }
  }
}

