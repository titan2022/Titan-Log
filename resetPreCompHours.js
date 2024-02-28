const fs = require("fs");
const {resetPreCompHours} = require("./db.js");

const data = fs.readFileSync('./db.json');
const content = JSON.parse(data);

Object.keys(content).forEach(key => {
    resetPreCompHours(key)
});