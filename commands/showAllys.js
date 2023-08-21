const {SlashCommandBuilder, EmbedBuilder, Embed} = require("discord.js")
const confirm = require("../confirmations");
const fileStream = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("allies")
        .setDescription("Lists all of our allys"),
    async execute(ctx) {
        await ctx.deferReply();
        let confirmationResult = confirm.hasAccess(ctx.guildId,2);
        if (!confirmationResult.value)
        {
            await ctx.reply({embeds:[confirm.noAccessEmbed.addFields({name:"Reason",value:confirmationResult.reason})]});
            return;
        }
        confirm.useCommand(ctx.guildId,7);
        result = fileStream.readFileSync('serversaccess.json','utf-8');
        const servers = JSON.parse(result)
        let embed = new EmbedBuilder()
            .setTitle("Allies")
            .setColor("Green")
        let allys = servers.servers[confirmationResult.index].information.allys;
        for (let i = 0; i < allys.length; i++)
        {
            embed.addFields({name:(i+1)+". "+allys[i].name + " [" + allys[i].leader + "]",value:"Location: " + allys[i].location + "\nRelationship: " + allys[i].relationship})
        }
        await ctx.editReply({embeds:[embed]})
    }
}
