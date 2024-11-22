// This is the preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Authentication
   
    scanRFID: () => ipcRenderer.invoke('scan-rfid'),
    // Data fetching
  
    getProf: () => ipcRenderer.invoke('get-prof'),
    sendCommand: (command) => ipcRenderer.invoke('send-command', command),

    // Appointment handling
    saveConsultation: (event) => ipcRenderer.invoke('consultation-form', event),
  
});