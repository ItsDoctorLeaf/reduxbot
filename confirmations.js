const fileStream = require("fs");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  hasAccess: function(guildID, commandTier) {
    let result = "";
    let serverIndex = 0;
    result = fileStream.readFileSync('serversaccess.json', 'utf-8');
    const servers = JSON.parse(result)
    for (let i = 0; i < servers.servers.length; i++) {
      if (servers.servers[i].guild == guildID) {
        console.log("FOUND");
        serverIndex = i;
        if (servers.servers[i].setup == false) {
          console.log("NOT SETUP")
          return { value: false, reason: "You have not set the server up yet! Please do /server-setup", index: serverIndex }
        }
        if (servers.servers[i].tier >= commandTier) {
          console.log("HAS PERMISSION");
          if (servers.servers[i].daysLeft > 0) {
            console.log("HAS ENOUGH DAYS");
            return { value: true, reason: "X", index: serverIndex };
          }
          else {
            console.log("OUT OF DAYS")
            return { value: false, reason: "Your subscription is over! Please talk to a higher up in NSE to renew", index: serverIndex };
          }
        }
        else {
          console.log("NO PERMISSION");
          return { value: false, reason: "You need a higher level subscription to access this command!", index: serverIndex };
        }

      }
    }
    console.log("NOT FOUND");
    return { value: false, reason: "You need to talk to a higher up in NSE to begin using this bot! Please talk to either DoctorLeaf, MrToptic or CBR", index: serverIndex };
  },
  noAccessEmbed: new EmbedBuilder()
    .setColor("#ff0000")
    .setTitle("NO ACCESS")
    .setDescription("Sorry, but you do not have access to this command."),
  useCommand: function(guildID, commandAddr) {
    let result = "";
    result = fileStream.readFileSync('serversaccess.json', 'utf-8');
    const s = JSON.parse(result)
    let returnMessage = "reachedEndWithoutDoingOut";
    for (let i = 0; i < s.servers.length; i++) {
      if (s.servers[i].guild == guildID) {

        switch (commandAddr) {
          case 0:
            s.servers[i].tracking.usedFeatures.players++;
            returnMessage = "used players command and added it to the json list"
            break
          case 1:
            s.servers[i].tracking.usedFeatures.locate++;
            returnMessage = "used locate command and added it to the json list"
            break
          case 2:
            s.servers[i].tracking.usedFeatures.trackC++;
            returnMessage = "used trackC command and added it to the json list"
            break
          case 3:
            s.servers[i].tracking.usedFeatures.screenshot++;
            returnMessage = "used screenshot command and added it to the json list"
            break
          case 4:
            s.servers[i].tracking.usedFeatures.alertC++;
            returnMessage = "used alertC command and added it to the json list"
            break
          case 5:
            s.servers[i].tracking.usedFeatures.alertBegin++;
            returnMessage = "used alertBegin command and added it to the json list"
            break
          case 6:
            s.servers[i].tracking.usedFeatures.notifyC++;
            returnMessage = "used notifyC command and added it to the json list"
            break
          case 7:
            s.servers[i].tracking.usedFeatures.allys++;
            returnMessage = "used allys command and added it to the json list"
            break
          case 8:
            s.servers[i].tracking.usedFeatures.enemies++;
            returnMessage = "used enemies command and added it to the json list"
            break
          case 9:
            s.servers[i].setup = true;
            returnMessage = "setup server"
            break
          default:
            s.servers[i].tracking.usedFeatures.undefinedCommand++;
            returnMessage = "used undefined command and added it to the json list"
            break
        }
      }
    }

    fileStream.writeFileSync("serversaccess.json", JSON.stringify(s));
    return returnMessage;
  },
  adminCheck: function(ctx) {
    console.log(ctx)
    let result = "";
    result = fileStream.readFileSync('serversaccess.json', 'utf-8');
    const servers = JSON.parse(result)

    for (let i = 0; i < servers.servers.length; i++) {
      if (servers.servers[i].guild == ctx.guildId) {
        console.log("REQ ROLE = " + servers.servers[i].information.roles[0])
        console.log("ROLES = " + ctx.member._roles)
        if (ctx.member._roles.includes(servers.servers[i].information.roles[0])) {

        }
        for (let j = 0; j < ctx.member._roles.length; j++) {
          console.log(ctx.member._roles[j] + " : " + servers.servers[i].information.roles[0]);
          if (ctx.member._roles[j] == servers.servers[i].information.roles[0]) {
            return { value: true, reason: "You have admin role!" }
          }
        }
        if (ctx.member.permissionsIn(ctx.channel).has("ADMINISTRATOR")) {
          return { value: true, reason: "YOU HAVE ADMIN" }
        }
        return { value: false, reason: "You do not have the right permissions to do this!" };
      }
    }
    return { value: false, reason: "ERROR: Unable to find your server!" };

  }
}