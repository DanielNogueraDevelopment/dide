const express = require("express");
const mongoose = require("mongoose");
const config = require("./config")
const Interpreter = require("js-interpreter")
//requiring
core = {};

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
    new Code({ title: name, content: value }).save(function (err) {
        if (err) {
            console.log(err)
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












//database connect
mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () { console.log("mongo connected");}).catch(err => console.log(err))
var codeschema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: { type: String },
    content: {type:String}
})





















































module.exports = core;