import path from 'path';
import {app, BrowserWindow} from 'electron';
const config = require('../../config/config.json')
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

ipcMain.on('getBotInfo', (event, args) => {
  window.webContents.send('getBotInfo', getBotInfo())
})

function getBotInfo() {
  let botInfo = {
    avatar: bot.user.avatarURL(),
    username: bot.user.username,
    status:  bot.user.presence.activities[0].name
  }
  return botInfo;
}

ipcMain.on('fetchServerlist', (event, args) => {
  let serverlist = []
  const servers = bot.guilds.cache;
  servers.map(srv => {
      let server = {
        id: srv.id,
        name: srv.name,
        icon: srv.iconURL()
      }
      serverlist.push(server)
    });
  window.webContents.send( 'serverlist', serverlist);
})

ipcMain.on('fetchChannellist', (event, args) => {
  const currentServer = bot.guilds.cache.find(srv => srv.id === args);
  const serverName = currentServer.name
  let channellist = []
  currentServer.channels.cache.map(channel => {
      if (channel.type == 'text') {
        let textchannel = {
          id: channel.id,
          name: channel.name
        }
        channellist.push(textchannel);
      }
  });
  window.webContents.send('fetchChannellist', [channellist, serverName])
})

ipcMain.on('changeStatus', (event, args) => {
  bot.user.setActivity(args, {type: "PLAYING"})
  window.webContents.send('getBotInfo', getBotInfo())
})


bot.login(config.token);
