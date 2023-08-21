const {SlashCommandBuilder} = require("discord.js")
const {Client,Collection,Events} = require("discord.js");
const confirm = require("../confirmations");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Play ping-pong with the bot! (Used to confirm whether the bot is online)"),
    async execute(ctx) {
        let confirmationResult = confirm.hasAccess(ctx.guildId,0);
        if (!confirmationResult.value)
        {
            await ctx.reply({embeds:[confirm.noAccessEmbed.addFields({name:"Reason",value:confirmationResult.reason})]});
            return;
        }
        await ctx.reply("Pong!");

    }
}

