export interface IElectronAPI {
    file_sync: () => Promise<void>,
    search: (text: string) => Promisse<void>
    search_response: (callback: any) => Promise<void>
  }
  
  declare global {
    interface Window {
      electronAPI: IElectronAPI
    }
  }