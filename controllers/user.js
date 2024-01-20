const user = require("../models/user");
const bcrypt = require('bcryptjs');
const { setUser } = require("../services/auth");

async function handleUserSignUp(req,res){
    const {firstName,lastName , email , password} = req.body;
    if(!firstName && !lastName && !email && !password){
        return res.status(400).json({
            "status":"Failure",
            "Output":"All Field must be filled"
        });
    }
    else{
        try{
            const salt = await bcrypt.genSalt(10);
            const securePasswordHash = await bcrypt.hash(req.body.password,salt);
            const userDetail =  await user.create({
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:securePasswordHash
            });
            const payload = {
                id:userDetail._id,
                email
            }
            const token = setUser(payload);
            res.json({token,email});
        } catch(err){
            console.log(err);
        }
        
    }
}

async function handleUserLogIn(req,res){
    const {email,password} = req.body;
    try {
        const userDetails = await user.findOne({email:email});

    const comparedPassword = await bcrypt.compare(password,userDetails.password)

    if(!comparedPassword){
        res.status(404).json({
            "status":"Failure",
            "Output":"Email or Password is incorrect"
        });
    }
    const payload = {
        id:userDetails._id,
        email
    }
    const token = setUser(payload);
    return res.status(200).json({token,email});
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { handleUserSignUp,handleUserLogIn }