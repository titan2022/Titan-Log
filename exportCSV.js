const fs = require("fs");

let csvOutput = "Name,Hours,Last Day,# of Days,Messages\r\n";

const data = fs.readFileSync("./db.json");
const content = JSON.parse(data);

const toEpoch = dateStr => new Date(dateStr).getTime();

Object.keys(content).forEach(key => {
	const user = content[key];

	let lastDay = "0000/00/00";
	let lastDayTime = 0;

	let days = new Set();

	let messagesStr = "";

	user["logs"].forEach(log => {
		days.add(log["date"]);
		messagesStr += log["message"].replaceAll(",", "") + " ... ";

		let dayEpoch = toEpoch(log["date"]);
		if (dayEpoch > lastDayTime) {
			lastDayTime = dayEpoch;
			lastDay = log["date"];
		}
	});

	csvOutput += `${user["name"]},${user["totalTime"] / 1000.0 / 60.0 / 60.0},${lastDay},${days.size},${messagesStr}\r\n`
});


fs.writeFile("./db.csv", csvOutput, (err) => {
	if (err) throw err;
});