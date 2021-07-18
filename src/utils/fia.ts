export default class Fia {
  public static async getVariable<T>(name: string): Promise<T> {
    return new Promise(res => {
      // @ts-expect-error
      if (typeof unsafeWindow[name] !== "undefined") {
        Avotalif.Logger.Debug("Got variable: " + name)
        // @ts-expect-error
        return res(unsafeWindow[name])
      }
      setTimeout(async () => { res(await Fia.getVariable(name)) }, 50)
    })
  }

  public static async getElementById(name: string): Promise<HTMLElement> {
    return new Promise(res => {
      const result = document.getElementById(name)
      if (result != null) return res(result)
      setTimeout(async () => { res(await Fia.getElementById(name)) }, 50)
    })
  }

  public static async getElementsByClass(className: string): Promise<HTMLCollectionOf<HTMLElement>> {
    return new Promise(res => {
      const result = document.getElementsByClassName(className)
      if (result.length > 0) return res(result as HTMLCollectionOf<HTMLElement>)
      setTimeout(async () => { res(await Fia.getElementsByClass(className)) }, 50)
    })
  }

  public static async querySelector(selectors: string): Promise<HTMLElement> {
    return new Promise(res => {
      const result = document.querySelector(selectors)
      if (result) return res(result as HTMLElement)
      setTimeout(async () => { res(await Fia.querySelector(selectors)) }, 50)
    })
  }
}
