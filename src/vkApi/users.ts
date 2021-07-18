/**
 * May be done in future
 */

import API from "../api"


interface IUsersGetRequest {
  fields?: string[] | string
  user_ids?: number[] | number | string
  /**
   * Падежи
   * nom - именительный
   * get - родительный
   * date - дательный
   * acc - винильный
   * inst - творческий
   * abl - предложный
   */
  name_case?: "nom" | "gen" | "dat" | "acc" | "ins" | "abl"
}

interface IUsersGetResponse {
  response: {
    id: number
    first_name: string
    last_name: string
    is_closed: boolean
    can_access_closed: boolean
    photo_50: string
    verified: 1 | 0
    [key: string]: any // can contain additional fields
  }[]
}

export default class Users {
  private vkApi: API
  constructor(vkApi: API) {
    this.vkApi = vkApi
  }
  public async get(params?: IUsersGetRequest): Promise<IUsersGetResponse> {
    // format request params
    if (params) {
      if (params.fields && Array.isArray(params.fields)) {
        params.fields = params.fields.join(",")
      }
      if (typeof params.user_ids === "number") {
        params.user_ids = params.user_ids.toString()
      }
      if (Array.isArray(params.user_ids)) {
        params.user_ids = params.user_ids.join(",")
      }
    }

    return (await this.vkApi.call("users.get", params)).json
  }
}