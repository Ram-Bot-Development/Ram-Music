const { PermissionFlagsBits, CommandInteraction, Client, EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { player } = require("./../../index");



module.exports = {
    name: 'volume',
    description: 'change the volume',
    perm: PermissionFlagsBits.SendMessages,
    options: [
        {
            name: 'percent',
            type: ApplicationCommandOptionType.Number,
            required: true,
            description: "percent 1 - 100"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {*} extras 
     */
    async run(interaction, client, extras) {
       let queue = await client.distube.getQueue(interaction.member.voice.channel) || "Null";
       if(queue == "Null") return interaction.reply({content: "Nothing is playing", ephemeral: true});

       const volume = interaction.options.getNumber('percent') || 0;

       if(volume > 100 || volume < 1) return interaction.reply({content: "Please pick a percent between 1 and 100", ephemeral: true});

       client.distube.setVolume(interaction.member.voice.channel, volume);
       let volumeEmbed = new EmbedBuilder().setColor("DarkVividPink").setTitle("Volume Changed!").setDescription(`Volume Changed To ${volume}`).setFooter({text: `Requested By: ${interaction.user.username}`, iconURL: interaction.user.avatarURL({dynamic: true})}).setTimestamp();

       return interaction.reply({embeds: [volumeEmbed]})
    }
}