const fs = require("fs");
const {endUserHours} = require("./db.js");
const { Console } = require("console");

// default message for mass sign out
const signOutMessage = "Member forgot to sign out at end of session; manually signed out by lab closer"


const data = fs.readFileSync('./db.json');
        const content = JSON.parse(data);

        let userList = [];
        Object.keys(content).forEach(key => {
            
            if (content[key]["working"] == true) {
                endUserHours(key, signOutMessage)
                console.log(content[key]["name"] + " auto attempt sign out")
            }
            
            
        });