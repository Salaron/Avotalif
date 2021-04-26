interface ILongPool {
  push: (event: { [k: string]: any }[]) => void
  onData: (response: any) => void
}

interface IShowEventParams {
  title: string
  text: string
  // TODO: other
}

export interface INotifier {
  showEvent: (params: IShowEventParams) => {}
  getLpInstance: () => ILongPool
}