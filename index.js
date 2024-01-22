
const express = require("express");
const fs = require("fs");
const {getAllUsers,getUserTime,getUserStatus,getLeaderboard,registerUser,getNameFromRandId,startUserHours} = require("./db.js");

const app = express();

const publicdir = __dirname + "/public";
app.use(express.static(publicdir, {extensions:["html"]}));

app.get("/getAllUsers", (req, res) => {
    const allUsers = getAllUsers();
    res.json(allUsers);
});

app.get("/getUserTime", (req, res) => {
    const userTime =  getUserTime(req.body["id"]);
    res.json({
        "totalTime": userTime
    });
});

app.get("/getUserStatus", (req, res) => {
    const userStatus =  getUserStatus(req.body["id"]);
    res.json({
        "status": userStatus
    });
});

app.get("/getLeaderboard", (req, res) => {
    const leaderboard = getLeaderboard();
    res.json(leaderboard)
});

app.get("/registerUser", (req, res) => {
    registerUser(req.body["id"], req.body["name"]);
});

app.get("/startUserHours", (req, res) => {
    startUserHours(req.body["id"]);
});

app.get("/endUserHours", (req, res) => {
    startUserHours(req.body["id"], startUserHours(req.body["message"]));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))