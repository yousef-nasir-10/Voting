const { string } = require('joi')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const { Schema } = mongoose;

const VoteSchema = new mongoose.Schema({

    title: {type:String, required: true},
    created_by: {type:String, required: true},
    creationDate:{type:Number},
    candidates: [
        {   
            voter: [{type:String, ref:"users"}],
            desc: {type:String},
            
        }
    ],

    

})

module.exports = mongoose.model('Vote', VoteSchema)