const express = require("express");
const mongoose = require("mongoose");
const config = require("./config")
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
}















//database connect
mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () { console.log("mongo connected"); console.log("setting.."); core.set("daniel", "e") }).catch(err => console.log(err))
var codeschema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: { type: String },
    content: {type:String}
})





















































module.exports = core;