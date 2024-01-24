const toHours = ts => {
    const unrounded = ts / (1000.0 * 60.0 * 60.0);
    return Math.round(unrounded * 100) / 100;
}

fetch("/getLeaderboard").then(data => data.json()).then(list => {
    lb = document.getElementById("leaderboard");
    
    
    
    list.forEach(entry => {
        let indicatorColor = "red";
        if (entry["working"]) indicatorColor = "green";
        lb.innerHTML += "<div class='lb-item' style='border-left: 3px solid "+indicatorColor+"'><div class='lb-name'>" + entry["name"] + "</div><div class='lb-time'>" + toHours(entry["totalTime"]) + " Hours</div>";
    });
}).catch(e => console.log(e));