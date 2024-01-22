fetch("/getAllUsers").then(allUsers => {
    drop = document.getElementById("members");
    for (var i = 0; i < allUsers.length; i++) {
        drop.innerHTML += "<option value='" + allUsers[i]["name"] + "'></option>";
    }
}).catch(e => console.log(e));