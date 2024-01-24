let id;
let usersDict = {};

fetch("/getAllUsers").then(data => data.json()).then(allUsers => {
    drop = document.getElementById("users");
    for (var i = 0; i < allUsers.length; i++) {
        drop.innerHTML += "<option value='" + allUsers[i]["name"] + "'></option>";
        usersDict[allUsers[i]["name"]] = allUsers[i]["id"];
    }
}).catch(e => console.log(e));

const endUserHours = async () => {
    await fetch("/endUserHours", {
        method: "POST",
        mode: "cors",
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
            "id": id,
            "message": document.getElementById("message-input").value
        }),
    });
    
    alert("Hours submitted!");
    window.location.href = "/";
}

const signIn = async () => {
    const name = document.getElementById("name-input").value;
    id = usersDict[name];

    const statusRes = await fetch("/getUserStatus", {
        method: "POST",
        mode: "cors",
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
            "id": id
        }),
    });
    const status = (await statusRes.json())["status"];
    
    document.getElementById("signin-button").style.display = "none";

    if (status) {
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("option-container");
        document.getElementById("next-step").appendChild(optionContainer);

        const inputLabel = document.createElement("div");
        inputLabel.innerHTML = "Task(s) completed: ";
        inputLabel.classList.add("option-label");
        optionContainer.appendChild(inputLabel);

        const messageInput = document.createElement("input");
        messageInput.id = "message-input";
        messageInput.classList.add("option-input");
        optionContainer.appendChild(messageInput);

        const submitBtn = document.createElement("div");
        submitBtn.innerHTML = "Submit Hours";
        submitBtn.onclick = () => endUserHours();
        submitBtn.classList.add("button");
        document.getElementById("next-step").appendChild(submitBtn);

        return;
    }

    await fetch("/startUserHours", {
        method: "POST",
        mode: "cors",
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
            "id": id
        }),
    });

    alert("Started hours!");
    window.location.href = "/";
}