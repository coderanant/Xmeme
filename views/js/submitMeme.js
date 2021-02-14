$('#submit').on('click', function (e) {
    var memeName = $('#memeName').val();
    var caption = $('#caption').val();
    var url = $('#url').val();
    e.preventDefault()
    if (!memeName || !caption || !url) {
        alert('Please make sure all fields are properly filled')
    };
    $.ajax({
        url: "/memes",
        type: "POST",
        "timeout": 0,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({url,caption,"name":memeName})
    }).done(function (response) {
        console.log(response);
        if ('id' in response) {
            var allMemes = document.getElementById('memeList').innerHTML;
            allMemes = `<div id = "${response.id}">
            <img src = "${url}" width="300" height="300">
            <h3>Submitted by : ${memeName}</h3>
            <p>Caption : ${caption} </p>
            </div>` + allMemes;
            document.getElementById('memeList').innerHTML = allMemes;
        } else {
            alert('Error 404, data could not be added');
        };
    });
})