const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
client.config = config;
client.on('messageDelete', async message => {
    var embed = new Discord.MessageEmbed().setColor(`${config.embedColor}`).setAuthor('Message Deleted', message.guild.iconURL).addField('User', message.author.tag).addField('Message', message.content).addField('Channel', message.channel).setTimestamp()
    if (message.author == client.user.id) return;
    else client.channels.cache.get(config.channelLogs).send(embed);
});
client.on("messageUpdate", function(oldMessage, newMessage) {
    var embed = new Discord.MessageEmbed().setColor(`${config.embedColor}`).setAuthor(`Message Edited`).setDescription(`**User:** \n${oldMessage.author.tag}\n\n**Old Message:** \n${oldMessage.content}\n\n**New Message:** \n${newMessage.content}`).addField('Channel', `${oldMessage.channel}`).setTimestamp()
    if (oldMessage.author == client.user.id) return;
    else client.channels.cache.get(config.channelLogs).send(embed);
});
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Attempting to load event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

client.login(config.token);