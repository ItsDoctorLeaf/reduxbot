const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const confirm = require("../confirmations");
const fileStream = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop-alerts")
        .setDescription("Stops the alert system"),
    async execute(ctx) {
        await ctx.deferReply();
        let confirmationResult = confirm.hasAccess(ctx.guildId,2);
        if (!confirmationResult.value)
        {
            await ctx.reply({embeds:[confirm.noAccessEmbed.addFields({name:"Reason",value:confirmationResult.reason})]});
            return;
        }
        let admin = confirm.adminCheck(ctx);
        if (!admin.value)
        {
            ctx.editReply(admin.reason);
            return;
        }
        confirm.useCommand(ctx.guildId,-1);
        result = fileStream.readFileSync('serversaccess.json','utf-8');
        const servers = JSON.parse(result)
        servers.servers[confirmationResult.index].alert.running = false;
        fileStream.writeFileSync("serversaccess.json",JSON.stringify(servers));
        await ctx.editReply({embeds:[new EmbedBuilder().setTitle("ALERTS STOPPED").setColor("#ff0000").setDescription("The alerts system is no longer running, you will NOT be notified when people enter/exit territories!")]})
    }
}
