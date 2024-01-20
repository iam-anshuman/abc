const {getUser } = require("../services/auth");

async function restrictToUserLoggedIn(req,res,next){
    const BearerToken = req.headers["authorization"];

    if(!BearerToken) return res.status(400).json({"status":"Failure","output":"Authentication Failed"});

    const token = BearerToken.split('Bearer ')[1];
    const user = getUser(token);

    if(!user) return res.status(400).json({"status":"Failure","Output":"No User Exist"});

    req.user = user;

    next();
}


module.exports = {restrictToUserLoggedIn};