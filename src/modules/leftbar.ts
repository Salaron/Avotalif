import ContextMenu from "../components/contextMenu"
import { Base } from "./base"

export default class LeftMenu extends Base {
  protected static instance: LeftMenu
  public static getInstance() {
    if (!LeftMenu.instance) LeftMenu.instance = new LeftMenu()
    return LeftMenu.instance
  }

  public readonly name = "LeftMenu"
  private iconInterval: NodeJS.Timer | null = null

  public async init() {
    Avotalif.onInitDone(() => {
      this.iconInterval = setInterval(() => { this.updateOnlineIcon().catch(err => Avotalif.Logger.Error(err)) }, 10000)
      this.updateOnlineIcon()
    })
    const context = new ContextMenu("leftMenu", ".left_row")
    context.onClick(event => {
      event.preventDefault()
      const target: HTMLElement = event.currentTarget

      context.addElement("Переименовать", () => {
        const input = document.createElement("input")
        const orignalSpan = target.getElementsByClassName("inl_bl")[0]
        input.value = orignalSpan.textContent!
        input.classList.value = orignalSpan.classList.value + " form__field"
        $(orignalSpan).replaceWith(input)
      })
      context.addElement("Скрыть", () => {
        this.hideElement(target.parentElement!)
      })
      context.show(event)
    })

    $(".form__field").on("click", (event) => {
      event.preventDefault()
    })
    //
  }

  public onMutation() {
    const ad = document.getElementById("ads_left")
    if (ad) {
      Avotalif.Logger.Debug("Ad block removed")
      ad.remove()
    }
  }

  private hideElement(element: HTMLElement) {
    element.setAttribute("style", `display: none;`)
  }

  private async updateOnlineIcon() {
    const profile = document.getElementById("l_pr")
    if (profile) {
      const icon = profile.querySelector(".LeftMenu__icon")
      if (icon) {
        const res = await Avotalif.API.call("users.get", { fields: "online, last_online" })
        let color = "green"
        if (res.json.response[0].online === 0) color = "red"
        icon.setAttribute("style", `color: ${color}`)
      }
    }
  }
}