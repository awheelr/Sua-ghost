const config = require("../config.json");
const Logger = require("../core/Logger.js");
module.exports = client => {
    Logger.success("Discord", `Ready, Logged in as ${client.user.username}
    `);
    client.user.setStatus(config.status);
    client.user.setPresence({
        game: {
            name: config.gamename,
            type: config.gametype,
            url: config.gameurl
        }
    });
    if (client.user.setPresence) {
        Logger.success("Discord", `\n\n\nstatus set to: ${config.status}`);
        Logger.success("Discord", `\n\n\ngame name set to: ${config.gamename}`);
        Logger.success("Discord", `\n\n\ngame type set to: ${config.gametype}`);
        Logger.success("Discord", `\n\n\ngame url set to: ${config.gameurl}`);
    }
};
