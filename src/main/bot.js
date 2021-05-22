// const http = require('http');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    let serverlist = []
    const servers = bot.guilds.cache;
    servers.map(server => {
    serverlist.push(server.name)
    });
    const srvs = {
        "servers": serverlist
    }
    console.log(JSON.stringify(srvs))
});

bot.login('NDEzMzkyMzczMzI2ODA3MDYw.WoR3pg.uM9WvfEVa83omqgyZIHhFtIvJd8');


process.on('messsage', msg => {
  if(msg === 'fetchServerlist'){
    process.send(fetchServerlist())
  }
});



function fetchServerlist() {
    let serverlist = []
    const servers = bot.guilds.cache;
    servers.map(server => {
    serverlist.push(server.name)
    });
    const srvs = {
        "servers": serverlist
    }
    return JSON.stringify(srvs)
}



// const server = http.createServer();

// server.on('request', (request, response) => {
//   if (request.url === '/servers') {
//     response.on('end', ()=>{fetchServerList()});
//     response.write(fetchServerList().toString());
//     response.end();
//   } else {
//     response.end('Route not found')
//   }
// });
// server.listen(3000);
