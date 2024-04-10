export interface IElectronAPI {
    file_sync: () => Promise<void>,
    search: (text: {study_date?: string, modality?: string, patient_id?: string, patient_name?: string}) => Promisse<void>,
    search_response: (callback: any) => Promise<void>,
    files_download: (keys: string[]) => Promise<void>
  }
  
  declare global {
    interface Window {
      electronAPI: IElectronAPI
    }
  }