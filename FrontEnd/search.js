// function to do the search and display the images in front end
function searchPhoto() {
  var query = document.getElementById("searchContent").value;
  if (query === "") {
    alert("Please input the name for your book.");
    return;
  }
  console.log(query);
  
  //TODO: get the value from select input
  var body = {
    book_name: query,
  }
  
  //initialize apigclient and related parameters
  var apigClient = apigClientFactory.newClient({
    apiKey: "DZbM31zNmQ6yIX0cYXLul5QK72JoMVmA72sDXTSE"
  });
  var params = {
    "x-api-key": "DZbM31zNmQ6yIX0cYXLul5QK72JoMVmA72sDXTSE"
  };
  
  var additionalParams = {
    headers: {
      "x-api-key": "DZbM31zNmQ6yIX0cYXLul5QK72JoMVmA72sDXTSE"
    }
  }
  
  apigClient.searchGet(params, body, additionalParams).then(function (result) {
    response = result.data;
    if (response.length == 0) {
      alert("Oops, no corresponding book was found!");
    }
    console.log(response);
    var order = getOrder();
    var condition = getCondition();
    var category = getCategory();
    //TODO: Display the book info in the frontend
    //TODO: How to use sortBy order to display img
    //TODO: How to use category to display img
    //TODO: How to use min requirement to display img
  }).catch(function (result) {
    console.log(result);
  })
}

function getOrder() {
  return document.querySelector("#selectOrder").value;
}

function getCategory() {
  return document.querySelector("#selectOrder").value;
}

function getCondition() {
  return document.querySelector("#selectOrder").value;
}
