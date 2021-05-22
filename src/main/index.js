import path from 'path';
import {app, BrowserWindow} from 'electron';
const { ipcMain, webContents } = require('electron')
const Discord = require('discord.js');
const bot = new Discord.Client();

const entryUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/index.html'
  : `file://${path.join(__dirname, 'index.html')}`;

let window = null;

app.on('ready', () => {
  window = new BrowserWindow({minWidth: 900, minHeight: 600, backgroundColor: '#202225', frame: false, webPreferences: { nodeIntegration: true, webSecurity: false }});
  window.loadURL(entryUrl);
  window.on('closed', () => window = null);

});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity('Sussus Amogus', {type: "PLAYING"});
  
});

ipcMain.on('fetchServerlist', (event, args) => {
  let serverlist = []
  const servers = bot.guilds.cache;
  servers.map(server => {
    serverlist.push(server.name)
  });
  window.webContents.send( 'serverlist', serverlist);
  console.log('sent');
})

bot.login('');



// ipcMain.on('fetchServerlist', (event, args)=>{
//   let serverlist = []
//   const servers = bot.guilds.cache;
//   servers.map(server => {
//   serverlist.push(server.name)
//   });
//   event.sender.send('fetchServerlist', serverlist)
// })



