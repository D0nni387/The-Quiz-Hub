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
const dailyTrivia = document.getElementById("trivia")

let restartQuiz = document.getElementById("restartSame")
let restartNew = document.getElementById("restartNew")
let chosen = true
let load = true
let answers = Array.from(document.getElementsByClassName("answer"))
let finished = document.getElementById("questionArea")
let questions = []; //sets blank array for API to populate
let currentQuestion = {}
let acceptingInput = false
let baseURL = ("https://opentdb.com/")
let dataUrl = ""



function trivia() {
    fetch("https://uselessfacts.jsph.pl//random.json?language=en")
    .then(response => {
        return response.json()
    })
    .then(trivia => {
        let bob = trivia.text
        dailyTrivia.innerText = bob
    })
}

/**
 * defines the request location to fetch data 
 */
function getData(chosen) {
    if (chosen) {
        dataUrl = (`${baseURL}api.php?amount=${quant}&category=${id}&difficulty=${diff}&type=multiple`)
    } else {
        dataUrl = (`${baseURL}api_category.php`)
    }
}

/**
 * Retreieves category list and passes to the DOM
 */
function categories() {
    loader(load)
    getData()
    fetch(dataUrl)
        .then(response => {
            return response.json()
        })
        .then(category => {
            let categoryList = category.trivia_categories;
            categoryList.forEach(function (category) {

                let categoryOption = document.createElement("option")
                let categoryName = document.createElement("p")
                let name = document.createTextNode(category.name)

                categoryName.appendChild(name)
                categoryOption.appendChild(categoryName)
                categoryOption.id = category.id
                categoryOption.classList.add("category")
                document.getElementById("categoryList").appendChild(categoryOption)
            })
            
    
            loader()
        })
        .catch(err => {
            console.error(err)
        })
}

categories()
trivia()


/**
 * Retrieves Quiz Data, sorts the data and passes to the DOM
 */
function getQuiz() {
    loader(load)
    
    getData(chosen)
    fetch(dataUrl)
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
            loader()
        })
        .catch(err => {
            console.error(err)
        })
}

/**
 * Starts game
 */
function startGame() {
    totalQuestions = [...questions]
    score = 0
    newQuestion()
    started.classList.remove("hide")
}


/**
 * checks remaining questions and either ends the game if no questions left or gets next question
 */
function newQuestion() {
    loader(load)
    if (totalQuestions.length == 0) {
        loader(load)
        finished.classList.add("hide")
        showScore.classList.remove("hide")
        finalScore.innerHTML = (`Congratulations you scored ${score} / ${quant}`)
        loader()
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
        acceptingInput = true
    }
    loader()
    answerFormat()
}

/**
 * listens for answer selection and either 
 */
function answerFormat() {
    answers.forEach(answer => {
        answer.addEventListener('click', event => {
            if (!acceptingInput) return
            acceptingInput = false
            let selection = event.target
            let selectedAnswer = selection.dataset["answer"]

          
            if (selectedAnswer == currentQuestion.answer) {
                
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `You're right!`,
                    showConfirmButton: false,
                    timer: 2500
                  })
                  score ++
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `Sorry the correct answer was number ${currentQuestion.answer}!`,
                    showConfirmButton: false,
                    timer: 2500
                  })
            }
            

            setTimeout(() => {
                
                newQuestion()
            }, 2500)
        })
    })
}

/**
 * shows the loader on param & hides
 * @param {shows the loading wheel} load 
 */
function loader(load){
    if (load) {
        loading.classList.remove("hide")
    } else{
        loading.classList.add("hide")
    }
}

//unsure on how to place these!
restartQuiz.addEventListener('click', restartSame = () => {
    showScore.classList.add("hide")
    getQuiz()
})


restartNew.addEventListener('click', restartNew = () => {
    showScore.classList.add("hide")
    start.classList.remove("hide")
    categories()
})

catId.addEventListener('click', defineCats = () => {
id = catChoice.options[catChoice.selectedIndex].id
    diff = diffChoice.options[diffChoice.selectedIndex].id
    quant = quantChoice.options[quantChoice.selectedIndex].id
    start.classList.add("hide")
    getQuiz()
})