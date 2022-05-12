function makeRequest(d_id) {
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
    console.log("hiiii make rquest");

    user_id = get_user_id()
    book_id = d_id //get_book_id()
    //TODO: find a better way to get the credit value
    var body = {
        'userName': user_id,
        'bookId': book_id
    }
    console.log(body)
    user_images_list={}

    var ret = apigClient.requestPost(params, body, additionalParams).then((response) => {
        alert('Request \"' + book_id + '\" Successfully! Thanks for your support!')
    }).catch(err => alert('Request \"' + book_id + '\" Failed, not enough credit or book already unavailable'));

}
