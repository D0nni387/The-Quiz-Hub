<<<<<<< HEAD
const length = 10
=======
let baseURL = "https://opentdb.com/api.php?amount="

>>>>>>> parent of 30063b0... Updated base url and fetch template

fetch("https://opentdb.com/api_category.php")
    .then(function (response) {
        return response.json(); //Returns API Data as JSON
    })
    .then(function (category) { 
        let categoryList = category.trivia_categories; //Access category list
        categoryList.forEach(function (category) {

            let categoryOption = document.createElement("option"); //Creates Option Item In DOM
            let categoryName = document.createElement("p"); //Creates Nested <p> tags 
            let name = document.createTextNode(category.name); //Defines name of the item
            
            categoryName.appendChild(name);
            categoryOption.appendChild(categoryName);
            categoryOption.id = category.id; //adds id ref to <option> tag
            categoryOption.classList.add("category"); //adds class to <option> tag
            document.getElementById("categoryList").appendChild(categoryOption); //items to be added to categoryList class item in DOM
        });
<<<<<<< HEAD
    });



function getSelection(id, length) {
    let baseURL = "https://opentdb.com/api.php?amount=";
    let fetchQuiz = baseURL + length + "&category=" + id + "&type=multiple";

    fetch(fetchQuiz)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            newQuiz(data.results);
        });
}
=======
    })
>>>>>>> parent of 30063b0... Updated base url and fetch template
