var donation_photos_list = [];
var donation_photos_links = [];

function makeDonation() {
    const bookNameInput = document.querySelector("#bookNameInput").value;
    if (bookNameInput === "") {
        alert("Please input the name for your book.");
        return;
    }
    if (login_user_name == null) {
        request_login()
        return;
    }

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
    uploadImg()
    dateTime = get_current_time();
    user_id = get_user_id();
    //TODO: find a better way to get the credit value
    var body = {
        donation_id: user_id + "-" + dateTime,
        book_name: bookNameInput,
        user_id: user_id,
        condition: get_condition(),
        photos_links: donation_photos_links,
        credit: parseInt(
            document.querySelector("#credit-required .el-input .el-input__inner")
                .ariaValueNow
        ),
    };
    console.log(body);
    donation_photos_list=[]
    donation_photos_links=[]
    // let url ="https://ebs239nacc.execute-api.us-east-1.amazonaws.com/dev"
    apigClient.donatePost(params, body, additionalParams).then((response) => {
        alert(
            'Donated "' + bookNameInput + '" Successfully! Thanks for your support!'
        );
    });
}

function get_current_time() {
    var today = new Date();
    var date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time =
        today.getHours() +
        "-" +
        today.getMinutes() +
        "-" +
        today.getSeconds() +
        "-" +
        today.getTimezoneOffset();
    var dateTime = date + "-" + time;
    return dateTime;
}

function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1000) ||
        0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
            //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
}

function get_condition() {
    return document
        .querySelector("#book_condition .is-active .el-radio-button__orig-radio")
        .getAttribute("value");
}

function uploadImg() {
    for (let photo of donation_photos_list) {

        console.log(photo)
        console.log(photo['raw'])

        let additionalParams = {
            headers: {
                "Content-Type": photo['raw']['type'],
            },
        };

        uuid = generateUUID()

        let url =
            "https://z7xnekbzrd.execute-api.us-east-1.amazonaws.com/dev/donate/photos/" +
            uuid + photo.name;
        donation_photos_links.push(uuid+photo.name)

        axios.post(url, photo['raw'], additionalParams)
    }
}

function request_login() {
    alert("Please login to your account first.");
    document.getElementById("login").style.display = "block";
    return;
}
