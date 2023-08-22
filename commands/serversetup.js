const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { Client, Collection, Events } = require("discord.js");
const confirm = require("../confirmations");
const fileStream = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-server")
    .setDescription("READ MANUAL BEFORE ACTIVATING. Must be done to setup all of the functions in the server")
    .addChannelOption((option) => option.setName("announcements-channel").setDescription("The channel where the notify command and alert command leads to").setRequired(true))
    .addRoleOption((option) => option.setName("admin-role").setDescription("The role for administrators. Anybody with this role can do commands such as alert and notify").setRequired(true))
    .addRoleOption((option) => option.setName("minor-alert-role").setDescription("The role for minor alerts (0)").setRequired(true))
    .addRoleOption((option) => option.setName("major-alert-role").setDescription("The role for major alerts (1)").setRequired(true))
    .addRoleOption((option) => option.setName("extreme-alert-role").setDescription("The role for extreme alerts (0)").setRequired(true)),

  async execute(ctx) {

    await ctx.deferReply();
    let confirmationResult = confirm.hasAccess(ctx.guildId, 0);
    if (!confirmationResult.value) {
      if (confirmationResult.reason != "You have not set the server up yet! Please do /server-setup") {
        await ctx.editReply({ embeds: [confirm.noAccessEmbed.addFields({ name: "Reason", value: confirmationResult.reason })] });
        return;
      }

    }
    let admin = confirm.adminCheck(ctx);
    if (!admin.value) {
      ctx.editReply(admin.reason);
      return;
    }
    let index = confirmationResult.index;
    console.log(ctx)
    let embed = new EmbedBuilder()
      .setTitle("SETUP COMPLETE")
      .setFields({ name: "Announcements Channel", value: "#" + ctx.options.getChannel("announcements-channel").name },
        { name: "Admin Role", value: "@" + ctx.options.getRole("admin-role").name },
        { name: "Minor Alert Role", value: "@" + ctx.options.getRole("minor-alert-role").name },
        { name: "Major Alert Role", value: "@" + ctx.options.getRole("major-alert-role").name },
        { name: "Extreme Alert Role", value: "@" + ctx.options.getRole("extreme-alert-role").name })
    await ctx.editReply({ embeds: [embed] });
    let result = fileStream.readFileSync('serversaccess.json', 'utf-8');
    const s = JSON.parse(result);
    s.servers[index].information.channels[0] = ctx.options.getChannel("announcements-channel").id;
    s.servers[index].setup = true;
    s.servers[index].guild = ctx.guildId;
    s.servers[index].information.roles[0] = ctx.options.getRole("minor-alert-role").id;
    s.servers[index].information.roles[1] = ctx.options.getRole("major-alert-role").id;
    s.servers[index].information.roles[2] = ctx.options.getRole("extreme-alert-role").id;
    s.servers[index].information.roles[3] = ctx.options.getRole("admin-role").id;
    fileStream.writeFileSync("serversaccess.json", JSON.stringify(s));
  }
}

