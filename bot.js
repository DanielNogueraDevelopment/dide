const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require("mongoose")
const config = require("./config")
const Interpreter = require("js-interpreter")
//BOT INVITE LINK: https://discordapp.com/oauth2/authorize?client_id=706107173939445783&scope=bot


var codeschema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: { type: String, required:true },
    content: { type: String, required: true  }
})
var Code = mongoose.model("Code", codeschema)
const express = require("express");
var app = express();


app.get("/dide/:id", function (req, res) {
    Code.findById(req.params.id).then(function (code) {
        if (code) {
            res.send(code.content)
        } else {
            res.send("OOPS!  we couldn't find that code")
        }
    })
})

app.listen(3005);







client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', function(message) {
	console.log(message.content);

    if (message.content.toLowerCase() === '~creators') {
	return message.channel.send('My creators are Daniel and Isabel Noguera. Daniel is a junior and Isabel is in 8th Grade at Hamilton Virtual School. Daniel has been coding for a while and Isabel is newer to the coding world. ');
}
    if (message.content.toLowerCase() === '~help') {
     return message.channel.send('I am a Discord IDE bot. I turn commands into code that you can run. For a full command list, say “~fullcommands”. Have Fun!');
}
 if (message.content.toLowerCase() === '~more') {
     return message.channel.send('There’s more from Daniel and Isabel in https://danielnoguera.com/projects. Check it out!');
    }

    if (message.content.toLowerCase().indexOf("~create") == 0) {
        var splitted = message.content.split(" ");
        new Code({ title: splitted[1], content: " " }).save()
        message.channel.send("File Created: "+splitted[1])
    }

    if (message.content.toLowerCase().indexOf("~view") == 0) {
        var splitted = message.content.split(" ");
        console.log(splitted[1])
        Code.findOne({ title: splitted[1] }, function (err, code) {
            if (code) {
                
                
                returner = "";
                console.log(code.content.split("\n"))
                for (i = 0; i < (code.content.split("\n")).length; i++) {
                    returner = returner + i + " " + (code.content.split("\n"))[i] + "\n"
                }
                console.log(returner)
                if (returner) {
                    message.channel.send(returner);
                } else {
                    message.channel.send("there is nothing to view")
                }
                } else {
                message.channel.send("We couldn't find that file")
            }
        })
    }

    if (message.content.toLowerCase().indexOf("~edit") == 0) {
        var splitted = message.content.split(" ");
        
        if (!Object.is(Number(splitted[2]), NaN)) {
            console.log("here we go")






            
            
                Code.findOne({ title: name }).then(function (code) {
                    if (code) {
                        var returner = "";

                        content = code.content.split("\n");
                        console.log("RAW INFO ", content)
                        console.log("SHOULD BE ARRAY ", content)
                        var dealtwith = false;
                        console.log("LENGTH: ", content.length)
                        for (i = 0; i <= content.length; i++) {
                            if (i >= start && i <= end) {
                                if (!dealtwith) {
                                    returner = returner + newcontent + "\n"
                                    dealtwith = true;
                                } else {

                                }
                            } else {
                                if (content[i]) {
                                    returner = returner + content[i] + "\n";
                                }
                            }

                        }
                        code.content = returner;
                        new Code(code).save();
                        console.log(returner);
                    } else {
                        return "could not view"
                    }
                })
            









        } else {
            console.log("here we go2")
            Code.findOne({ title: splitted[1] }).then(function (code) {
                console.log("splitted" + message.content.split(" ")[0] + message.content.split(" ")[1])
                var newcode = message.content.replace(message.content.split(" ")[0] +" " + message.content.split(" ")[1],"")
                if (code) {
                    console.log("code:" + code);
                    code.content = (code.content.concat(newcode))
                    Code.findByIdAndRemove(code._id).then(function () {
                        new Code({ title: code.title, _id: code._id, content: code.content }).save(err => console.log(err));
                    })
                    

                    message.channel.send(newcode)







                } else {
                    message.channel.send("We couldn't find that code ):")
                }
            })
        }













    }









});


mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () { console.log("mongo connected");}).catch(err => console.log(err))
var codeschema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: { type: String },
    content: { type: String }
})


client.login(config.bot);







//this code will grab a value
/*core.Code.findOne({ title: name }).then(function (code) {
    console.log(code.content)
    if (code) {
        return code.content;
    } else {
        return false;
    }
})*/
