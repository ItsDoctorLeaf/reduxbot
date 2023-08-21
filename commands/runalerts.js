const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const confirm = require("../confirmations");
const fileStream = require("fs");
const httpModule = require("../getHttpPlayers.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("begin-alerts")
        .setDescription("Starts alerts (UPDATES EVERY 10s). /stop-alerting stops the alerts (wont work if alerts on already)."),
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
            ctx.editReply(admin.reason);
            return;
        }
        confirm.useCommand(ctx.guildId,5);
        result = fileStream.readFileSync('serversaccess.json','utf-8');
        const servers = JSON.parse(result)
        if (servers.servers[confirmationResult.index].alert.running) {
            await ctx.editReply({embeds: [new EmbedBuilder().setTitle("ALERTS ALREADY RUNNING").setDescription("The alerts are already running, please check the previous messages to see its status.\n If you cant find the message or the bot has stopped updating, please run /stop-alerting and do /begin-alerts").setColor("#ff0000")]})
            return;
        }
        servers.servers[confirmationResult.index].alert.running = true;
        let alerts = servers.servers[confirmationResult.index].information.alerts;
        if (alerts.length < 1)
        {
            let embed = new EmbedBuilder()
                .setTitle("NO ALERTS SETUP")
                .setColor("Red")
                .setDescription("You have not set up an alert yet! Please do /create-alert")
            ctx.editReply({embeds:[embed]})
            return;
        }
        fileStream.writeFileSync("serversaccess.json",JSON.stringify(servers));
        let inrange = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
        for (let alertTimer = 0; alertTimer < 999999999; alertTimer++)
        {
            let r = fileStream.readFileSync('serversaccess.json','utf-8');
            const s = JSON.parse(r)
            if (!s.servers[confirmationResult.index].alert.running)
            {
                return;
            }
            await httpModule.getPlayersArray().then(async (players) => {
                let names = []
                let indexs = [];
                let online = [];

                let emojis = ["⚫","🔴","🟢"]
                let message = ""
                let playersNames = [];
                for (let j = 0; j < players.length; j++)
                {
                    playersNames.push(players[j].name)
                }


                for (let j = 0; j < alerts.length; j++)
                {
                    names.push(alerts[j].username)
                    indexs.push(j);
                    online.push(false);

                    if (playersNames.includes(alerts[j].username))
                    {
                        online[j] = 2;
                        let index = playersNames.indexOf(alerts[j].username);
                        console.log(players[index])
                        let playerLocation = [
                            players[index].position.x,
                            players[index].position.z
                        ]

                        let distance = FigureDistance(alerts[j].alertPosition,playerLocation)
                        if (distance < alerts[j].alertRange)
                        {
                            console.log("UH OHS")
                            online[j] = 1;
                            if (!inrange[j])
                            {
                                let channel = ctx.guild.channels.cache.get(servers.servers[confirmationResult.index].information.channels[0])
                                if (channel == null)
                                {
                                    await ctx.editReply("Something went wrong :/. The bot is unable to find the announcements channel. Please redo the /server-setup command to fix this issue")
                                    return;
                                }
                                console.log(servers.servers[confirmationResult.index].information.channels[0])
                                console.log(channel)

                                let role = servers.servers[confirmationResult.index].information.roles[alerts[j].priority]
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
                                inrange[j] = true;
                            }

                        }
                        else if (inrange[j]) { inrange[j] = false;}
                        console.log(alerts[j].username + " IS " + distance + " BLOCKS AWAY")
                        let extraMessage = `[${Math.round(distance)} BLOCKS] (${playerLocation[0]},${playerLocation[1]})`;
                        message += emojis[online[j]] + ": " + names[j] +"  " + extraMessage+ "\n"
                    }
                    else
                    {
                        online[j] = 0;
                        message += emojis[online[j]] + ": " + names[j] + "\n"
                    }
                }
                let embed = new EmbedBuilder()
                    .setTitle("ALERTS")
                    .setDescription(message)
                    .addFields({name:"IS ONLINE",value:alertTimer + " <<< This value should update every 10s ish. If its not, the alerts stopped working!"})
                ctx.editReply({embeds:[embed]})
            await new Promise(resolve => setTimeout(resolve, 10000));
            })
        }
    }
}
function FigureDistance(position1,position2)
{
    let x = Math.abs(position1[0] - position2[0]);
    let y = Math.abs(position1[1] - position2[1]);
    console.log("x: " + x);
    console.log("y: " + y);
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}