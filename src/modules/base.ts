
export interface IRequest {
  url: string
  body: any
  callbacks: {
    timeout?(): void
    onDone?(...response: any[]): void
    onFail?(): void
  }
}

export interface IResponse {
  url: string
  reqBody: any
  response: any
}

export interface Base {
  /**
   * Получение объекта модуля. Один модуль должен иметь только один инстанс (singleton)
   */
  getInstance(): Base

  /**
   * Вызывается перед выполнением POST запроса.
   * Запрос не будет выполнен, если вернуть false
   * @param req
   * @returns boolean
   */
  onRequest?(req: IRequest): boolean

  /**
   * TODO
   * @param res
   */
  onResponse?(res: IResponse): void

  onLpEvent?(events: any[]): void
  onMutation?(mutations: MutationRecord[]): void
  onModule?(name: string): void
}

export abstract class Base {
  /**
   * Имя модуля, используется для вывода информации в консоли
   */
  public readonly abstract name: string

  /**
   * Метод, в котором производится инициализация модуля
   */
  public abstract init(): Promise<void>

  protected static instance: Base
}