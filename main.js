const fileStream = require("fs");
const { Client, Collection, Events, GatewayIntentBits, REST, Routes } = require("discord.js");
const path = require('node:path');
const httpModule = require("./getHttpPlayers.js")


function readFileFromPath(path) {

  let result = "";
  result = fileStream.readFileSync(path, 'utf-8');
  return result;
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = readFileFromPath("client.txt");


client.once(Events.ClientReady, C => {
  console.log("LOGGED IN AS " + C.user.tag)
})
client.on(Events.InteractionCreate, async interaction => {

  if (!interaction.isChatInputCommand()) return;
  console.log(`${interaction.user.displayName} attempted to run ${interaction.commandName}`);
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`NO COMMAND MATCHING ${interaction.commandName}`)
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});


client.commands = new Collection();


const commandsPath = path.join(__dirname, "commands");
const commandFiles = fileStream.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
let commands = [];
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);

  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}
console.log("COMMANDS " + commands[0].name + commands[0].description)



// Construct and prepare an instance of the REST module then deploys commands
const rest = new REST().setToken(atob(token));
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands("1141666980399697920"),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();

client.login(atob(token))

/* TODO
    - ALLYS COMMAND (DONE)
    - ENEMIES COMMAND (DONE)
    - FINISH ALERTS (MAYBE DONE)
    - MANUAL
    - REPLIT HOSTING
    - ADMIN CHECK
    - REMOVE ALERTS (DONE)
    - REMOVE ALLYS (DONE)
    - REMOVE ENEMIES (DONE)
 */