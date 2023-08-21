# REDUX BOT
### Developed by DoctorLeaf IGN[ItsDoctorLeaf] DSC[drleaf]

## Quickstart
> [!NOTE]
> I have set up a 24/7 host for this bot, so you can contact me on discord and i will help you invite it to your server

### If you really want to do all of the setup yourself follow this guide:
1. Create a discord application with a bot (Watch a ytube tutorial or somet)
2. Encode the client ID with base64 (idk watch a tutorial) and then put it into a new txt file called "client.txt"
3. Run the bot and it should go online, then you can use all of the commands... after doing the json setup ;-;

### JSON SETUP
1. This bot was not made for independant hosting but, at the request of Juless, you gotta do this urself now
2. Open the serversaccess.json file and do some really fun setup!
3. Firstly you will want to enable developer mode on discord. To do this, go into settings > advanced > developermode
4. Now, follow these steps
   - edit the value fo guild to be your server ID (Right click the discord server and hit "Copy Server ID"
   - make sure the value of "setup" is false
   - set the value of "tier" to be 2 and set the value of "daysLeft" to be any value greater than 1
   - the rest of the values are not required for the bot to function

## USING THE COMMANDS
So you want to use all the cool commands? This area below is a quick description of each command, what it does, and how to use it.

### /create-ally
This command adds an ally to the list, so that when you do the /allies command, the information appears. Great for new members of your team to check what they do
[name] = The name of the nation/team \n
[leader] = The person who is incharge of the group\n
[location] = The general location of the group\n
[relationship] = How you are related to the ally\n
[link] = A link to their discord server\n

### /create-enemy
This command adds an enemy to the list, so that when you do the /enemies command, the information appears. Great for new members of your team to check what they do
[name] = The name of the nation/team
[leader] = The person who is incharge of the group
[location] = The general location of the group
[relationship] = How you are related to the enemy
[link] = A link to their discord server

### /create-alert
This command adds a player into the alerts list, so that when you next run the /begin-alerts command it will start track that person
[username] = The minecraft username of the player
[position] = The location center of the area that the player is not allowed to be in
[range] = How far away the player has to be from the position
[priority] = How important it is if the player enters the range

### /server-setup
This is required before performing any major commands, and skips alot of the boring JSON editing that you will not want to do!
[announcements-channel] = The channel where alerts and notifications go to
[admin-role] = The role needed for people to create, edit, remove and add alerts, allies and enemies from the list
[minor-alert-role] = The role thats pinged when a minor alert is triggered
[major-alert-role] = The role thats pinged when a major alert is triggered
[extreme-alert-role] = The role thats pinged when a extreme alert is triggered

### /remove-enemy 
Removes an enemy from the enemies list
[index] = The point in the list where the enemy is (EG: The first enemy in the list or the 5th etc). Starts at 1

### /remove-ally
Removes an ally from the allys list
[index] = The point in the list where the ally is (EG: The first ally in the list or the 5th etc). Starts at 1

### /remove-alert 
Removes an alert from the alerts list
[index] = The point in the list where the alert user is (EG: The first alert user in the list or the 5th etc). Starts at 1

### /ping
This does NOT show the game ping, this is just a simple command. All it does is respond with "Pong!". Its used to confirm wether the bot is up and running

### /players
This command shows a list of all online players, and their locations (based off of bluemap data)

### /locate
This command locates a player based on their username, then it will return their current position
[player-name] = The username of the minecraft player

### /track
Follows the position of the minecraft player for 60s and returns it in the chat. Its basically the locate command but it runs for 60s and updates per second
[player-name] = The username of the minecraft player

### /allies
This shows a list of all of the allies of the server. You can add and remove allies from this list using the /create-ally and /remove-ally commands

### /enemies
This shows a list of all of the enemies of the server. You can add and remove enemies from this list using the /create-enemies and /remove-enemies commands

### /run-alerts
This command runs the alert system. It should update every 10 seconds. You can tell if the system broke because the counter at the bottom of the embed will stop updating. Your server can only have the alerts command running 1 at a time. If you wish to add more players to the alerts, you can use the /create-alert and /remove-alert to remove them.
Alert lists will only update upon a restart, so to add / remove players, once doing the related command, you must do /stop-alerts then /start-alerts

### /notify
/notify simulates an alert, in the sense of it will create your own custom alert style notification and send it to the alerts channel.
[priority] = How important the alert is (changes which role it pings)
[message] = The contents of the alert message
[title] = The title of the alerts message

### /help (OUTDATED)
the help command contains outdated information and is yet to be updated...
