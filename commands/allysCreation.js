const {SlashCommandBuilder, EmbedBuilder, Embed} = require("discord.js")
const confirm = require("../confirmations");
const fileStream = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create-ally")
        .setDescription("Creates an ally for the server")
        .addStringOption((option)=> option.setName("name").setDescription("The name of the nation/town/group").setRequired(true))
        .addStringOption((option)=> option.setName("leader").setDescription("The name of the leader of the community").setRequired(true))
        .addStringOption((option)=> option.setName("location").setDescription("The location of the place. You can format this however you want! (eg: EUROPE or (0,0)").setRequired(true))
        .addStringOption((option)=> option.setName("relationship").setDescription("How are you related to the community (eg: best buddies :) or buissness partners or worshipping").setRequired(true))
        .addStringOption((option)=> option.setName("link").setDescription("add a link to the discord server (MUST INCLUDE THE HTTPS:// AT THE BEGINNING)").setRequired(true))
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
        confirm.useCommand(ctx.guildId,7);
        result = fileStream.readFileSync('serversaccess.json','utf-8');
        const servers = JSON.parse(result)
        let allyObject = {name:ctx.options.getString("name"),leader:ctx.options.getString("leader"),location:ctx.options.getString("location"),relationship:ctx.options.getString("relationship"),link:ctx.options.getString("link")}
        servers.servers[serverAddress].information.allys.push(allyObject)
        fileStream.writeFileSync("serversaccess.json",JSON.stringify(servers));

        let embed = new EmbedBuilder()
            .setTitle("ADDED ALLY")
            .setDescription("**"+allyObject.name+"** are our "+allyObject.relationship+"\nRan by "+allyObject.leader+". They are located at/in "+allyObject.location)
            .setColor("#00ff00")
        await ctx.editReply({content:allyObject.link,embeds:[embed]})
    }
}
