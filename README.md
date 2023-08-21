# REDUX BOT
### Developed by DoctorLeaf IGN[ItsDoctorLeaf] DSC[drleaf]

## Quickstart
I have set up a 24/7 host for this bot, so you can contact me on discord and i will help you invite it to your server

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
[name] = The name of the nation/team
[leader] = The person who is incharge of the group
[location] = The general location of the group
[relationship] = How you are related to the ally
[link] = A link to their discord server

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
