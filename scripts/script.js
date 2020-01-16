let baseURL = "https://opentdb.com/api.php?amount="


fetch("https://opentdb.com/api_category.php")
    .then(function (response) {
        return response.json();
    })
    