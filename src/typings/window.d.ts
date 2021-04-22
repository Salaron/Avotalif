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
}