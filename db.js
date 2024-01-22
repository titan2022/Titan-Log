const fs = require("fs");

module.exports = {
    getUserTime: (id) => {
        return new Promise((resolve) => {
            fs.readFile('./db.json', (err, data) => {
                if (err) {
                    throw err;
                }
                const content = JSON.parse(data);

                if (content[id] == undefined) {
                    resolve(null);
                } 
                
                resolve(content[id]["totalTime"]);
            });
        });
    },

    getLeaderboard: () => {
        return new Promise((resolve) => {
            fs.readFile('./db.json', (err, data) => {
                if (err) {
                    throw err;
                }
                const content = JSON.parse(data);

                let unsortedList = [];
                
                Object.keys(content).forEach(key => {
                    const value = content[key];

                    unsortedList.push({
                        "name": value["name"],
                        "totalTime": value["totalTime"]
                    });
                });
                
                const sortedList = unsortedList.sort((a, b) => b["totalTime"] - a["totalTime"]);

                resolve(sortedList);
            });
        });
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
    
    
    
        return new Promise((resolve) => {
            fs.readFile('./db.json', (err, data) => {
                if (err) {
                    throw err;
                }
                let content = JSON.parse(data);
                let newId = makeid(7);
            
                while (content[newId] != undefined) {
                    newId = makeid(7);
                }
                
                content[newId] = {
                    "name": name,
                    "totalTime": 0,
                    "schoold": id,
                    "working": false,
                    "logs": []
                    
                }

                fs.writeFile('./db.json', JSON.stringify(content), (err) => {
                    if (err) throw err;
                });

                resolve(content[newId]);
            });
        });
    },

    startUserHours: (id) => {
        return new Promise((resolve) => {
            fs.readFile('./db.json', (err, data) => {
                if (err) {
                    throw err;
                }
                let content = JSON.parse(data);

                if (content[id] == undefined) {
                    resolve(null);
                    return;
                } 

                content[id]["working"] = true;
                content[id]["logs"].push({
                    "date": new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
                    "startHour": Date.now()
                });

                fs.writeFile("./db.json", JSON.stringify(content), (err) => {
                    if (err) throw err;
                });

                resolve(true);
            });
        });
    },

    endUserHours: (id, message) => {
        return new Promise((resolve) => {
            fs.readFile('./db.json', (err, data) => {
                if (err) {
                    throw err;
                }
                let content = JSON.parse(data);

                if (content[id] == undefined) {
                    resolve(null);
                    return;
                } 

                contentp[id]["working"] = false;
                content[id]["logs"].at(-1)["endHour"] = Date.now();
                content[id]["logs"].at(-1)["message"] = message;

                fs.writeFile("./db.json", JSON.stringify(content), (err) => {
                    if (err) throw err;
                });

                resolve(true);
            });
        });
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
    
    getNameFromRandId: (randId) => {
        return new Promise((resolve) => {
            fs.readFile('./db.json', (err, data) => {
                if (err) {
                    throw err;
                }
                let content = JSON.parse(data);

                if (content[randId] == undefined) {
                    resolve(null);
                    return;
                } 

                

                
               
                resolve(content[randId]["name"]);
            });
        });
    },
}