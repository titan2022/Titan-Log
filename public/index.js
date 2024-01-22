function newUser() {
    id = document.getElementById("id").innerText
    n = document.getElementById("name").innerText
    fetch("/registerUser", {
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
            "name": n
        }),
    }).then(() => {}).catch(e => console.log(e));
}
