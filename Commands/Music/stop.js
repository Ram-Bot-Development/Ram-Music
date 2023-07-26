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
        let vc = extras.vc;
       const queue = await client.distube.getQueue(vc) || "Null";
                            if (queue === "Null") return interaction.reply("Nothings playing");

                            clearInterval(queue.currentInt);
                            await queue.stop(vc);
                            return interaction.reply("Stopped songs")
    }
}