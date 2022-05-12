var current_recipient=""


function sendMessage(){
    params={}
    var apigClient = apigClientFactory.newClient();
    var additionalParams = {};
    var body = {
        "sender":login_user_name,
        "recipient":current_recipient,
        "content":document.getElementById("message_input").value
    };
    closeForm()
    apigClient.messagePost(params, body, additionalParams)
        .then(res => {
            console.log(res)
            this.messages = res.data.messages
        });
}


function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}