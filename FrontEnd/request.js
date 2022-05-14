function makeRequest(d_id) {
  var apigClient = apigClientFactory.newClient();
  var params = {};
  var additionalParams = {};

  user_id = get_user_id();
  book_id = d_id; //get_book_id()
  //TODO: find a better way to get the credit value
  var body = {
    userName: user_id,
    bookId: book_id,
  };
  user_images_list = {};

  var ret = apigClient
    .requestPost(params, body, additionalParams)
    .then((response) => {
      alert('Request "' + book_id + '" Successfully! Thanks for your support!');
      console.log(response['data']['user_credit'])
      document.getElementById('login-button').innerHTML = '<i class="el-icon-user"></i>' + login_user_name + '<i class="el-icon-coin"></i>' + 'Credit: ' + response['data']['user_credit']

    })
    .catch((err) =>
      alert(
        'Request "' +
          book_id +
          '" Failed, not enough credit or book already unavailable'
      )
    );
}
