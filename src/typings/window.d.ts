import { INotifier } from "./notifier"

interface IAjax {

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

  interface Window {
    vk: {
      id: number
    }
    
    changeDNTForChat: (peerID: number) => void
    changeDNRForChat: (peerID: number) => void

    changeDNRState: (state: boolean) => void
    changeDNTState: (state: boolean) => void
  }
}

