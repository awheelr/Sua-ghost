const config = require("../config.json");
const Logger = require("../core/Logger.js");
module.exports = client => {
    Logger.success("Discord", `Ready, Logged in as ${client.user.username}
    `);
    client.user.setStatus(config.botStatus);
    client.user.setPresence({
        game: {
            name: config.botActivityMessage,
            type: config.botActivityType,
            url: config.twithlink
        }
    });
    if (client.user.setPresence) {
        Logger.success("Discord", `botStatus: ${config.botStatus}`);
        Logger.success("Discord", `botActivityMessage: ${config.botActivityMessage}`);
        Logger.success("Discord", `botActivityType: ${config.botActivityType}`);
        Logger.success("Discord", `twithlink: ${config.twithlink}`);
    }
};
