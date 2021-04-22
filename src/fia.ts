
import { logger } from "."

export default class Fia {
  public static async getVariable<T>(name: string): Promise<T> {
    // what will be if variable doesn't exist?
    return new Promise(res => {
      // @ts-expect-error
      if (unsafeWindow[name]) {
        logger.Debug("Got variable: " + name)
        // @ts-expect-error
        return res(unsafeWindow[name])
      }
      setTimeout(async () => { res(await Fia.getVariable(name)) }, 10)
    })
  }

  public static async getElementsByClass(className: string): Promise<HTMLCollectionOf<HTMLElement>> {
    return new Promise(res => {
      const result = document.getElementsByClassName(className)
      if (result.length > 0) return res(result as HTMLCollectionOf<HTMLElement>)
      setTimeout(async () => { res(await Fia.getElementsByClass(className)) }, 10)
    })
  }

  public static async querySelector(selectors: string) {
    return new Promise(res => {
      const result = document.querySelector(selectors)
      if (result) return res(result)
      setTimeout(async () => { res(await Fia.querySelector(selectors)) }, 10)
    })
  }
}
