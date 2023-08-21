const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const request = require('request');
const httpModule = require("../getHttpPlayers.js");
const confirm = require("../confirmations");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("locate")
        .setDescription("Locates a certain player on Ecoredux")
        .addStringOption((option) => option.setName('player-name').setDescription('The name of the player').setRequired(true)),
    async execute(ctx) {
        console.log("RUNNING LOCATE")

        await ctx.deferReply();
        let confirmationResult = confirm.hasAccess(ctx.guildId,0);
        if (!confirmationResult.value)
        {
            await ctx.editReply({embeds:[confirm.noAccessEmbed.addFields({name:"Reason",value:confirmationResult.reason})]});
            return;
        }
        console.log(confirm.useCommand(ctx.guildId,1));
        await httpModule.getPlayersArray().then((players)=>{

            let embed = new EmbedBuilder();
            let found = false;
            for (let increment = 0; increment < players.length; increment++)
            {
                if (players[increment].name == ctx.options.getString("player-name"))
                {
                    found = true;
                    embed = new EmbedBuilder()
                        .setColor("#00ff00")
                        .setDescription(`Found ${players[increment].name} at (${players[increment].position.x}, ${players[increment].position.z})`)
                        .setTitle("FOUND " + players[increment].name)
                }
            }

            if (!found)
            {
                embed = new EmbedBuilder()
                    .setColor("#ff0000")
                    .setDescription(`Is this player online? You may have entered their username wrong, or the Bluemap may be down...`)
                    .setTitle("UNABLE TO FIND " + ctx.options.getString("player-name"))
            }

            ctx.editReply({embeds:[embed]})
        })

    }
}
/*
            let found = false;
            let embed = new EmbedBuilder();

            ctx.editReply({embeds:[embed]})
for (let increment = 0; increment < players.length; increment++)
            {
                console.log(players[increment])
                if (players[increment].name == ctx.options.getString("player-name"))
                {
                    found = true;
                    embed = new EmbedBuilder()
                        .setColor("#00ff00")
                        .setDescription(`Found ${players[increment].name} at (${players[increment].position.x}, ${players[increment].position.z})`)
                        .setTitle("FOUND " + players[increment].name)
                }
            }
            if (!found)
            {
                embed = new EmbedBuilder()
                    .setColor("#ff0000")
                    .setDescription(`Is this player online? You may have entered their username wrong, or the Bluemap may be down...`)
                    .setTitle("UNABLE TO FIND " + ctx.options.getString("player-name"))
            }
 */