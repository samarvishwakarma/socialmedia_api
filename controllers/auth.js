const authController = require('express').Router()
const User = require('../models/User')
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')

authController.post('/register', async(req, res) => {
    try{
        const isExisting = await User.findOne({email: req.body.email})

        if(isExisting){
            return res.status(500).json({msg: "Email already registred"})
        }

        const hashedPass = await bycrpt.hash(req.body.password, 10)

        const newUser = await User.create({...req.body, password: hashedPass})

        const {password, ...others} = newUser._doc
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '4h'})

        return res.status(201).json({user: others, token})
    }
    catch(error){
        return res.status(500).json(error.message)
    }
})

authController.post("/login", async(req,res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(500).json({msg: "Wrong Credentials"})
        }

        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if(!comparePass){
            return res.status(500).json({msg: "Wrong Credentials"})
        }

        const {password, ...others} = user._doc
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '4h'})

        return res.status(200).json({user: others, token})

    }
    catch(error){
        return res.status(500).json(error.message)
    }
})

module.exports = authController