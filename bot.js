const Discord = require('discord.js');
const core = require('./core.js');
const client = new Discord.Client();
const mongoose = require("mongoose")




var codeschema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: { type: String },
    content: { type: String }
})
var Code = mongoose.model("Code", codeschema)








































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












//this code will grab a value
/*core.Code.findOne({ title: name }).then(function (code) {
    console.log(code.content)
    if (code) {
        return code.content;
    } else {
        return false;
    }
})*/