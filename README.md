# REDUX BOT
### Developed by DoctorLeaf IGN[ItsDoctorLeaf] DSC[drleaf]

## Quickstart

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
This command adds an ally to the list, so that when you do the /allies command, the information appears. Great for new members of your team to check what they do<br />
[name] = The name of the nation/team <br />
[leader] = The person who is incharge of the group <br />
[location] = The general location of the group <br />
[relationship] = How you are related to the ally <br />
[link] = A link to their discord server <br />

### /create-enemy
This command adds an enemy to the list, so that when you do the /enemies command, the information appears. Great for new members of your team to check what they do<br />
[name] = The name of the nation/team<br />
[leader] = The person who is incharge of the group<br />
[location] = The general location of the group<br />
[relationship] = How you are related to the enemy<br />
[link] = A link to their discord server<br />

### /create-alert
This command adds a player into the alerts list, so that when you next run the /begin-alerts command it will start track that person<br />
[username] = The minecraft username of the player<br />
[position] = The location center of the area that the player is not allowed to be in<br />
[range] = How far away the player has to be from the position<br />
[priority] = How important it is if the player enters the range<br />

### /server-setup
This is required before performing any major commands, and skips alot of the boring JSON editing that you will not want to do!<br />
[announcements-channel] = The channel where alerts and notifications go to<br />
[admin-role] = The role needed for people to create, edit, remove and add alerts, allies and enemies from the list<br />
[minor-alert-role] = The role thats pinged when a minor alert is triggered<br />
[major-alert-role] = The role thats pinged when a major alert is triggered<br />
[extreme-alert-role] = The role thats pinged when a extreme alert is triggered<br />

### /remove-enemy 
Removes an enemy from the enemies list<br />
[index] = The point in the list where the enemy is (EG: The first enemy in the list or the 5th etc). Starts at 1<br />

### /remove-ally
Removes an ally from the allys list<br />
[index] = The point in the list where the ally is (EG: The first ally in the list or the 5th etc). Starts at 1<br />

### /remove-alert 
Removes an alert from the alerts list<br />
[index] = The point in the list where the alert user is (EG: The first alert user in the list or the 5th etc). Starts at 1<br />

### /ping
This does NOT show the game ping, this is just a simple command. All it does is respond with "Pong!". Its used to confirm wether the bot is up and running

### /players
This command shows a list of all online players, and their locations (based off of bluemap data)<br />

### /locate
This command locates a player based on their username, then it will return their current position<br />
[player-name] = The username of the minecraft player<br />

### /track
Follows the position of the minecraft player for 60s and returns it in the chat. Its basically the locate command but it runs for 60s and updates per second<br />
[player-name] = The username of the minecraft player<br />

### /allies
This shows a list of all of the allies of the server. You can add and remove allies from this list using the /create-ally and /remove-ally commands<br />

### /enemies
This shows a list of all of the enemies of the server. You can add and remove enemies from this list using the /create-enemies and /remove-enemies commandsv

### /run-alerts
This command runs the alert system. It should update every 10 seconds. You can tell if the system broke because the counter at the bottom of the embed will stop updating. Your server can only have the alerts command running 1 at a time. If you wish to add more players to the alerts, you can use the /create-alert and /remove-alert to remove them.<br />
Alert lists will only update upon a restart, so to add / remove players, once doing the related command, you must do /stop-alerts then /start-alerts<br />

### /notify
/notify simulates an alert, in the sense of it will create your own custom alert style notification and send it to the alerts channel.<br />
[priority] = How important the alert is (changes which role it pings)<br />
[message] = The contents of the alert message<br />
[title] = The title of the alerts message<br />

### /help (OUTDATED)
the help command contains outdated information and is yet to be updated...<br />
