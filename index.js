const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const express = require("express");
const app = express();
const http = require("http");
client.config = config;

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });

client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Attempting to load command ${commandName}`);
      client.commands.set(commandName, props);
    });
  });

client.on("message", async message => {
    var guild = client.guilds.get(config.guildid);
    var userid = message.author.id;

    if (config.supportsystem === "false") return;

    if (message.channel.type === "dm") {
        if (message.content.startsWith(config.prefix)) return;
        if (message.author.id === config.botid) return;

        let channel = guild.channels.find(channel => channel.name === userid);
        if (channel) {
            channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    fields: [{
                        name: `${message.author.id}`,
                        value: `${message.content}`
                    }],
                    timestamp: new Date(),
                    footer: {
                        text: "Ticket"
                    }
                }
            });
        } else {
            let category = client.channels.find(ch => ch.name === "tickets");
            guild
                .createChannel(userid)
                .then(channel => channel.setParent(category))
                .then(channel =>
                    channel.send({
                        embed: {
                            color: 3447003,
                            author: {
                                name: message.author.username,
                                icon_url: message.author.avatarURL
                            },
                            fields: [{
                                name: `${message.author.id}`,
                                value: `${message.content}`
                            }],
                            timestamp: new Date(),
                            footer: {
                                text: "Ticket"
                            }
                        }
                    })
                )
                .then(m => {
                    m.channel.overwritePermissions(guild.defaultRole.id, {
                        VIEW_CHANNEL: false
                    });

                    m.channel.overwritePermissions(config.supportid, {
                        VIEW_CHANNEL: true
                    });
                });
            message.author.send(`**Message sent!** Your ticket has been created!`);
        }
    }
});


client.on("warn", err => client.logger.error(err));

client.on("warn", warn => client.logger.warn(warn));

process.on("uncaughtException", (err) => {
  console.log(err);
});
process.on("unhandledRejection", (err) => {
  console.log(err);
});

client.login(process.env.TOKEN);
