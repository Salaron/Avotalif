import Fia from "../utils/fia"

export default class ContextMenu {
  private targetSelector: string
  private temp: string = ""
  private handlers: (() => void)[] = []
  private id: string = ""
  constructor(name: string, targetSelector: string) {
    this.targetSelector = targetSelector
    this.id = name
  }

  public onClose(callback: () => void) {
    // TODO
  }

  public onClick(callback: (event: JQuery.ContextMenuEvent<Document, undefined, any, any>) => void) {
    $(document).on("contextmenu", this.targetSelector, callback)
  }

  public addElement(label: string, clickAction?: () => void) {
    // tslint:disable-next-line
    if (!clickAction) clickAction = () => { }
    this.handlers.push(clickAction)
    this.temp += `<li id='${this.id}_${this.handlers.length - 1}'>${label}</li>`
  }

  public show(event: JQuery.ContextMenuEvent) {
    // check if context menu already created?
    const contextMenuElement = $(".av-context-menu")
    contextMenuElement.attr("id", this.id)
    contextMenuElement.empty()
    $.when(contextMenuElement.append(this.temp)).then(() => {
      for (let i = 0; i < this.handlers.length; i++) {
        document.getElementById(`${this.id}_${i}`)!.onclick = this.handlers[i]
      }
      this.temp = ""
      this.handlers = []
      let top = event.pageY
      if (event.pageY > window.innerHeight / 2)
        top = event.pageY - $(".av-context-menu").height()! - 13
      $(".av-context-menu").finish().toggle(100).css({
        top: top + "px",
        left: event.pageX + "px"
      })
    })
  }
}

(async () => {
  await Fia.getVariable("Avotalif")
  Avotalif.onInitDone(() => {
    document.body.insertAdjacentHTML("afterbegin", `<div><ul class="av-context-menu"></ul></div>`)
  })

  $(document).on("mousedown keyup", event => {
    const contextMenuElement = $(".av-context-menu")
    const id = contextMenuElement.attr("id")
    if (contextMenuElement.css("display") === "block") {
      contextMenuElement.hide(100)
      contextMenuElement.attr("id", "")
    }
    if ($(event.target).parents(".av-context-menu").length !== 0) {
      // передача click ивента элементу контекстного меню вручную
      // т.к. при скрытии он не передаётся
      // колхоз ¯\_(ツ)_/¯
      // @ts-expect-error
      event.target.click()
    }
  })
})()
