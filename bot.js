const Discord = require('discord.js');
const core = require('./core.js');
const client = new Discord.Client();
client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', function(message) {
	console.log(message.content);
	message.content = message.content.toLowerCase()
  if (message.content === '~creators') {
	message.channel.send('My creators are Daniel and Isabel Noguera. Daniel is a junior and Isabel is in 8th Grade at Hamilton Virtual School. Daniel has been coding for a while and Isabel is newer to the coding world. ');
}
if (message.content === '~help') {
message.channel.send('I am a Discord IDE bot. I turn commands into code that you can run. For a full command list, say “~fullcommands”. Have Fun!');
}

});
