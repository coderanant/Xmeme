document.addEventListener("DOMContentLoaded", () => {
    $.get('/memes', (res) => {
        var allMemes = "";
        res.forEach((i) => {
            allMemes += `<div id = "${i._id}">
            <img src = "${i.url}" width="300" height="300">
            <h3>Submitted by : ${i.name}</h3>
            <p>Caption : ${i.caption} </p>
            </div>` 
        });
        document.getElementById('memeList').innerHTML = allMemes;
    });
});