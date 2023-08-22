const request = require("request-promise");
const { EmbedBuilder } = require("discord.js");
const url = "https://map.ecoredux.net/maps/earth/live/players.json";
const options = {
  method: 'POST',
  url: url,
  headers: { 'Content-Type': 'application/json' }
};

module.exports = {
  getPlayersString: async function() {
    console.log("MAYYYAHEEEE")
    let message = "";
    await request(options).then((body, error) => {
      if (error) throw new Error(error);
      let jsonObject = JSON.parse(body);

      for (let i = 0; i < jsonObject.players.length; i++) {
        message += `${i}. ${jsonObject.players[i].name} (${Math.round(jsonObject.players[i].position.x)}, ${Math.round(jsonObject.players[i].position.z)}) \n`
      }

      console.log("FINISHED AND RETURNING");

    })
    return message;
  },
  getPlayersArray: async function() {
    console.log("MAYYYAHEEEE")
    let players = [];
    await request(options).then((body, error) => {
      if (error) throw new Error(error);
      let jsonObject = JSON.parse(body);

      for (let i = 0; i < jsonObject.players.length; i++) {
        players.push(jsonObject.players[i]);
      }

      console.log("FINISHED AND RETURNING");

    })
    return players;
  }
}
