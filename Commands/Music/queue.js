const { PermissionFlagsBits, CommandInteraction, Client, EmbedBuilder } = require("discord.js");
const { player } = require("./../../index");


module.exports = {
    name: 'queue',
    description: 'the queue',
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
        console.log(queue.songs)

       const queueString = queue.songs.slice(1, 11).map((song, i) => {
        return `『${i + 1}』 [${song.formattedDuration}] ${song.name} `
       }).join("\n\n") || "";

       

       const currentSong = queue.songs[0];

        await interaction.reply({
            embeds: [
                new EmbedBuilder().setDescription(queueString + " \n\n **Now Playing:** " + currentSong.name )
            ]
        })
    }
}