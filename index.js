
const express = require("express");
const fs = require("fs");
const {getUserTime,registerUser,getNameFromRandId} = require("./db.js");

const app = express();


const publicdir = __dirname + "/public";
app.use(express.static(publicdir, {extensions:["html"]}));

app.get("/getAllUsers", (req, res) => {
    // 

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
    
});

app.get("/registerUser", (req, res) => {
    
});

app.get("/startUserHours", (req, res) => {
    
});

app.get("/endUserHours", (req, res) => {
    
});

app.get("/clearSessions", (req, res) => {
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))

let bruh = registerUser("what", "wasd");
console.log(bruh)