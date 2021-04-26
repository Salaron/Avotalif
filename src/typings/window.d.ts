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
  /**
   * Current page/module
   */
  module: string
}

interface ICurNotifier {
  idle_manager: {
    is_idle: boolean
    started: boolean
  }
}

declare global {
  const Notifier: INotifier
  const ajax: IAjax
  const curNotifier: ICurNotifier
  const cur: ICur
  
  interface Window {
    vk: IVK

    Avotalif: {
      changeDNTForChat: (peerID: number) => void
      changeDNRForChat: (peerID: number) => void
    }
  }
}

