const { QueryType } = require("discord-player");
const { PermissionFlagsBits, CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, Interaction, EmbedBuilder } = require("discord.js");
const { bot, player } = require("./../../index");


module.exports = {
    name: 'play',
    description: 'Play a song',
    perm: PermissionFlagsBits.SendMessages,
    options: [
       
                {
                    name: 'query',
                    description: "song name, url, or playlist url",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                }
            
        
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Interaction} interaction 
     * @param {Client} client 
     * @param {*} extras 
     */
    async run(interaction, client, extras) {
        
        
        if(!interaction.member.voice.channel) return interaction.reply({content: 'You must be in a voice channel', ephemeral: true})

        await interaction.deferReply()
        const { options, member } = interaction;
        const vc = interaction.member.voice.channel;
     
        let url = options.getString('query');


                
          client.distube.play(vc, url, {
            textChannel: interaction.channel,
            member,
            member,
          }, interaction);

          client.distube.selfDeaf = false;



          return interaction.editReply({ content: "Request Received!", ephemeral: true})

        

       

    }
}