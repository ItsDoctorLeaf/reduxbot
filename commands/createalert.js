const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const confirm = require("../confirmations");
const fileStream = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create-alert")
        .setDescription("Use this command to add a person into your alerts list")
        .addStringOption((option)=>option.setName("username").setDescription("The minecraft username of the player").setRequired(true))
        .addStringOption((option)=>option.setName("position").setDescription("The ingame position where the alert with measure from").setRequired(true))
        .addIntegerOption((option)=>option.setName("range").setDescription("The distance from the alert position to trigger").setMaxValue(2000).setMinValue(10).setRequired(true))
        .addIntegerOption((option)=>option.setName("priority").setDescription("The priority of the alerts").setMaxValue(2).setMinValue(0).setRequired(true))

    ,

    async execute(ctx) {
        await ctx.deferReply();
        let confirmationResult = confirm.hasAccess(ctx.guildId,2);
        let serverAddress = confirmationResult.index;
        if (!confirmationResult.value)
        {
            await ctx.editReply({embeds:[confirm.noAccessEmbed.addFields({name:"Reason",value:confirmationResult.reason})]});
            return;
        }
        let admin = confirm.adminCheck(ctx);
        if (!admin.value)
        {
            await ctx.editReply(admin.reason);
            return;
        }
        confirm.useCommand(ctx.guildId,4);
        result = fileStream.readFileSync('serversaccess.json','utf-8');
        const servers = JSON.parse(result)
        let jsonObject = {username:"",alertPosition:[0,0],alertRange:0,priority:0}
        jsonObject.username = ctx.options.getString("username")
        let positionString = ctx.options.getString("position");
        positionString = positionString.replaceAll("(","");
        positionString = positionString.replaceAll(")","");
        console.log(positionString.split(',')[0].replaceAll(',',null))
        jsonObject.alertPosition[0] = parseInt(positionString.split(',')[0].replaceAll(',',null))
        jsonObject.alertPosition[1] = parseInt(positionString.split(',')[1])
        jsonObject.alertRange = ctx.options.getInteger("range")
        jsonObject.priority = ctx.options.getInteger("priority")
        servers.servers[serverAddress].information.alerts.push(jsonObject)
        fileStream.writeFileSync("serversaccess.json",JSON.stringify(servers));

        let role = servers.servers[serverAddress].information.roles[ctx.options.getInteger("priority")]
        let dscRole = ctx.guild.roles.cache.get(role)
        let roleColour = dscRole.color

        let embed = new EmbedBuilder()
            .setTitle("Alert created!")
            .setColor(roleColour)
            .setDescription("Created an alert for **" + jsonObject.username + "** at the position of " + ctx.options.getString("position") + ".\n If they come within the range of " + jsonObject.alertRange + " blocks, it will alert @" + dscRole.name)
        await ctx.editReply({embeds:[embed]})
    }
}
