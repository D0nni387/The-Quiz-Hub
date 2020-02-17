//Main Quiz Functions

//Start Game Variables
let start = document.getElementById("selectArea")
let catId = document.getElementById("catSubmit")

//In Progress Quiz Variables
let question = document.getElementById("question");
let questions = []; //sets blank array for API to populate
let outcomeText = document.getElementById("outcome")
let answers = Array.from(document.getElementsByClassName("answer-format"))
let currentQuestion = {}
let finished = document.getElementById("questionArea")

//End Game Variables
let showScore = document.getElementById("completedArea")
let finalScore = document.getElementById("score")
let restartQuiz = document.getElementById("restartSame")
let restartNew = document.getElementById("restartNew")

getCategories = () => {

    fetch("https://opentdb.com/api_category.php")

        .then(function (response) {
            return response.json() //Returns API Data as JSON
        })
        .then(function (category) {
            let categoryList = category.trivia_categories; //Access category list
            categoryList.forEach(function (category) {

                let categoryOption = document.createElement("option") //Creates Option Item In DOM
                let categoryName = document.createElement("p") //Creates Nested <p> tags 
                let name = document.createTextNode(category.name) //Defines name of the item

                categoryName.appendChild(name)
                categoryOption.appendChild(categoryName)
                categoryOption.id = category.id //adds id ref to <option> tag
                categoryOption.classList.add("category") //adds class to <option> tag
                document.getElementById("categoryList").appendChild(categoryOption) //items to be added to categoryList class item in DOM
            })

            catId.addEventListener('click', defineCats = () => {
                //Get Category Choice From Dropdown element
                let catChoice = document.getElementById("categoryList")
                id = catChoice.options[catChoice.selectedIndex].id
                //Get difficulty Choice From Dropdown element
                let diffChoice = document.getElementById("difficultySelect")
                diff = diffChoice.options[diffChoice.selectedIndex].id
                //Get Question Quantity
                let quantChoice = document.getElementById("questionCount")
                quant = quantChoice.options[diffChoice.selectedIndex].id
                //Hide selection area
                start.classList.add("hide")
   
                getQuiz()
            })
            
            })
            .catch(err => {
                console.error(err)
        })

}

getCategories()

getQuiz = () => {
    let started = document.getElementById("questionArea")
    started.classList.remove("hide")

    fetch(`https://opentdb.com/api.php?amount=${quant}&category=${id}&difficulty=${diff}&type=multiple`)
        .then(data => {
            return data.json() //converts received data to JSON
        })
        .then(loadedQuestions => {
            questions = loadedQuestions.results.map(loadedQuestion => {
                const formatQuestion = {
                    question: loadedQuestion.question
                }
                formatQuestion.answer = Math.floor(Math.random() * 3) + 1
                const answerChoices = [...loadedQuestion.incorrect_answers]
                answerChoices.splice(
                    formatQuestion.answer - 1, 0, loadedQuestion.correct_answer
                ) //adds correct answer into the array
                answerChoices.forEach((answer, index) => {
                    formatQuestion["choice" + (index + 1)] = answer
                })

                return formatQuestion
            })
            startGame()
        })
        .catch(err => {
            console.error(err)
        })
}

startGame = () => {
    totalQuestions = [...questions]
    score = 0
    newQuestion()
}



newQuestion = () => {
    outcomeText.innerText = ("")

    if (totalQuestions.length == 0) {
        finished.classList.add("hide")
        showScore.classList.remove("hide")
        finalScore.innerHTML = (`Congratulations you scored ${score} / ${quant}`)
    } else {
        let questionIndex = Math.floor(Math.random() * totalQuestions.length)
        currentQuestion = totalQuestions[questionIndex]
        question.innerHTML = currentQuestion.question
        answers.forEach(answer => {
            let number = answer.dataset["answer"]
            answer.innerHTML = currentQuestion["choice" + number]
        })
        totalQuestions.splice(questionIndex, 1)
        questions.splice(questionIndex, 1)
    }
}

answers.forEach(answer => {
    answer.addEventListener('click', event => {
        let selection = event.target
        let selectedAnswer = selection.dataset["answer"]

        let outcome = 'wrong'
        if (selectedAnswer == currentQuestion.answer) {
            outcome = 'correct'
            score++
        }
        selection.parentElement.classList.add(outcome)
        
        outcomeText.innerText = outcome
        setTimeout(() => {
            selection.parentElement.classList.remove(outcome)
            newQuestion()
        }, 2000)
    })
})

//Restart Quiz With Same Perams
restartQuiz.addEventListener('click', restartSame = () => {
    showScore.classList.add("hide")
    getQuiz()
})
//Restart The Application
restartNew.addEventListener('click', restartNew = () => {
    showScore.classList.add("hide")
    start.classList.remove("hide")
    getCategories()
})