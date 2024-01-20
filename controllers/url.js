const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortURL (req,res){
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({error : "URL is required"});
    } else{

        const shortID = shortid(8);
        await URL.create({
            shortID: shortID,
            redirectURL: body.url,
            visitedHistory:[],
            createdBy:req.user.id
        });
        return res.json({
            id: shortID
});
    }
}

async function getAnalytics(req,res){
    const UserId = req.user.id;
    const URLS = await URL.find({createdBy:UserId});

    res.status(200).json(URLS); 
}

module.exports = {
    handleGenerateShortURL,
    getAnalytics
}