import Jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import users from '../models/auth.js'


export const signup = async(req, res) => {
    const {name, email, password} = req.body;
    try{
        const existinguser = await users.findOne({email});
        if(existinguser)
        {
            return res.status(404).json({message: "User already exist."})
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const nweUser = await users.create({name, email, password: hashedPassword})
        const token = Jwt.sign({email: nweUser.email, id:nweUser._id},process.env.JWT_SECRET,{ expiresIn: '1h'});
        res.status(200).json({result: nweUser, token})
    }catch(error){
        res.status(500).json("Something went Worng...")
    }
}

export const login = async(req, res) => {
    const { email, password } = req.body;
    try{
        const existinguser = await users.findOne({email});
        if(!existinguser){
            return res.status(404).json({message: "User don't exist."})
        }
        const isPasswordCrt = await bcrypt.compare(password, existinguser.password)
        if(!isPasswordCrt){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const token = Jwt.sign({email: existinguser.email, id:existinguser._id},process.env.JWT_SECRET,{ expiresIn: '1h'});
        res.status(200).json({result: existinguser, token})
    }catch{
        res.status(500).json("Something went Worng...")
    }
}