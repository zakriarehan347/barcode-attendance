const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('attendanceAPI', {
  getAttendance: () => ipcRenderer.invoke('get-attendance'),
  setAttendance: (attendance) => ipcRenderer.invoke('set-attendance', attendance),
  getAttendees: () => ipcRenderer.invoke('get-attendees'),
  setAttendees: (attendees) => ipcRenderer.invoke('set-attendees', attendees)
}); 