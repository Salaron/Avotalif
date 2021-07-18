
const avSettingsKey = "avotalif_settings"
// separate tokens storage from settings
const avTokenKey = "avotalif_tokens"

interface ISettingsStorage {
  disable_ad: boolean
  show_seconds_messages: boolean
  show_seconds_profile: boolean
}

let instance: Settings | null = null
export default class Settings {
  private storage: ISettingsStorage

  constructor() {
    if (instance !== null) throw new Error("Only one instance of Settings is allowed")
    // read settings from storage
    this.storage = GM_getValue<ISettingsStorage>(avSettingsKey, this.getDefault())
  }

  public static getInstance() {
    if (instance === null) instance = new Settings()
    return instance
  }

  public set<K extends keyof ISettingsStorage>(key: K, value: ISettingsStorage[K]) {
    this.storage[key] = value
    GM_setValue(avSettingsKey, this.storage)
  }

  public get<K extends keyof ISettingsStorage>(key: K): ISettingsStorage[K] {
    return this.storage[key]
  }

  public setDefault<K extends keyof ISettingsStorage>(key?: K) {
    const defaultSettings = this.getDefault()
    if (key) {
      // set default for specific key
      this.storage[key] = defaultSettings[key]
    } else {
      // reset all settings
      this.storage = defaultSettings
    }
    // save changes
    GM_setValue(avSettingsKey, this.storage)
  }

  private getDefault() {
    const def: ISettingsStorage = {
      disable_ad: false,
      show_seconds_messages: false,
      show_seconds_profile: false
    }
    return def
  }
}