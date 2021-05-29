import path from 'path';
import {app, BrowserWindow} from 'electron';
import { listeners } from 'cluster';
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
    username: bot.user.username
  }
  let status = bot.user.presence.activities[0].name
  return [botInfo, status];
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

let currentServer
ipcMain.on('fetchChannellist', (event, args) => {
  currentServer = bot.guilds.cache.find(srv => srv.id === args);
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

// nagitgo0 ko
let currentChannel
ipcMain.on('changeChannel', (event, args) => {
  currentChannel = currentServer.channels.cache.find(ch => ch.id === args);
  window.webContents.send('changeChannel', currentChannel)
})


bot.on('message', msg => {
  if (msg.channel != currentChannel ) return
  let message = {
    id: msg.id,
    nonce: msg.nonce,
    content: msg.content,
    author: {
      ...msg.author,
      avatar: msg.author.avatarURL()
    },
    member: {
      ...msg.member,
      displayHex: msg.member.displayHexColor
    },
    guild: msg.guild,
    timestamp: msg.createdTimestamp
  }
  window.webContents.send('incomingMessage', message)
})

ipcMain.on('changeStatus', (event, args) => {
  bot.user.setActivity(args, {type: "PLAYING"})
  window.webContents.send('getBotInfo', getBotInfo())
})


bot.login(config.token);
