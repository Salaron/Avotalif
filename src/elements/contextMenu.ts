
export class ContextMenu {
  private targetSelector: string
  private temp: string = ""
  private id: string = "blabla" // TODO: generate random string
  constructor(targetSelector: string) {
    this.targetSelector = targetSelector
  }

  public onClose(callback: () => void) {
    // TODO
  }

  public onClick(callback: (event: JQuery.ContextMenuEvent<Document, undefined, any, any>) => void) {
    $(document).on("contextmenu", this.targetSelector, event => {
      event.preventDefault()
      callback(event)
    })
  }

  public addElement(label: string, clickAction?: string) {
    this.temp += `<li onclick="${clickAction ? clickAction : ""}">${label}</li>`
  }

  public show(event: JQuery.ContextMenuEvent) {
    // check if context menu already created?
    $(".av-context-menu").attr("id", this.id)
    $.when($(".av-context-menu").append(this.temp)).then(() => {
      this.temp = ""
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

window.addEventListener("load", event => {
  GM_addStyle(`
  .av-context-menu {
    display: none;
    z-index: 1000;
    position: absolute;
    overflow: hidden;
    border: 1px solid #CCC;
    white-space: nowrap;
    background: #FFF;
    color: #333;
    border-radius: 5px;
    padding: 0;
  }

  .av-context-menu li {
    padding: 8px 12px;
    cursor: pointer;
    list-style-type: none;
    transition: all .3s ease;
    user-select: none;
  }

  .av-context-menu li:hover {
    background-color: #DEF;
  }`)
  document.body.insertAdjacentHTML("afterbegin", `<div><ul class="av-context-menu"></ul></div>`)
})

$(document).on("mousedown keyup", event => {
  const contextMenuElement = $(".av-context-menu")
  const id = contextMenuElement.attr("id")
  if ($(event.target).parents(".av-context-menu").length === 0 && id !== "") {
    contextMenuElement.hide(100)
    contextMenuElement.empty()
    contextMenuElement.attr("id", "")
  }
})