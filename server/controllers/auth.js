const User = require('../models/User')

const signup = async (req, res)=>{
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(201).json({user: {name: user.name, email: user.email}, token})
}

const login = async (req,res)=>{
    const { name, password } = req.body
    if(!name||!password){
        throw new Error('Credentials error')
    }
    const user = await User.findOne({name})
    if(!user){
        throw new Error('Credentials error')
    }
    const access = await user.comparePassword(password)
    if(!access){
        throw new Error('Credentials error')
    }
    const token = user.createJWT()
    res.status(200).json({user: {name: user.name, email: user.email}, token})
}

module.exports = {signup, login}