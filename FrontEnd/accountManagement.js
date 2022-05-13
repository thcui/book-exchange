var login_user_name = null;
var user_credit = null;
var user_info_cognito = null;
var user_access_token;

function showSignUp(){
    document.getElementById('login').style.display = 'none'
    document.getElementById('signup').style.display = 'block'
}

function login() {
    login_user_name = document.getElementById("uname").value
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

        return cognito.adminInitiateAuth({
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            ClientId: '7ue5e0ui44s9oocg383v9tibhm',
            UserPoolId: 'us-east-1_grhBaeiC4',
            AuthParameters: {
                USERNAME: document.getElementById("uname").value,
                PASSWORD: document.getElementById("psw").value
            }
        }).promise().then((auth_info) => {
            console.log(auth_info)
            user_access_token=auth_info['AuthenticationResult']['AccessToken']
            return cognito.getUser({
                AccessToken: auth_info['AuthenticationResult']['AccessToken'] /* required */
            }).promise().then((user_info) => {
                user_info_cognito = user_info
                attrs=user_info_cognito['UserAttributes']
                console.log(attrs)
                if(attrs.filter(att=>att['Name']==='email_verified')[0]['Value'] === 'false'){
                    console.log("HERE?")
                    showVerifyPanel()
                }
                import_user_data()



               })
        }).catch(err => {
            if(err.name === 'UserNotConfirmedException'){
                showVerifyPanel()
            }
            else{
                alert(err)
            }
        })
    } catch (err) {
        if(err.name === 'UserNotConfirmedException'){
            showVerifyPanel()
        }
        alert(err)
    }
}


function import_user_data(){
    var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    /*user_credit = user_info_cognito['UserAttributes'].filter(att=>att['Name']==='custom:credit')[0]['Value']*/
    get_user_dynamo_information()
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
}
function signUp() {
    login_user_name = document.getElementById("uname").value
    if(document.getElementById("signup-psw1").value !==document.getElementById("signup-psw2").value ){
        alert("The password confirmation does not match.")
        return
    }
    if(document.getElementById("signup-email").value === "") {
        alert("Please enter your email.")
        return
    }
    if(!document.getElementById("signup-email").value.endsWith('@columbia.edu')) {
        alert("You have to use an email address from Columbia University (@columbia.edu)")
        return
    }
  AWS.config.region = "us-east-1"; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:618317b2-43e9-413e-9624-74f3db4be00f",
  });
  const cognito = new AWS.CognitoIdentityServiceProvider();
  try {
    cognito
      .signUp({
        ClientId: "7ue5e0ui44s9oocg383v9tibhm" /* required */,
        Password: document.getElementById("signup-psw2").value /* required */,
        Username: document.getElementById("signup-uname").value,
          UserAttributes: [
              /* required */
              {
                  Name: "email" /* required */,
                  Value: document.getElementById("signup-email").value,
              },
          ]
      }).promise()
      // .then(() => {
      //   return cognito
      //     .adminConfirmSignUp({
      //       Username: document.getElementById("signup-uname").value /* required */,
      //       UserPoolId: "us-east-1_grhBaeiC4" /* required */
      //     })
      //      .promise()
          // .then(() => {
          //   cognito
          //     .adminUpdateUserAttributes({
          //       UserAttributes: [
          //         /* required */
          //         {
          //           Name: "email" /* required */,
          //           Value: document.getElementById("signup-email").value,
          //         },
          //       ],
          //       UserPoolId: "us-east-1_grhBaeiC4",
          //       Username: document.getElementById("signup-uname").value,
          //     })
          //     .promise()
              .then(() => {
                  document.getElementById("uname").value=document.getElementById("signup-uname").value
                  document.getElementById("psw").value=document.getElementById("signup-psw2").value
                  document.getElementById('signup').style.display = 'none'
                alert("Registered Successfully");
                login();
              })
          // })
      // })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
}


function get_user_dynamo_information(){
    var apigClient = apigClientFactory.newClient();
    var params = {
        user_id: login_user_name
    };
    var additionalParams = {};
    var body = {};
    apigClient.getuserinfoGet(params, body, additionalParams)
        .then(res => {
            this.fav = res.data.favorite_list
            if (this.fav.includes(this.bookName)) {
                this.thum = true
            } else {
                this.thum = false
            }

        });
    apigClient.messageGet(params, body, additionalParams)
        .then(res => {
            console.log(res)
            this.messages = res.data.messages
        });
}
function get_user_id() {
  return login_user_name;
}


function showVerifyPanel(){
    document.getElementById('verification-panel').style.display = 'block'
}

function verifyUser(){
    const cognito = new AWS.CognitoIdentityServiceProvider();
    console.log(document.getElementById('verification-input').value)
    // cognito.verifyUserAttribute({AccessToken: user_access_token,
    //     Code: document.getElementById('verification-input').value, /* required */
    //     AttributeName:'email'}).promise().then(document.getElementById('verification-panel').style.display = 'none').catch((err) => console.log(err));
    return cognito.confirmSignUp({ClientId: '7ue5e0ui44s9oocg383v9tibhm', /* required */
        ConfirmationCode: document.getElementById('verification-input').value, /* required */
        Username: login_user_name}).promise().then(document.getElementById('verification-panel').style.display = 'none').then(import_user_data());
}