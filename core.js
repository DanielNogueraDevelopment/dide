//This file is storing the ways to interact with the database.  












const express = require("express");
const mongoose = require("mongoose");
const config = require("./config")
const Interpreter = require("js-interpreter")
//requiring
core = {};

//web stuff
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

app.listen(5005);



//database config
var codeschema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: { type: String },
    content: { type: String }
})
var Code = mongoose.model("Code", codeschema)





//core methods
core.set = function (name, value) {
    Code.findOne({ title: name }).then(function (code) {
        if (code) {
            code.content = value
            new Code(code).save()
        } else {
            new Code({ title: name, content: value }).save(function (err) {
                if (err) {
                    console.log(err)
                }
            })
        }
    })

    return true;
}

core.get = function (name) {
    Code.findOne({ title: name }).then(function (code) {
        console.log(code.content)
        if (code) {
            return code.content;
        } else {
            return false;
        }
    })
}

core.run = function (code) {
    try {
        var sandbox = new Interpreter(code);
        var running = true;
        while (running) {
            try {
                
                if (sandbox.step() == false) {
                    running=false
                }
            } catch(e){ running = false; throw e}
        }
        if (sandbox.value.length > 100) {
            return "maximum return length is 100!"
        } else {
            return sandbox.value;
        }




    } catch(e){ return e}
}

core.add = function (name, newcode) {
    Code.findOne({ title: name }).then(function (code) {
        if (code) {
            new Code({ title: code.title, date: code.date, content: (code.content + newcode) }).save()
        } else {
            return false;
        }
    })
}

core.view = function (name) {
    Code.findOne({ title: name }).then(function (code) {
        if (code) {
            code.content = code.content.split(/\r?\n/);
            returner=""
            for (i = 0; i < code.content.length; i++) {
                returner=returner+i+" "+code.content[i]+"\n"
            }
            console.log(returner);
        } else {
            console.log(returner);
        }
    })
}

core.viewspecific = function (name, start,end) {
    Code.findOne({ title: name }).then(function (code) {
        if (code) {
            code.content = code.content.split(/\r?\n/);
            returner = ""
            for (i = start; i <= end; i++) {
                returner = returner+ i + " " + code.content[i] + "\n"
            }
            console.log(returner);
        } else {
            return "could not view"
        }
    })
}

core.editspecific = function (name, start, end, newcontent) {
    Code.findOne({ title: name }).then(function (code) {
        if (code) {
            var returner = "";
            
            content = code.content.split("\n");
            console.log("RAW INFO ", content)
            console.log("SHOULD BE ARRAY ",content)
            var dealtwith = false;
            console.log("LENGTH: ",content.length)
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
}










//database connect
mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () { console.log("mongo connected"); core.view("daniel")}).catch(err => console.log(err))
var codeschema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: { type: String },
    content: {type:String}
})





















































module.exports = core;