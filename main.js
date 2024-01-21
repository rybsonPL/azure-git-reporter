const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

function onReady() {
  win = new BrowserWindow({
    width: 900,
    height: 860,
    minWidth: 375,
    minHeight: 500,
    maxWidth: 900,
    maxHeight: 860,
    maximizable: false,
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/azure-git-reporter/browser/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  win.webContents.openDevTools();
}

app.on('ready', onReady);
