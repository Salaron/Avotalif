export const enum LEVEL {
  NONE,
  ERROR,
  WARN,
  INFO,
  DEBUG,
  VERBOSE,
}

type Message = number | string | boolean | symbol | null | undefined | Error | object

// colors[LEVEL].
const colors: { [k in LEVEL]: {bgColor: string, fgColor: string } } = {
  [LEVEL.NONE]: {
    bgColor: "",
    fgColor: ""
  },
  [LEVEL.ERROR]: {
    bgColor: "#ff00ff",
    fgColor: "#000000"
  },
  [LEVEL.WARN]: {
    bgColor: "#FFFF00",
    fgColor: "#000000"
  },
  [LEVEL.INFO]: {
    bgColor: "#FFFFFF",
    fgColor: "#000000"
  },
  [LEVEL.DEBUG]: {
    bgColor: "#00ffff",
    fgColor: "#000000"
  },
  [LEVEL.VERBOSE]: {
    bgColor: "",
    fgColor: ""
  }
}

// TODO: use console.warn console.error etc.
export class Logger {
  private label: string
  private logLevel: LEVEL

  constructor(label: string, level?: LEVEL) {
    this.label = label
    this.logLevel = typeof level === "number" ? level : LEVEL.INFO
  }

  public Error(message: Message, label?: string) {
    this.print(label || this.label, message, LEVEL.ERROR)
  }

  public Warn(message: Message, label?: string) {
    this.print(label || this.label, message, LEVEL.WARN)
  }

  public Info(message: Message, label?: string) {
    this.print(label || this.label, message, LEVEL.INFO)
  }

  public Debug(message: Message, label?: string) {
    this.print(label || this.label, message, LEVEL.DEBUG)
  }

  public Verbose(message: Message, label?: string) {
    this.print(label || this.label, message, LEVEL.VERBOSE)
  }

  private print(label: string, message: Message, level: LEVEL) {
    if (level <= this.logLevel) {
      // tslint:disable-next-line:no-console
      console.log(`%c${label}`, `background: ${colors[level].bgColor}; color: ${colors[level].fgColor}; padding: 3px;`, message)
    }
  }
}