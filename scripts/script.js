
//fetch("https://opentdb.com/api_category.php")
  //  .then(function (response) {
    //    return response.json(); //Returns API Data as JSON
    //})
    //.then(function (category) { 
      //  let categoryList = category.trivia_categories; //Access category list
        //categoryList.forEach(function (category) {

          //  let categoryOption = document.createElement("option"); //Creates Option Item In DOM
            //let categoryName = document.createElement("p"); //Creates Nested <p> tags 
            //let name = document.createTextNode(category.name); //Defines name of the item
            
           // categoryName.appendChild(name);
           // categoryOption.appendChild(categoryName);
            //categoryOption.id = category.id; //adds id ref to <option> tag
            //categoryOption.classList.add("category"); //adds class to <option> tag
            //document.getElementById("categoryList").appendChild(categoryOption); //items to be added to categoryList class item in DOM
       // });
    //});

let question = document.getElementById("question"); 

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple")
    .then(data => {
        return data.json()
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions)
    })



