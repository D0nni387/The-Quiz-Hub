//Main Quiz Functions

//Start Game Variables
const start = document.getElementById("selectArea")
const catId = document.getElementById("catSubmit")
const loading = document.getElementById("loading")
const catChoice = document.getElementById("categoryList")
const started = document.getElementById("questionArea")
const question = document.getElementById("question");
const quantChoice = document.getElementById("questionCount")
const diffChoice = document.getElementById("difficultySelect")
const showScore = document.getElementById("completedArea")
const finalScore = document.getElementById("score")
const restartQuiz = document.getElementById("restartSame")
const restartNew = document.getElementById("restartNew")

let answers = Array.from(document.getElementsByClassName("answer"))
let finished = document.getElementById("questionArea")
let questions = []; //sets blank array for API to populate
let currentQuestion = {}


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
                
                id = catChoice.options[catChoice.selectedIndex].id
                //Get difficulty Choice From Dropdown element
                
                diff = diffChoice.options[diffChoice.selectedIndex].id
                //Get Question Quantity
                
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
    loading.classList.remove("hide")

    fetch(`https://opentdb.com/api.php?amount=${quant}&category=${id}&difficulty=${diff}&type=multiple`)
        .then(data => {
            return data.json() //converts received data to JSON
        })
        .then(loadedQuestions => {
            questions = loadedQuestions.results.map(loadedQuestion => {
                const formatQuestion = {
                    question: loadedQuestion.question
                }
                //Populates answers array and randomises answer locations
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
    started.classList.remove("hide")
    loading.classList.add("hide")

}



newQuestion = () => {

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

        let outcome = 'incorrect'
        if (selectedAnswer == currentQuestion.answer) {
            outcome = 'correct'
            score++
        }
        selection.parentElement.classList.add(outcome)

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