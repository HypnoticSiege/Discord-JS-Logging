const Discord = require("discord.js");
const config = require("../config.json")
module.exports = (client, role) => {
    const log = client.channels.cache.get(config.serverLogs);
    if (!log || !channel.guild) return

    const embed = new Discord.MessageEmbed()
        .setColor(`${config.embedColor}`)
        .setAuthor('A Role was Deleted!')
        .addField(`Role Name:`, `${role.name}`)
        .addField(`Role ID:`, `${role.id}`)

    .setTimestamp()
    log.send(embed)
}