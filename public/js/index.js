const toHours = ts => {
    const unrounded = ts / (1000.0 * 60.0 * 60.0);
    return Math.round(unrounded * 100) / 100;
}

fetch("/getLeaderboard").then(data => data.json()).then(list => {
    lb = document.getElementById("leaderboard");

    let cutoffAdded = false;
    
    list.forEach(entry => {
        let indicatorColor = "3px solid red";
        if (entry["working"]) indicatorColor = "5px solid green";

        const preCompHours = toHours(entry["preCompTime"]);

        // if (!cutoffAdded && preCompHours <= 15) {
        //     lb.innerHTML += "<div id='cutoff'>--------------------&emsp; Competition Hours Cut-off &emsp;--------------------</div>";
        //     cutoffAdded = true;
        // }

        lb.innerHTML += "<div class='lb-item' style='border-left: "+indicatorColor+"'><div class='lb-name'>" + entry["name"] + "</div><div class='lb-time'>" + toHours(entry["totalTime"]) + " Hours</div><div class='lb-time'>" + preCompHours + " Hours</div>";
    });
}).catch(e => console.log(e));

setInterval(() => {
    location.reload();
}, 30 * 1000);