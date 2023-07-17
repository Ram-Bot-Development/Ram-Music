const { PermissionFlagsBits, CommandInteraction, Client, EmbedBuilder } = require("discord.js");
const { player } = require("./../../index");
const { playing } = require("../../settings/config");


module.exports = {
    name: 'skip',
    description: 'Start a skip vote or skip the song',
    perm: PermissionFlagsBits.SendMessages,
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {*} extras 
     */
    async run(interaction, client, extras) {
        let queue = await client.distube.getQueue(interaction.member.voice.channel) || "Null";
        if (queue === "Null") return interaction.reply({content: "Nothings playing", ephemeral: true});

        if(extras.vc.members?.size < 3) { // if 2 or more members in the not including the bot it will  create a vote
          return  skiped(queue, interaction, await queue.songs[0], await queue.songs[1]);
        } else { 
           return skiped(queue, interaction, await queue.songs[0], await queue.songs[1]);

           
        }
        

      

    }
}

async function skiped(queue, interaction, lastSong, CurrentSong) {
console.log(`Song: ${await lastSong.name}`)
console.log(`CSONG: ${await CurrentSong.name}`)

    await queue
    .skip(interaction.member.voice.channel)
    .then(() => {

        return interaction.reply({ content: "Song Skipped!" });
    })
    .catch((err) => {
        return interaction.reply({
            content: ` There is no song next`,
            ephemeral: true,
        });
    });

   }