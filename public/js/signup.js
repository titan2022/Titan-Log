const register = () => {
    id = document.getElementById("id-input").value;
    name = document.getElementById("name-input").value;
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
            "name": name
        }),
    }).then(() => {}).catch(e => console.log(e));
}