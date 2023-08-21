const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const request = require('request');
const httpModule = require("../getHttpPlayers.js");
const confirm = require("../confirmations");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("track")
        .setDescription("Follows the position of a player for aprox 60s on Ecoredux (Variable, may last longer)")
        .addStringOption((option) => option.setName('player-name').setDescription('The name of the player').setRequired(false)),
    async execute(ctx) {
        console.log("RUNNING TRACK")
        await ctx.deferReply();
        let confirmationResult = confirm.hasAccess(ctx.guildId,1);
        if (!confirmationResult.value)
        {
            ctx.editReply({embeds:[confirm.noAccessEmbed.addFields({name:"Reason",value:confirmationResult.reason})]});
            return;
        }
        console.log(confirm.useCommand(ctx.guildId,2));
        for (let i = 0; i < 60; i++)
        {
            await httpModule.getPlayersArray().then(async (players) => {

                let embed = new EmbedBuilder();
                let found = false;
                for (let increment = 0; increment < players.length; increment++) {
                    if (players[increment].name == ctx.options.getString("player-name")) {
                        found = true;
                        embed = new EmbedBuilder()
                            .setColor("#00ff00")
                            .setDescription(`(${i}) Following ${players[increment].name}. They are at (${players[increment].position.x}, ${players[increment].position.z})`)
                            .setTitle("FOLLOWING " + players[increment].name)
                    }
                }

                if (!found) {
                    embed = new EmbedBuilder()
                        .setColor("#ff0000")
                        .setDescription(`Is this player online? You may have entered their username wrong, or the Bluemap may be down...`)
                        .setTitle("UNABLE TO FIND " + ctx.options.getString("player-name"))
                }



                ctx.editReply({embeds: [embed]})
                await new Promise(resolve => setTimeout(resolve, 1000));
            })
        }

        const embed2 = new EmbedBuilder()
            .setColor("#9f6bc5")
            .setDescription(`This player has now been tracked for a total of 60 seconds...`)
            .setTitle("FINISHED TRACKING " + ctx.options.getString("player-name"))

        ctx.editReply({embeds:[embed2]})
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