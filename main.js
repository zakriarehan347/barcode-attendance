const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const store = new Store.default();

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 350,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// IPC handlers for attendance
ipcMain.handle('get-attendance', () => {
  return store.get('attendance', {});
});
ipcMain.handle('set-attendance', (event, attendance) => {
  store.set('attendance', attendance);
  return true;
});

// IPC handlers for attendee list
ipcMain.handle('get-attendees', () => {
  return store.get('attendees', []);
});
ipcMain.handle('set-attendees', (event, attendees) => {
  store.set('attendees', attendees);
  return true;
});