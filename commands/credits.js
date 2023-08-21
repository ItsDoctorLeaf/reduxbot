const {SlashCommandBuilder} = require("discord.js")
const {Client,Collection,Events, EmbedBuilder,EmbedAuthorOptions} = require("discord.js");
const confirm = require("../confirmations");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays helpful information about the bot."),
    async execute(ctx) {
        console.log(ctx);
        let confirmationResult = confirm.hasAccess(ctx.guildId,0);
        if (!confirmationResult.value)
        {
            await ctx.reply({embeds:[confirm.noAccessEmbed.addFields({name:"Reason",value:confirmationResult.reason})]});
            return;
        }
        let embed = new EmbedBuilder()
            .setTitle("CREDITS")
            .setColor("#66b968")
            .setFields({name: "About", value: "This bot was developed by DoctorLeaf for use in EcoRedux. Its meant to help you as a group and make everything alot easier in general.\nUsing data from the Bluemap, this bot is able to figure out and track different people. Very useful for people who either are unable to use the bluemap, or find it too laggy to be practical."},{name: "Pricing", value: "This is a premium bot, to use the features, you must purchase it (INSIDE OF ECOREDUX).\n1 Day Regular $3k\n1 Day Premium $6k\n1 Week Regular $10k\n1 Week Premium $18k\n\n The bot also has a free tier, but with minimal functionality, meant as a trial run."},{name:"Tiers",value:"Each plan gives you the perks of the previous tier!\n\nFREE PLAN: `/players` `/locate` `/ping` `/help`\nREGULAR PLAN: `/track` (MORE COMING SOON)\n PREMIUM PLAN: `/alert` `/alertbegin` `/notify` `/allys` `/enemies`"})

            .setFooter({text: "DoctorLeaf DSC(@drleaf) IGN[ItsDoctorLeaf]", iconURL:"https://cdn.discordapp.com/avatars/1141666980399697920/107a96b28823c308400dbe887d088724.webp?size=80"})

        await ctx.reply({embeds:[embed]});

    }
}

