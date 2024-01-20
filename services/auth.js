const jwt = require("jsonwebtoken");
require('dotenv').config();

function setUser(payload){

    const token = jwt.sign( payload  , process.env.SECRET_KEY);
    return token;
}

function getUser(token){
    if(!token) return null;
    try {
        
        return jwt.verify(token,process.env.SECRET_KEY);
        
    } catch (error) {
        return null;
    }
}

module.exports = {setUser,getUser}