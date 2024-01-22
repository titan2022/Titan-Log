fetch("/getAllUsers").then(allUsers => {
    drop = document.getElementById("members");
    for (var i = 0; i < allUsers.length; i++) {
        drop.innerHTML += allUsers[i];
    }
}).catch(e => console.log(e));