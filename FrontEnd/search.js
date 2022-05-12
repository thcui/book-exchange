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
    if (response.length == 0) {
      alert("Oops, no corresponding book was found!");
    }
    console.log(response);
    var order = getOrder();
    var condition = getCondition();
    var category = getCategory();

    var display = document.getElementById("photoContainer");
    display.innerHTML = "";

    row = document.createElement('el-row');
    row.style.gutter = "20";

    for (let i = 0; i < response["body"].length; i++) {
      var elCol = document.createElement('el-col');
      elCol.style.span = "6";
      
      var img = document.createElement('img');
      img.setAttribute('class', 'grid-content');
      img.src = response["book_cover"];
      elCol.append(img);

      var elButton = document.createElement("el-button");
      elButton.type = "text";
      elButton.onclick = function() { "dialogVisible = true"; };
      elButton.setAttribute("name", response['body'][i]["book_name"]);

      var elDialog = document.createElement("el-dialog");
      elDialog.setAttribute("visible.sync", "dialogVisible");
      elDialog.width = "800px";

      var divInner = document.createElement("div");
      divInner.setAttribute("class", "dialog");

      var divLeft = document.createElement("div");
      divLeft.setAttribute("class", "left");
      
      var innerImg = document.createElement("img");
      innerImg.setAttribute("class", "imgSize");
      innerImg.src = response["body"][i]["link"];
        
      divLeft.append(innerImg);
      divInner.append(divLeft);

      var divRight = document.createElement("img");
      divRight.setAttribute("class", "right");

      var div1 = document.createElement("div");
      div1.setAttribute("class", "line1");

      var title = document.createElement("h1");
      title.append(response["body"][i]["book_name"]);

      var divTitle = document.createElement("div");
      divTitle.onclick = "thumbup()";
      divTitle.id = "heart";
      divTitle.class = "thum ?  'is-active' : ''";
      div1.append(title);
      div1.append(divTitle);
      divRight.append(div1);

      divDiaText = document.createElement("div");
      divDiaText.setAttribute("class", "dialogText");
      divDiaText.append(response["body"][i]["desciption"]);
      divRight.append(divDiaText);
        
      div2 = document.createElement("div");
      div2.setAttribute("class", "part2");
      div2.append("this is new york");
      divRight.append(div2);

      div3 = document.createElement("div");
      div3.setAttribute("class", "part3");

      div_1 = document.createElement("div");
      div_1.style.display = "flex: 1";
        
      div_2 = document.createElement("div");
      subtitle = document.createElement("i");
      subtitle.setAttribute("class", "el-icon-user-solid");
      subtitle.append("owner:nmlgb6998");
      div_2.append(subtitle);

      elRate = document.createElement("div");
      elRate.style.disabled = "";
      // elRate.style.text-color = "#ff9900";
      elRate.setAttribute("v-model", "read_value");
        
      div_1.append(div_2);  
      div_1.append(elRate);

      div_3 = document.createElement("div");
      div_3.style.display = "flex: 1";
      div_3.append("credits:5");

      div3.append(div_1);
      div3.append(div_3);
        
      div4 = document.createElement("div");
      div4.setAttribute("class", "part4");

      elButton_1 = document.createElement("el-button");
      elButton_1.type = "primary";

      div4.append(elButton_1);
        
      divRight.append(div1);
      divRight.append(div2);
      divRight.append(div3);
      divRight.append(div4);

      divInner.append(divLeft);
      divInner.append(divRight);

      elDialog.append(divInner);

      elCol.append(elButton);
      elCol.append(elDialog);

      row.appendChild(elCol);
    }
    display.appendChild(row);
    //TODO: How to use sortBy order to display img
    //TODO: How to use category to display img
    //TODO: How to use min requirement to display img
  }).catch(function (result) {
    console.log(result);
  })
}

function getOrder() {
  console.log("return order selection");
  return document.getElementById("selectOrder").label;
}

function getCategory() {
  return document.getElementById("selectCategory").label;
}

function getCondition() {
  return document.getElementById("selectCondition").label;
}
