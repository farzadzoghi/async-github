submitButton = document.querySelector('input[type="submit"]');
searchInput = document.querySelector('input[type="text"]');



// loaded event
document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("https://api.github.com/users");
    const data = await res.json();
    showUsers(data);
    //search event
    searchInput.addEventListener("keyup", (e) => {
        searchData = data.filter((item) => item.login.toLowerCase().includes(e.target.value.toLowerCase()) );
        showUsers(searchData, e.target.value);
    });
})

function showUsers(data, key=""){
    document.querySelector(".loading").style.display = "";
    document.querySelector(".list-body").style.display = "none";
    if(!data.length){
        document.querySelector(".users-list").innerHTML = `<h3 class="col-12 py-3 text-center border ">Nothing Found</h3>`;
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".list-body").style.display = "";
        return
    }
    cards = "";
    data.forEach(element => {
        if(!key){
            cards += 
            `
            <div class="col-4 py-3 text-center border">
                <img src="${element.avatar_url}" alt="${element.login}" class="rounded-circle my-2 img-thumbnail" width="100px">
                <h3>${element.login}</h3>
                <a href="${element.html_url}" class="btn btn-success" target="_blank">View Profile</a>
            </div>
            `
        }
        else{
            let tmpElement = String(element.login);
            let tmpString = `<b>${key}</b>`;
            tmpElement = tmpElement.replace(RegExp(key, "gi"), tmpString);
            cards += 
            `
            <div class="col-4 py-3 text-center border">
                <img src="${element.avatar_url}" alt="${element.login}" class="rounded-circle my-2 img-thumbnail" width="100px">
                <h3>${tmpElement}</h3>
                <a href="${element.html_url}" class="btn btn-success" target="_blank">View Profile</a>
            </div>
            `
        }
    });

    document.querySelector(".users-list").innerHTML = cards;
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".list-body").style.display = "";
}

