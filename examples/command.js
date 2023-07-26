const { PermissionFlagsBits, CommandInteraction, Client, EmbedBuilder } = require("discord.js");
const { player } = require("./../../index");


module.exports = {
    name: 'stop',
    description: 'stop the music',
    perm: PermissionFlagsBits.SendMessages,
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {*} extras 
     */
    async run(interaction, client, extras) {
       
    }
}