var login_user_name = null

var user_credit = null

function login() {
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:618317b2-43e9-413e-9624-74f3db4be00f',
    });
    try {
        const cognito = new AWS.CognitoIdentityServiceProvider()
        return cognito.adminInitiateAuth({
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            ClientId: '3erlabfk978and45jb9rhq3ai2',
            UserPoolId: 'us-east-1_uDFJ9JkrJ',
            AuthParameters: {
                USERNAME: document.getElementById("uname").value,
                PASSWORD: document.getElementById("psw").value
            }
        }).promise().then(() => {
            login_user_name = document.getElementById("uname").value
            document.getElementById('login').style.display = 'none'
            document.getElementById('login-button').innerHTML='<i class="el-icon-user"></i>'+ login_user_name+'<i class="el-icon-coin"></i>'+'Credit: '+user_credit
        }).catch(err => alert(err))
    } catch (err) {
        alert(err)
    }
}

function signUp() {
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:618317b2-43e9-413e-9624-74f3db4be00f',
    });
    const cognito = new AWS.CognitoIdentityServiceProvider()
    try {
        cognito.signUp({
            ClientId: '3erlabfk978and45jb9rhq3ai2', /* required */
            Password: document.getElementById("psw").value,/* required */
            Username: document.getElementById("uname").value
        }).promise().then(() => {
            return cognito.adminConfirmSignUp({
                Username: document.getElementById("uname").value, /* required */
                UserPoolId: 'us-east-1_uDFJ9JkrJ'/* required */
            }).promise().then(() => {
                alert("Registered Successfully");
                login()
            })
        }).catch(err => alert(err))
    } catch (err) {
        alert(err)
    }
}

function get_user_id() {
    return login_user_name
}