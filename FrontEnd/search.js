// function to do the search and display the images in front end
function searchPhoto() {
  var query = document.getElementById("searchContent").value;
  if (query === "") {
    alert("Please input the name for your book.");
    return;
  }
  console.log(query);

  //initialize apigclient and related parameters
  var apigClient = apigClientFactory.newClient({
    apiKey: "DZbM31zNmQ6yIX0cYXLul5QK72JoMVmA72sDXTSE"
  });
  var params = {
    book_name: query,
    "x-api-key": "DZbM31zNmQ6yIX0cYXLul5QK72JoMVmA72sDXTSE"
  };
  var body = {}
  var additionalParams = {
    headers: {
      "x-api-key": "DZbM31zNmQ6yIX0cYXLul5QK72JoMVmA72sDXTSE"
    }
  }
  
  apigClient.searchGet(params, body, additionalParams).then(function (response) {
    result = response.data;
    console.log(result.length);
    this.info = result;
    var order = getOrder();
    var condition = getCondition();
    var category = getCategory();



  }).catch(function (result) {
    console.log(result);
  })
}

function getOrder() {

}

function getCategory() {
  return document.getElementById("selectCategory").label;
}

function getCondition() {
  return document.getElementById("selectCondition").label;
}
