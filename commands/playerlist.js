const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const request = require('request');
const httpModule = require("../getHttpPlayers.js")
const confirm = require("../confirmations");

module.exports = {
    data: new SlashCommandBuilder()

        .setName("players")
        .setDescription("Lists all of the players connected to Ecoredux"),
    async execute(ctx) {
        await ctx.deferReply();
        let confirmationResult = confirm.hasAccess(ctx.guildId,0);
        if (!confirmationResult.value)
        {
            await ctx.editReply({embeds:[confirm.noAccessEmbed.addFields({name:"Reason",value:confirmationResult.reason})]});
            return;
        }
        console.log(confirm.useCommand(ctx.guildId,0));
        console.log("RUNNING PLAYERS COMMAND")
        await httpModule.getPlayersString().then((message)=>{
            console.log(message);

            console.log("------------------------------------------");
            let embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("PLAYERS")
                .setDescription(message)

            ctx.editReply({embeds:[embed]});
        })
    }
}







