const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/StaticRouter");
const URL = require("./models/url");
const {restrictToUserLoggedIn} = require("./middleware/userVerification");
const { connectToMongoDB } = require("./connect");


connectToMongoDB("mongodb+srv://anshumant72:NqnkK4BkdQpFpNdN@cluster0.djhgttk.mongodb.net/url-shortner").then(() => {
    console.log("connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

const app = express();
const PORT = 3000;


app.use(cors({
    origin:"*",
    optionsSuccessStatus: 200
}))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use('/url',restrictToUserLoggedIn, urlRoute);
app.use('/user',userRoute);
app.use("/home",restrictToUserLoggedIn,staticRoute);

app.get("/:shortID",async(req,res)=>{
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID
    },

        {
            $push: {
                visitedHistory: {
                    timestamp: Date.now(),
                }
            },
        }
    );
    res.redirect(entry.redirectURL);
});


app.listen(PORT, () => console.log(`Server has been started on PORT:${PORT}`));