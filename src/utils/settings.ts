
const avSettingsKey = "avotalif_settings"
// separate tokens storage from settings
const avTokenKey = "avotalif_tokens"

interface ISettingsStorage {
  disable_ad: boolean
  show_seconds_messages: boolean
  show_seconds_profile: boolean
}

export default class Settings {
  private static instance: Settings
  public static getInstance() {
    if (!Settings.instance) Settings.instance = new Settings()
    return Settings.instance
  }

  private storage: ISettingsStorage
  constructor() {
    if (Settings.instance) throw new Error("Only one instance of Settings is allowed")
    // read settings from storage
    this.storage = GM_getValue<ISettingsStorage>(avSettingsKey, this.getDefault())
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