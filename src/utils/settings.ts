
const avSettingsKey = "avotalif_settings"
// separate tokens storage from settings
const avTokenKey = "avotalif_tokens"

interface ISettingsStorage {
  ad: {

  }
  seconds: {
    messages: boolean
    profile: boolean
  }
  advanced_online_info: boolean
  hidden_dialogs: number[]
  dnr: {
    pm: boolean
    con: boolean
    groups: boolean
    exceptions: {
      [peerId: number]: boolean | undefined
    }
  }
  dnt: {
    pm: boolean
    con: boolean
    groups: boolean
    exceptions: {
      [peerId: number]: boolean | undefined
    }
  }
}

const defaultSettings: ISettingsStorage = {
  ad: {},
  seconds: {
    profile: false,
    messages: false
  },
  advanced_online_info: false,
  hidden_dialogs: [],
  dnr: {
    pm: false,
    con: false,
    groups: false,
    exceptions: {}
  },
  dnt: {
    pm: false,
    con: false,
    groups: false,
    exceptions: {}
  }
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
    // read settings from storage for current user
    // TODO: add type and fields checking
    this.storage = this.load(unsafeWindow.vk.id ?? 0)
  }

  // max depth is 3
  // idk how to make it better
  public set<K1 extends keyof ISettingsStorage>(key1: K1, value: ISettingsStorage[K1]): void
  public set<K1 extends keyof ISettingsStorage, K2 extends keyof ISettingsStorage[K1]>(key1: K1, key2: K2, value: ISettingsStorage[K1][K2]): void
  public set<K1 extends keyof ISettingsStorage, K2 extends keyof ISettingsStorage[K1], K3 extends keyof ISettingsStorage[K1][K2]>(key1: K1, key2: K2, key3: K3, value: ISettingsStorage[K1][K2][K3]): void
  public set<K1 extends keyof ISettingsStorage, K2 extends keyof ISettingsStorage[K1], K3 extends keyof ISettingsStorage[K1][K2]>(...args: [K1, ISettingsStorage[K1]] | [K1, K2, ISettingsStorage[K1][K2]] | [K1, K2, K3, ISettingsStorage[K1][K2][K3]]): void {
    if (args.length === 2) {
      this.storage[args[0]] = args[1]
    }
    if (args.length === 3) {
      this.storage[args[0]][args[1]] = args[2]
    }
    if (args.length === 4) {
      this.storage[args[0]][args[1]][args[2]] = args[3]
    }
    GM_setValue(`${avSettingsKey}_${unsafeWindow.vk.id}`, this.storage)
  }

  public get<K1 extends keyof ISettingsStorage>(key1: K1): ISettingsStorage[K1]
  public get<K1 extends keyof ISettingsStorage, K2 extends keyof ISettingsStorage[K1]>(key1: K1, key2: K2): ISettingsStorage[K1][K2]
  public get<K1 extends keyof ISettingsStorage, K2 extends keyof ISettingsStorage[K1], K3 extends keyof ISettingsStorage[K1][K2]>(key1: K1, key2: K2, key3: K3): ISettingsStorage[K1][K2][K3]
  public get<K1 extends keyof ISettingsStorage, K2 extends keyof ISettingsStorage[K1], K3 extends keyof ISettingsStorage[K1][K2]>(...args: [K1] | [K1, K2] | [K1, K2, K3]): ISettingsStorage[K1] | ISettingsStorage[K1][K2] | ISettingsStorage[K1][K2][K3] | undefined {
    if (args.length === 1) {
      return this.storage[args[0]]
    }
    if (args.length === 2) {
      return this.storage[args[0]][args[1]]
    }
    if (args.length === 3) {
      return this.storage[args[0]][args[1]][args[2]]
    }
  }

  public setDefault<K1 extends keyof ISettingsStorage>(key1: K1): void
  public setDefault<K1 extends keyof ISettingsStorage, K2 extends keyof ISettingsStorage[K1]>(key1: K1, key2: K2): void
  public setDefault<K1 extends keyof ISettingsStorage, K2 extends keyof ISettingsStorage[K1], K3 extends keyof ISettingsStorage[K1][K2]>(key1: K1, key2: K2, key3: K3): void
  public setDefault<K1 extends keyof ISettingsStorage, K2 extends keyof ISettingsStorage[K1], K3 extends keyof ISettingsStorage[K1][K2]>(...args: [K1] | [K1, K2] | [K1, K2, K3]): void {
    const def = this.getDefault()
    if (args.length > 0) {
      // set default for specific key
      if (args.length === 1) {
        this.storage[args[0]] = def[args[0]]
      }
      if (args.length === 2) {
        this.storage[args[0]][args[1]] = def[args[0]][args[1]]
      }
      if (args.length === 3) {
        this.storage[args[0]][args[1]][args[2]] = def[args[0]][args[1]][args[2]]
      }
    } else {
      // reset all settings
      this.storage = def
    }
    this.save()
  }

  private load(userId: number) {
    return GM_getValue<ISettingsStorage>(`${avSettingsKey}_${userId}`, this.getDefault())
  }

  private save() {
    if (!unsafeWindow.vk || !unsafeWindow.vk.id) return
    GM_setValue(`${avSettingsKey}_${unsafeWindow.vk.id}`, this.storage)
  }

  private getDefault() {
    return defaultSettings
  }
}