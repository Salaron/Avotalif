// tslint:disable:no-console
export const enum LEVEL {
  NONE,
  ERROR,
  WARN,
  INFO,
  DEBUG,
  VERBOSE,
}

type Message = number | string | boolean | symbol | null | undefined | Error | object

// colors[LEVEL]
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

export class Logger {
  private label: string
  private logLevel: LEVEL

  constructor(label: string, level?: LEVEL) {
    this.label = label
    this.logLevel = typeof level === "number" ? level : LEVEL.INFO
  }

  public Error(message: Message, label: string = this.label) {
    if (LEVEL.ERROR <= this.logLevel) {
      console.error(`%c${label}`, this.getStyle(LEVEL.ERROR), message)
    }
  }

  public Warn(message: Message, label: string = this.label) {
    if (LEVEL.WARN <= this.logLevel) {
      console.warn(`%c${label}`, this.getStyle(LEVEL.WARN), message)
    }
  }

  public Info(message: Message, label: string = this.label) {
    if (LEVEL.INFO <= this.logLevel) {
      console.info(`%c${label}`, this.getStyle(LEVEL.INFO), message)
    }
  }

  public Debug(message: Message, label: string = this.label) {
    if (LEVEL.DEBUG <= this.logLevel) {
      console.debug(`%c${label}`, this.getStyle(LEVEL.DEBUG), message)
    }
  }

  public Verbose(message: Message, label: string = this.label) {
    if (LEVEL.VERBOSE <= this.logLevel) {
      console.log(`%c${label}`, this.getStyle(LEVEL.VERBOSE), message)
    }
  }

  private getStyle(level: LEVEL) {
    return `background: ${colors[level].bgColor}; color: ${colors[level].fgColor}; padding: 3px;`
  }
}