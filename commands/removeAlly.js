const {SlashCommandBuilder, EmbedBuilder, Embed} = require("discord.js")
const confirm = require("../confirmations");
const fileStream = require("fs");
const {adminCheck} = require("../confirmations");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-ally")
        .setDescription("Removes an ally from the list")
        .addIntegerOption((option)=>option.setName("index").setDescription("Which ally from the list do you want to remove? (You can see their index in the /allys command)").setRequired(true)),
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
        confirm.useCommand(ctx.guildId,7);
        result = fileStream.readFileSync('serversaccess.json','utf-8');
        const servers = JSON.parse(result)
        console.log(servers.servers[confirmationResult.index].information.allys.length)
        if (ctx.options.getInteger("index") > servers.servers[confirmationResult.index].information.allys.length)
        {
            ctx.editReply("INDEX MUST BE A VALUE RANGING FROM 1 TO "+ ctx.options.getInteger("index"))
            return;
        }
        if (ctx.options.getInteger("index") <= 0)
        {
            ctx.editReply("INDEX MUST BE A VALUE RANGING FROM 1 TO "+ ctx.options.getInteger("index"))
            return;
        }
        let deletedElement = servers.servers[confirmationResult.index].information.allys.splice(ctx.options.getInteger("index")-1,1)

        let embed = new EmbedBuilder()
            .setTitle("Removed Ally")
            .setDescription("We're sad to see them go :(")
            .setColor("Blurple")
        fileStream.writeFileSync("serversaccess.json",JSON.stringify(servers));
        await ctx.editReply({embeds:[embed]})
    }
}