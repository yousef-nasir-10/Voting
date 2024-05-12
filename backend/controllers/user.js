const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require("bcryptjs")
var nodemailer = require('nodemailer');



const register = async (req, res) => {
    const { username, password, role, } = req.body
    const userId = await User.findOne({ username: username })
    // const encryptedPassword = await bcrypt.hash(password, 10)
    if (userId) {
        return res.status(200).json({ status: 400, msg: "username is used" })
    }

    try {
        await User.create({
            username,
            role,
            
        })
        return res.status(200).json({ status: 200, msg: "User created" })
    } catch (error) {
        res.status(500).json({ msg: error, status: 500 })
    }
}

const login = async(req, res) => {
    try {
        const {username} = req.body
        
        const user = await User.findOne({username})
        if(!user){
            console.log('user does not exist');
            return res.status(200).json({error: 'User does not exist'})

        } 

        if(user){
            const token = jwt.sign(
                {
                    userID: user.id, 
                    role: user.role,
                    username: user.username
                    
                }, 
                    JWT_SECRET,
                    {expiresIn: "60m"}
            )
            console.log(token);
            return res.status(200).json({ status: "OK" ,data: token})

        }else{
            return res.status(200).json({status: "error", error: "Invalid Password"})

        }

    } catch (error) { 
        res.status(500).json({msg: error}) 

    }
}


module.exports = {
    register, login
}