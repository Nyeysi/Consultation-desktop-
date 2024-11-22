// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getDataFromFirestore, getProfFromFirestore, auth, 
     getRfidFromFirestore, addEventToDatabase } = require('./main/firebase');
const fs = require('fs');

// Global references
let mainWindow = null;

try {
    require('electron-reloader')(module);
} catch {}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false
        },
        autoHideMenuBar: true
    });

    mainWindow.loadFile('renderer/assets/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// App lifecycle handlers
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Handlers


ipcMain.handle('get-prof', async () => {
    try {
        const data = await getProfFromFirestore();
        console.log('Prof data sent to renderer:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching prof data:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('scan-rfid', async () => {
    try {
        const rfidData = await getRfidFromFirestore();
        console.log('RFID data received:', rfidData);
        return { success: true, rfidData };
    } catch (error) {
        console.error('Error fetching RFID data:', error);
        return { success: false, error: error.message };
    }
});


// add the appointment to the database
ipcMain.handle('consultation-form', async (event, eventDetails) => {
    try {
        await addEventToDatabase(eventDetails);
        return { success: true };
    } catch (error) {
        console.error('Error adding event to database:', error);
        return { success: false, error: error.message };
    }
});