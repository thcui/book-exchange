var searchResult = []
var condition_option = [ "Poor", "Fair", "Good", "Very Good", "As New"]

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
    //TODO: how to update info in the frontend part
    result = response.data;
    searchResult = result;
    console.log(result.length);
    this.info = result;
    console.log(this.info);
  }).catch(function (result) {
    console.log(result);
  })
}

function filter() {
  this.info = searchResult;
  filterByOrder();
  filterByCategory();
  filterByCondition();
}

function filterByOrder() {

}

function filterByCategory() {
  var newInfo = [];
  for (var i = 0; i < this.info.length; i++) {
    if (this.info[i].genres.indexOf(this.display.category) > -1) {
      newInfo.push(this.info[i]);
    }
  }
  this.info = newInfo;
}

function filterByCondition() {
  var newInfo = [];
  for (var i = 0; i< this.info.length; i++) {
    book_value = condition_option.indexOf(this.info[i].condition);
    re = condition_option.indexOf(this.display.min_requirement);
    if (book_value >= re) {
      newInfo.push(this.info[i]);
    }
  }
  this.info = newInfo;
}