const express = require("express");
const mongoose = require("mongoose");
const config = require("./config")
//requiring
core = {};



//database config
mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("mongo connected")).catch(err => console.log(err))
var codeschema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: { type: String },
    content: {type:String}
})
var Code = mongoose.model("Code", codeschema)



































module.exports = core;