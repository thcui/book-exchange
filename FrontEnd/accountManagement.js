var login_user_name = null

var user_credit = null
var user_info_cognito = null

function login() {
    /* Set AWS to read DB*/
    // Load the AWS SDK for Node.js
    /*var AWS = require('aws-sdk');*/
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:618317b2-43e9-413e-9624-74f3db4be00f',
    });
    try {
        const cognito = new AWS.CognitoIdentityServiceProvider()
        // Create DynamoDB document client
        var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        return cognito.adminInitiateAuth({
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            ClientId: '3erlabfk978and45jb9rhq3ai2',
            UserPoolId: 'us-east-1_uDFJ9JkrJ',
            AuthParameters: {
                USERNAME: document.getElementById("uname").value,
                PASSWORD: document.getElementById("psw").value
            }
        }).promise().then((auth_info) => {
            console.log(auth_info)
            return cognito.getUser({
                AccessToken: auth_info['AuthenticationResult']['AccessToken'] /* required */
            }).promise().then((user_info) => {
                user_info_cognito = user_info
                console.log(user_info_cognito['UserAttributes'])
                /*user_credit = user_info_cognito['UserAttributes'].filter(att=>att['Name']==='custom:credit')[0]['Value']*/
                login_user_name = document.getElementById("uname").value
                var params = {
                    ExpressionAttributeValues: {
                      ':s': login_user_name,
                     },
                   KeyConditionExpression: 'user_id = :s',
                   TableName: 'user-information'
                  };


                docClient.query(params, function(err, data) {
                    console.log(data.Items[0]['current_credit']);
                    if (err) {
                      console.log("Error", err);
                    } else {
                      console.log("Success", data.Items);
                      user_credit = data.Items[0]['current_credit'];
                      document.getElementById('login').style.display = 'none'
                      document.getElementById('login-button').innerHTML = '<i class="el-icon-user"></i>' + login_user_name + '<i class="el-icon-coin"></i>' + 'Credit: ' + user_credit
                    }
                  });

               })
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
                cognito.adminUpdateUserAttributes({
                    UserAttributes: [ /* required */
                        {
                            Name: "custom:credit", /* required */
                            Value: "0"
                        }
                    ],
                    UserPoolId: 'us-east-1_uDFJ9JkrJ',
                    Username: document.getElementById("uname").value
                }).promise().then(() => {
                    alert("Registered Successfully");
                    login()
                })
            })
        }).catch(err => alert(err))
    } catch (err) {
        alert(err)
    }
}

function get_user_id() {
    return login_user_name
}