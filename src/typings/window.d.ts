import Avotalif from "../Avotalif"
import { INotifier } from "./notifier"

interface IAjax {

}

interface IVK {
  /**
   * current user ID
   */
  id: number
}

interface ICur {
  module?: string

  // profile
  owner?: {
    id: number
    name: string
    photo: string
  }

  // im
  peer?: number
  gid?: number
}

interface ICurNotifier {
  idle_manager: {
    is_idle: boolean
    started: boolean
  }
}

declare global {
  const Avotalif: Avotalif
  interface Window {
    Notifier: INotifier
    ajax: IAjax
    cur: ICur
    curNotifier: ICurNotifier
    vk: IVK

    /**
     * Merge two objects
     * @param a first object
     * @param b second object
     */
    extend<T, U>(a: T, b: U): T & U

    /**
     * Get localized string
     * @param key string key
     */
    getLang(key: string): string

    /**
     * todo
     * @param args todo
     */
    getShortDateOrTime(...args: any[]): string

    /**
     * Prepare html template
     */
    getTemplate(key: string, args: unknown): string

    /**
     * Avotalif instance
     */
    Avotalif: Avotalif
  }
}

