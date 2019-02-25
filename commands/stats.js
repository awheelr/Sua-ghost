const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
exports.run = (client, message, args) => {
    if (message.channel.type === "dm") return message.author.send("You can't use this command in DM.");
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`, {code: "asciidoc"});
};
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [""]
};

exports.help = {
    name: "stats",
    description: "",
    usage: "stats"
};
