// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  file_sync: () => ipcRenderer.send('files-sync'),
  search: (text: string) => ipcRenderer.send('search', text),
  search_response: (callback: any) => ipcRenderer.on('search-response', (e, data) => callback(data)),
  files_download: (keys: string[]) => ipcRenderer.send('files-download', keys)
})