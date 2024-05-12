const mongoose = require('mongoose')
const jwt  = require('jsonwebtoken')
const Joi = require("joi")
const userSchema = new mongoose.Schema({
    username: {type:String, required: true, unique: true},
    role: {type: String, default: "student" },
    // id: {type:String, required: true, unique: true},

})



module.exports = mongoose.model('Users', userSchema)

