const fs = require("fs");

module.exports = {
    getAllUsers: () => {
        const data = fs.readFileSync('./db.json');
        const content = JSON.parse(data);

        let userList = [];
        Object.keys(content).forEach(key => {
            userList.push({
                "name": content[key]["name"],
                "id": key
            });
        });

        return userList;
    },

    getUserTime: (id) => {
        fs.readFile('./db.json', (err, data) => {
            if (err) {
                throw err;
            }
            const content = JSON.parse(data);

            if (content[id] == undefined) {
                return null;
            }

            return {
                "totalTime": content[id]["totalTime"],
                "preCompTime": content[id]["preCompTime"]
            };
        });
    },

    getUserStatus: (id) => {
        const data = fs.readFileSync('./db.json');
        const content = JSON.parse(data);

        if (content[id] == undefined) {
            return null;
        }

        return content[id]["working"];
    },

    getLeaderboard: (sorting) => {
        const data = fs.readFileSync('./db.json');

        const content = JSON.parse(data);

        let unsortedList = [];

        Object.keys(content).forEach(key => {
            const value = content[key];

            let unfinishedTime = 0;

            value["logs"].forEach(entry => {
                if (entry["endHour"] == undefined) {
                    unfinishedTime += Date.now() - entry["startHour"];
                }
            });

            unsortedList.push({
                "name": value["name"],
                "totalTime": value["totalTime"] + unfinishedTime,
                "preCompTime": value["preCompTime"] + unfinishedTime,
                "working": value["working"]
            });
        });

        const sortedList = unsortedList.sort((a, b) => b[sorting] - a[sorting]);

        return sortedList;
    },

    registerUser: (id, name) => {
        function makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }

        let data = fs.readFileSync('./db.json', (err) => {
            if (err) throw err
        })

        let content = JSON.parse(data);
        let newId = makeid(7);

        while (content[newId] != undefined) {
            newId = makeid(7);
        }

        content[newId] = {
            "name": name,
            "totalTime": 0,
            "preCompTime": 0,
            "schoold": id,
            "working": false,
            "logs": []
        }

        fs.writeFileSync('./db.json', JSON.stringify(content), (err) => {
            if (err) throw err;
        });

        return content[newId];
    },

    startUserHours: (id) => {
        fs.readFile('./db.json', (err, data) => {
            if (err) {
                throw err;
            }
            let content = JSON.parse(data);

            if (content[id] == undefined) {
                return null;
            }

            content[id]["working"] = true;
            content[id]["logs"].push({
                "date": new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
                "startHour": Date.now()
            });

            fs.writeFile("./db.json", JSON.stringify(content), (err) => {
                if (err) throw err;
            });

            return true;
        });
    },

    endUserHours: (id, message) => {
        let data = fs.readFileSync('./db.json', (err) => {
            if (err) {
                throw err;
            }
        })

        let content = JSON.parse(data);

        if (content[id] == undefined) {
            return;
        }

        console.log(id + "Signed out: " + message)

        content[id]["working"] = false;
        content[id]["logs"].at(-1)["endHour"] = Date.now();
        content[id]["logs"].at(-1)["message"] = message;

        content[id]["totalTime"] += content[id]["logs"].at(-1)["endHour"] - content[id]["logs"].at(-1)["startHour"]
        content[id]["preCompTime"] += content[id]["logs"].at(-1)["endHour"] - content[id]["logs"].at(-1)["startHour"]

        fs.writeFileSync("./db.json", JSON.stringify(content), (err) => {
            if (err) throw err;
        });

        return true;
    },

    resetPreCompHours: (id) => {
        let data = fs.readFileSync('./db.json', (err) => {
            if (err) {
                throw err;
            }
        })
        
        let content = JSON.parse(data);

        if (content[id] == undefined) {
            return;
        }
        
        content[id]["preCompTime"] = 0;

        fs.writeFileSync("./db.json", JSON.stringify(content), (err) => {
            if (err) throw err;
        });

        return true;
    },

    clearSessions: () => {
        fs.readFile('./db.json', (err, data) => {
            if (err) {
                throw err;
            }
            let content = JSON.parse(data);

            Object.keys(content).forEach(key => {
                const value = content[key];

                let i = value["logs"].length;
                while (i--) {
                    const log = value["logs"][i];
                    if (log["endHour"] == undefined) {
                        value["logs"].splice(i, 1);
                    }
                }
            });

            fs.writeFile("./db.json", JSON.stringify(content), (err) => {
                if (err) throw err;
            });
        });
    },

    getNameFromRandId: function (randId) {

        let data = fs.readFileSync('./db.json');
        let content = JSON.parse(data);

        if (content[randId] == undefined) {

            return undefined;
        }
        return content[randId]["name"]




    }
}