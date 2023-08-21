const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const confirm = require("../confirmations");
const fileStream = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("notify")
        .addIntegerOption((option) => option.setName('priority').setDescription('The priority of the message. 0 = Low, 1 = Medium, 2 = High').setRequired(true).setMaxValue(2).setMinValue(0))
        .addStringOption((option)=>option.setName("message").setDescription("The message sent into the alerts channel").setRequired(true))
        .addStringOption((option)=>option.setName("title").setDescription("The extended title of the alert. Formatted like \'ALERT : \<Your title\>\'").setRequired(true))
        .setDescription("Creates an alert inside of the alerts channel"),
    async execute(ctx) {

        await ctx.deferReply();
        let confirmationResult = confirm.hasAccess(ctx.guildId,2);
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


        confirm.useCommand(ctx.guildId,6);

        let result = fileStream.readFileSync('serversaccess.json','utf-8');
        const servers = JSON.parse(result)
        for (let i = 0; i < servers.servers.length; i++) {
            if (servers.servers[i].guild == ctx.guildId)
            {
                let channel = ctx.guild.channels.cache.get(servers.servers[i].information.channels[0])
                if (channel == null)
                {
                    await ctx.editReply("Something went wrong :/. The bot is unable to find the announcements channel. Please redo the /server-setup command to fix this issue")
                    return;
                }

                console.log(servers.servers[i].information.channels[0])
                console.log(channel)

                let role = servers.servers[i].information.roles[ctx.options.getInteger("priority")]
                let dscRole = ctx.guild.roles.cache.get(role)
                let roleColour = dscRole.color
                if (dscRole == null)
                {
                    ctx.editReply("Something went wrong :/. The bot is unable to find the specified role. Please redo /server-setup")
                    return;
                }
                console.log(roleColour)
                let embed = new EmbedBuilder()
                    .setTitle("ALERT : " + ctx.options.getString("title"))
                    .setDescription(ctx.options.getString("message"))
                    .setColor(roleColour)
                    .setFooter({text:ctx.user.displayName,iconURL:`https://cdn.discordapp.com/avatars/${ctx.user.id}/${ctx.user.avatar}`})
                channel.send({content:"<@&" + dscRole.id + ">",embeds:[embed]})
                await ctx.editReply(`Alert sent! Please check ${channel}.`);
            }
        }
    }
}
