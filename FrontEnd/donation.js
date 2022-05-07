function makeDonation() {
    if (login_user_name == null) {
        alert('Please login to your account first.')
        document.getElementById('login').style.display = 'block'
        return
    }
    const bookNameInput = document.querySelector("#bookNameInput").value
    let labels = [];
    let list = document.getElementById("labelInput").value;
    labels.push(list);


    var apigClient = apigClientFactory.newClient({
        apiKey: "DZbM31zNmQ6yIX0cYXLul5QK72JoMVmA72sDXTSE",
    });
    var params = {
        "x-api-key": "DZbM31zNmQ6yIX0cYXLul5QK72JoMVmA72sDXTSE",
    };
    var additionalParams = {
        headers: {
            "x-api-key": "DZbM31zNmQ6yIX0cYXLul5QK72JoMVmA72sDXTSE",
        },
    };

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds() + "-" + today.getTimezoneOffset();
    var dateTime = date + '-' + time;

    user_id = get_user_id()
    var body = {
        'donation_id': user_id + '-' + dateTime,
        'book_name': bookNameInput,
        'user': user_id
    }
    // let url ="https://ebs239nacc.execute-api.us-east-1.amazonaws.com/dev"
    apigClient.donatePost(params, body, additionalParams).then((response) => {
        alert('Donated \"' + bookNameInput + '\" Successfully! Thanks for your support!')
    })
}

function uploadImg() {
    const imageInput = document.querySelector("#imageInput");
    const file = imageInput.files[0];
    let labels = [];
    let list = document.getElementById("labelInput").value;
    labels.push(list);
    let additionalParams = {
        headers: {
            "Content-Type": file.type,
            "x-amz-meta-customLabels": labels,
            "x-api-key": "???",
        },
    };

    let url =
        "https://xrhrtsrjca.execute-api.us-east-1.amazonaws.com/dev/donate/photos/" +
        file.name;

    axios.put(url, file, additionalParams).then((response) => {
        alert("Image uploaded: " + file.name);
    });

    let imageUrl = "https://book-exchange-book-photos-bucket.s3.amazonaws.com/" + file.name;
    let timer = setTimeout(() => {
        var div = document.createElement("div");
        var img = document.createElement("img");
        img.src = imageUrl;
        img.width = 500;
        img.setAttribute("class", "img");
        div.append(img);
        var x = ele.appendChild(div);
        x.style.padding = "10px";
        clearTimeout(timer);
    }, 1000);
}
