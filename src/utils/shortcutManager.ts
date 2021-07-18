
export enum Keys {
  // skip first
  "Nothing" = 0,
  // keys
  "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",
  "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ",
  "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM",
  // digits
  "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7",
  "Digit8", "Digit9",
  // special keys
  // alt key not included because sometimes keyup
  // event not fired
  "ControlLeft", "ControlRight", "Backspace", "BracketLeft", "BracketRight",
  "Semicolon", "Quote", "Comma", "Period", "Slash"
}

export default class ShortcutManager {
  // Map[module, Map([shortcut, action])]
  private registeredShortcuts: Map<string, Map<string, () => void>> = new Map<string, Map<string, () => void>>()
  private pressedButtons: Keys[] = []

  constructor() {
    if (ShortcutManager.instance) throw new Error("Only one instance of Shortcut Manager is allowed")
    document.addEventListener("keyup", (event) => this.listenUp(event))
    document.addEventListener("keydown", (event) => this.listenDown(event))
  }

  private static instance: ShortcutManager
  public static getInstance() {
    if (!ShortcutManager.instance) ShortcutManager.instance = new ShortcutManager()
    return ShortcutManager.instance
  }

  /**
   * Registers shortcut for specified keys
   * @param module "*" means global
   * @param keys
   * @param callback
   */
  public register(module: string, keys: Keys[], callback: () => void) {
    keys = keys.sort()
    // Ctrl + A + B
    // keys = ["ctrl", "a", "b"]
    const shortVersion = keys.join("+").toLowerCase()
    if (
      this.registeredShortcuts.get("*")?.has(shortVersion) ||
      this.registeredShortcuts.get(module)?.has(shortVersion)
    ) throw new Error(`Shortcut for ${shortVersion} is already registered`)

    if (!this.registeredShortcuts.has(module)) {
      // register current module
      this.registeredShortcuts.set(module, new Map())
    }
    this.registeredShortcuts.get(module)?.set(shortVersion, callback)
  }

  public remove(module: string, keys: Keys[]): boolean {
    const shortVersion = keys.join("+")
    return this.registeredShortcuts.get(module)?.delete(shortVersion) ?? false
  }

  private listenUp(event: KeyboardEvent) {
    const keyCode = Keys[event.code as any] as unknown as Keys
    const possible = this.pressedButtons.sort()
    const short = possible.join("+")

    if (possible.length >= 2 && keyCode !== undefined) {
      // check for shortcuts here
      Avotalif.Logger.Verbose(`Current shortcut: ${short}`)
      const globalAction = this.registeredShortcuts.get("*")?.has(short)
      if (globalAction) {
        this.registeredShortcuts.get("*")?.get(short)!()
      } else {
        const moduleAction = this.registeredShortcuts.get(unsafeWindow.cur?.module || "")?.has(short)
        if (moduleAction) {
          this.registeredShortcuts.get(unsafeWindow.cur.module!)?.get(short)!()
        }
      }
    }

    this.pressedButtons = this.pressedButtons.filter(val => val !== keyCode)
    Avotalif.Logger.Verbose(`Released button ${event.key} (${event.code})`)
  }

  private listenDown(event: KeyboardEvent) {
    // extract key code from enum
    const keyCode = Keys[event.code as any] as unknown as Keys || undefined
    Avotalif.Logger.Verbose(`Pressed button ${event.key} (${event.code} ${keyCode})`)
    if (keyCode === undefined || this.pressedButtons.includes(keyCode)) return
    this.pressedButtons.push(keyCode)
  }
}