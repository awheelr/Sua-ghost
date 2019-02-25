const config = require("../config.json");
exports.run = (client, message) => {
  if (message.guild.id !== config.guildid) return message.channel.send("This is the wrong guild to be using this command.");
  
  if (config.supportsystem === "false") return message.channel.send("Support System is not enabled.");

  if (message.channel.type === "dm") return message.author.send("You can't use this command in DM.");

  let staffRole = message.guild.roles.find(role => role.name === "Staff");
  if (!staffRole) return message.channel.send("Staff Role doesn't exist in this guild.")
  if (!message.member.roles.has(staffRole.id)) return message.channel.send("You have invalid permissions.");

  message.channel.delete();
  client.channels.find(ch => ch.name === "logs").send({
    embed: {
      color: 3447003,
      author: {
        name: message.author.username,
        icon_url: message.author.avatarURL
      },
      fields: [{
        name: `Ticket Closed`,
        value: `ID: ${message.channel.id}`
      }],
      timestamp: new Date(),
      footer: {
        text: `Closed`
      }
    }
  });
  let id = message.channel.name;
  client.users.get(id).send(`**Your ticket has been closed.** If you need additional help, please message me again.`);
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["c"]
};

exports.help = {
  name: "close",
  description: "Close the ticket",
  usage: "close"
};
