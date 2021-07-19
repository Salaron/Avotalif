import Utils from "../utils/utils"
import { Base } from "./base"

export default class Profile extends Base {
  protected static instance: Profile
  public static getInstance(): Profile {
    if (!Profile.instance) Profile.instance = new Profile()
    return Profile.instance
  }

  public readonly name = "Profile"

  public async init() {
    // nothing
  }

  private extendedOnlineInfo = true
  private showOnlineFromThird = true
  public onModule(module: string) {
    if (module !== "profile") return
    const online = document.querySelector<HTMLElement>(".profile_online_lv")
    if (online) {
      this.getOnlineString(unsafeWindow.cur.owner!.id).then(str => {
        if (!str) return // TODO
        online.textContent = str
      })
    }

    const profileInfo = document.querySelector<HTMLElement>(".profile_info_short")
    if (profileInfo) {
      Utils.postRequest("https://vk.com/foaf.php", { id: unsafeWindow.cur.owner?.id }).then(async response => {
        const resp = response.text

        const rows = Array.from(document.querySelectorAll<HTMLElement>(".profile_info_row"))
        for (const row of rows) {
          const label = row.querySelector<HTMLElement>(".labeled")
          if (label?.innerHTML.includes("bday")) {
            const userInfo = await Avotalif.API.call("users.get", { user_ids: unsafeWindow.cur.owner?.id, fields: "bdate" })
            const date = (userInfo.json.response[0].bdate as string).split(".").map(el => parseInt(el, 10))
            if (Number.isNaN(date[0])) break
            const t = new Date(0, date[1] - 1, date[0])
            label?.insertAdjacentText("beforeend", ` (${this.getZodiacSign(t)})`)
          }
        }

        const registerDate = new Date((resp.match(/<ya:created dc:date="(.*?)"/i) || [0])[1])
        // TODO: templates
        profileInfo.insertAdjacentHTML("afterbegin", `\
        <div class="clear_fix profile_info_row ">
          <div class="label fl_l">Дата регистрации:</div>
          <div class="labeled">${Utils.formatDate(registerDate, "D mmmm YYYY HH:mm:ss")}</div>
        </div>`)

        profileInfo.insertAdjacentHTML("afterbegin", `\
        <div class="clear_fix profile_info_row ">
          <div class="label fl_l">ID:</div>
          <div class="labeled">${unsafeWindow.cur.owner?.id}</div>
        </div>`)
      })
    }
  }


  public async getOnlineString(userID: number) {
    const info = await this.getExtendedOnlineInfo(userID)
    if (info && this.extendedOnlineInfo) {
      return `${Utils.formatDate(info.time, "D mmm YYYY HH:mm:ss")} через ${info.via}`
    } else if (info) {
      // TODO
    }
    // юзер скрыл онлайн от всех пользователей
  }


  public async getExtendedOnlineInfo(userID: number) {
    let response = await Avotalif.API.call("users.get", { user_ids: userID, fields: "last_seen, online_info" })
    let resp = response.json.response[0]
    if (!resp.online_info.visible) {
      response = await Avotalif.API.call("users.get", { user_ids: userID, fields: "last_seen, online_info" }, true)
      resp = response.json.response[0]
      if (!resp.online_info.visible) return null
    }
    const devices: { [id: number]: string } = {
      1: "m.vk.com",
      2: "iPhone",
      3: "iPad",
      4: "Android",
      5: "Windows Phone",
      6: "Windows 10",
      7: "vk.com"
    }

    let platformName = devices[resp.last_seen.platform as number]
    if (!platformName) {
      Avotalif.Logger.Debug(`Unknown platorm id: ${resp.last_seen.platform}`)
      platformName = "Unknown"
    }

    if (resp.online_info.app_id) {
      const appInfo = await Avotalif.API.call("apps.get", { app_id: resp.online_info.app_id, platform: "web" })
      platformName = appInfo.json.response.items[0].title
    }

    return {
      time: resp.last_seen.time,
      via: platformName
    }
  }

  public getZodiacSign(date: Date): string {
    // https://ru.stackoverflow.com/a/30118
    const signs = [
      { name: "Козерог", m: 1, d: 20 },
      { name: "Водолей", m: 2, d: 20 },
      { name: "Рыбы", m: 3, d: 20 },
      { name: "Овен", m: 4, d: 20 },
      { name: "Телец", m: 5, d: 20 },
      { name: "Близнецы", m: 6, d: 21 },
      { name: "Рак", m: 7, d: 22 },
      { name: "Лев", m: 8, d: 23 },
      { name: "Дева", m: 9, d: 23 },
      { name: "Весы", m: 10, d: 23 },
      { name: "Скорпион", m: 11, d: 22 },
      { name: "Стрелец", m: 12, d: 21 },
      { name: "Козерог", m: 13, d: 20 }
    ]
    const m = date.getMonth() + 1
    const d = date.getDate()
    if (signs[m-1].d <= d) {
      return signs[m].name
    } else {
      return signs[m - 1].name
    }
  }
}