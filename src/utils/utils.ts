import Fia from "./fia"
import { INotifier } from "../typings/notifier"

type IProto = {
  [k in number | string]: any
}

interface IPostRequestResult {
  status: number
  text: string
  json: any
}

interface IAlRequestParams {
  act: string
  [name: string]: any
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

  public static async postRequest(url: string, data: any): Promise<IPostRequestResult> {
    return new Promise((res, rej) => {
      GM_xmlhttpRequest({
        method: "POST",
        url,
        data: Utils.urlEncode(JSON.parse(JSON.stringify(data))),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=windows-1251",
          "x-requested-with": "XMLHttpRequest"
        },
        onload: response => {
          let json
          try {
            json = JSON.parse(response.responseText)
          } catch (err) {
            // something else?
          }
          res({
            status: response.status,
            text: response.responseText,
            json
          })
        },
        onerror: response => {
          rej(response.error)
        }
      })
    })
  }

  public static async alRequest(module: "im", params: IAlRequestParams) {
    const response = await Utils.postRequest(`https://vk.com/al_${module}.php?act=${params.act}`, {
      ...params,
      gid: params.gid ? params.gid : 0,
      block: true,
      al: 1,
      im_v: 3
    })
    if (response.json.payload[0] === 0)
      return response.json.payload[1][0]
    else {
      Utils.showNotification(response.json.payload[1][0])
      throw Error(response.json.payload[1][0])
    }
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
    unsafeWindow.Notifier.showEvent({
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

  public static formatDate(date: Date | number, format: string) {
    if (typeof date === "number") date = new Date(date * 1000)
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate().toString()

    const hours = date.getHours().toString()
    const minutes = date.getMinutes().toString()
    const seconds = date.getSeconds().toString()

    // date
    // year:  YY YYYY 21 2021
    // month: M MM mmm MMM mmmm MMMM 1 01 янв Янв январь Январь
    // day:   D DD 1 01

    // time
    // hours:   H HH 1 01
    // minutes: m mm 1 01
    // seconds: s ss 1 01
    const getLang = unsafeWindow.getLang
    return format
      // year
      .replace(/YYYY/g, year)
      .replace(/YY/g, year.slice(-2))
      // month
      .replace(/MMMM/g, getLang(`Month${month}_of`))
      .replace(/mmmm/g, getLang(`month${month}_of`))
      .replace(/MMM/g, getLang(`month${month}sm_of`).charAt(0).toUpperCase() + getLang(`month${month}sm_of`).slice(1))
      .replace(/mmm/g, getLang(`month${month}sm_of`))
      .replace(/MM/g, month.padStart(2, "0"))
      .replace(/M/g, month)
      // day
      .replace(/DD/g, day.padStart(2, "0"))
      .replace(/D/g, day)
      // hours
      .replace(/HH/g, hours.padStart(2, "0"))
      .replace(/H/g, hours)
      // minutes
      .replace(/mm/g, minutes.padStart(2, "0"))
      .replace(/m/g, minutes)
      // seconds
      .replace(/ss/g, seconds.padStart(2, "0"))
      .replace(/s/g, seconds)
  }

  public static convertLetters(input: string) {
    const enToRu = new Map<string, string>([
      ["q", "й"],
      ["w", "ц"],
      ["e", "у"],
      ["r", "к"],
      ["t", "е"],
      ["y", "н"],
      ["u", "г"],
      ["i", "ш"],
      ["o", "щ"],
      ["p", "з"],
      ["[", "х"],
      ["{", "Х"],
      ["]", "ъ"],
      ["}", "Ъ"],
      ["a", "ф"],
      ["s", "ы"],
      ["d", "в"],
      ["f", "а"],
      ["g", "п"],
      ["h", "р"],
      ["j", "о"],
      ["k", "л"],
      ["l", "д"],
      [";", "ж"],
      [":", "Ж"],
      ["'", "э"],
      ["\"", "Э"],
      ["z", "я"],
      ["x", "ч"],
      ["c", "с"],
      ["v", "м"],
      ["b", "и"],
      ["n", "т"],
      ["m", "ь"],
      [",", "б"],
      ["<", "Б"],
      [".", "ю"],
      [">", "Ю"],
      ["^", ":"],
      ["`", "ё"],
      ["~", "Ё"]
    ])
    const ruToEn = new Map<string, string>()
    enToRu.forEach((val, key) => {
      ruToEn.set(val, key)
    })
    let enCount = 0
    let ruCount = 0
    for (const letter of input) {
      if (enToRu.has(letter)) {
        enCount++
      }
      if (ruToEn.has(letter)) {
        ruCount++
      }
    }
    if (enCount === ruCount) return input

    const afterWhitespace = ["[", "{", "]", "}", "'", "\"", "<", ">"]
    const beforeWord = [";", ":", ",", "."]


    let result = ""
    if (enCount > ruCount) {
      // convert to Russian
      for (let i = 0; i < input.length; i++) {
        const letter = input[i].toLowerCase()
        const letterOriginal = input[i]
        if (beforeWord.includes(letterOriginal) && i < input.length && input[i + 1] === " ") {
          result += letterOriginal
          continue
        }
        let a = enToRu.get(letter) || letterOriginal
        if (letterOriginal.match(/[А-ЯЁ]/g)) {
          a = a.toUpperCase()
        }
        result += a
      }
    } else {
      // convert to English
      for (let i = 0; i < input.length; i++) {
        const letter = input[i].toLowerCase()
        const letterOriginal = input[i]
        if (beforeWord.includes(letterOriginal) && i < input.length && input[i + 1] === " ") {
          result += letterOriginal
          continue
        }
        let a = ruToEn.get(letter) || letterOriginal
        if (letterOriginal.match(/[A-Z]/g)) {
          a = a.toUpperCase()
        }
        result += a
      }
    }
    return result
  }
}
