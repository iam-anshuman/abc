const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/",async (req,res)=>{

    if(!req.user) return res.status(400).json({"status":"Failure","output":"Kindly Log in"});

    const allURLs= await URL.find({createdBy:req.user.id});

    res.status(200).json({"status":"Successs","URLs":allURLs,user:req.user});
});

module.exports = router;