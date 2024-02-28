
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const {getAllUsers,getUserTime,getUserStatus,getUserId,getLeaderboard,registerUser,getNameFromRandId,startUserHours,endUserHours} = require("./db.js");

const app = express();

const publicdir = __dirname + "/public";
app.use(express.static(publicdir, {extensions:["html"]}));
app.use(bodyParser.json())

app.get("/getAllUsers", (req, res) => {
    const allUsers = getAllUsers();
    res.json(allUsers);
});

app.post("/getUserTime", (req, res) => {
    const userTime = getUserTime(req.body["id"]);
    res.json(userTime);
});

app.post("/getUserStatus", (req, res) => {
    const userStatus =  getUserStatus(req.body["id"]);
    res.json({
        "status": userStatus
    });
});

app.get("/getLeaderboard", (req, res) => {
    const leaderboard = getLeaderboard("preCompTime");
    res.json(leaderboard)
});

app.post("/registerUser", (req, res) => {
    registerUser(req.body["id"], req.body["name"]);
    res.json({});
});

app.post("/startUserHours", (req, res) => {
    startUserHours(req.body["id"]);
    res.json({});
});

app.post("/endUserHours", (req, res) => {
    endUserHours(req.body["id"], req.body["message"]);
    res.json({});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))