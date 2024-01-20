const express = require("express");
const { handleGenerateShortURL,getAnalytics } = require("../controllers/url");

const router = express.Router();


router.post("/",handleGenerateShortURL);

router.get("/analytics",getAnalytics);

module.exports = router;

