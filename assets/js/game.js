const questionCounter = document.getElementById("questionCount");
const diffChoice = document.getElementById("difficultySelect");
const quantChoice = document.getElementById("questionSelect");
const showScore = document.getElementById("completedArea");
const catChoice = document.getElementById("categoryList");
const game = document.getElementById("questionArea");
const dailyTrivia = document.getElementById("trivia");
const question = document.getElementById("question");
const dropItem = document.getElementById("category");
const finalScore = document.getElementById("score");
const start = document.getElementById("selectArea");
const catId = document.getElementById("catSubmit");
const load = document.getElementById("loading");

let answers = Array.from(document.getElementsByClassName("answer"));
let restartQuiz = document.getElementById("restartSame");
let restartNew = document.getElementById("restartNew");
let baseURL = "https://opentdb.com/";
let acceptingInput = false;
let currentQuestion = {};
let questions = [];



/**
 * Retrieves Trivia data and passes to DOM
 */
function trivia() {
    fetch("http://api.icndb.com/jokes/random?limitTo=[nerdy]")
        .then(response => response.json())
        .then(trivia => {
            let triviaText = trivia.value;
            dailyTrivia.innerText = triviaText.joke;
        })
        .catch(() => {
            dailyTrivia.innerHTML = "did you know, this data hasn't loaded correctly!";
            console.error();
        });
}

/**
 * Gets API Data 
 * @param {Boolean} - gameTrigger True value returns chosen quiz data  
 */

function getData(gameTrigger) {
    if (gameTrigger) {
        dataUrl = (`${baseURL}api.php?amount=${quant}&category=${id}&difficulty=${diff}&type=multiple`);
    } else {
        dataUrl = (`${baseURL}api_category.php`);
    }
}

/**
 * Retreieves category list and passes to the DOM
 */
function categories() {
    loadingWheel(true);
    getData(false);
    fetch(dataUrl)
        .then(response => response.json())
        .then(category => {
            let categoryList = category.trivia_categories;
            categoryList.forEach(category => {

                let categoryOption = document.createElement("option");
                let categoryName = document.createElement("p");
                let name = document.createTextNode(category.name);

                categoryName.appendChild(name);
                categoryOption.appendChild(categoryName);
                categoryOption.id = category.id;
                categoryOption.classList.add("category");
                document.getElementById("categoryList").appendChild(categoryOption);
            });
            loadingWheel(false);
            start.classList.remove("hide");
        })
        .catch(() => console.error());
}

categories();
trivia();

/**
 * Retrieves Quiz Data, sorts the data and passes to the DOM
 */
function getQuiz() {
    loadingWheel(true);
    getData(true);
    fetch(dataUrl)
        .then(data => data.json())

        .then(loadedQuestions => {
            questions = loadedQuestions.results.map(loadedQuestion => {
                const formatQuestion = {
                    question: loadedQuestion.question
                };
                formatQuestion.answer = Math.floor(Math.random() * 3) + 1;
                const answerChoices = [...loadedQuestion.incorrect_answers];
                answerChoices.splice(
                    formatQuestion.answer - 1, 0, loadedQuestion.correct_answer
                );
                answerChoices.forEach((answer, index) => {
                    formatQuestion["choice" + (index + 1)] = answer;
                });
                return formatQuestion;
            });
            if (questions.length > 0) {
                startGame();
                loadingWheel(false);
            } else {
                errorRestart();
            }
        })
        .catch((err) => {
            console.error(err);
            errorRestart();
        });
}

/**
 * Starts game
 */
function startGame() {
    totalQuestions = [...questions];
    score = 0;
    questionCount = 0;
    newQuestion();
    game.classList.remove("hide");
}

/**
 * checks remaining questions and either ends the game if no questions left or gets next question
 */
function newQuestion() {
    loadingWheel(true);
    if (totalQuestions.length == 0) {
        loadingWheel(true);
        game.classList.add("hide");
        showScore.classList.remove("hide");
        finalScore.innerHTML = (`Congratulations you scored ${score} / ${quant}`);
        loadingWheel(false);
    } else {
        questionCount++;
        questionCounter.innerText = (`Question:${questionCount}/${quant}`);
        let questionIndex = Math.floor(Math.random() * totalQuestions.length);
        currentQuestion = totalQuestions[questionIndex];
        question.innerHTML = currentQuestion.question;
        answers.forEach(answer => {
            let number = answer.dataset["answer"];
            answer.innerHTML = currentQuestion["choice" + number];
        });
        totalQuestions.splice(questionIndex, 1);
        questions.splice(questionIndex, 1);
        acceptingInput = true;
    }
    loadingWheel(false);
    answerFormat();
}

/**
 * listens for answer selection and gives user the appropriate response
 */
function answerFormat() {
    answers.forEach(answer => {
        answer.addEventListener('click', () => {
            if (!acceptingInput) return;
            acceptingInput = false;
            let selection = event.target;
            let selectedAnswer = selection.dataset["answer"];


            if (selectedAnswer == currentQuestion.answer) {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `You're right!`,
                    showConfirmButton: false,
                    timer: 2500
                });
                score++;
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `Sorry the correct answer was number ${currentQuestion.answer}!`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
            setTimeout(() => {
                newQuestion();
            }, 2500);
        });
    });
}

/**
 * Shows/hides the loading wheel
 * @param {Boolean} loading - True shows loading wheel 
 */
function loadingWheel(loading) {
    if (loading) {
        load.classList.remove("hide");
    } else {
        load.classList.add("hide");
    }
}


/**
 * If the API returns ok but doesn't return data, restarts quiz
 */
function errorRestart() {
    loadingWheel(true);
    Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'This category is coming soon! keep checking back!',
        showConfirmButton: false,
        timer: 3000
    });

    game.classList.add("hide");
    showScore.classList.add("hide");
    start.classList.remove("hide");
    loadingWheel(false);
}

restartQuiz.addEventListener('click', () => {
    showScore.classList.add("hide");
    getQuiz();
});


restartNew.addEventListener('click', () => {
    showScore.classList.add("hide");
    start.classList.remove("hide");
});

catId.addEventListener('click', () => {
    id = catChoice.options[catChoice.selectedIndex].id;
    diff = diffChoice.options[diffChoice.selectedIndex].id;
    quant = quantChoice.options[quantChoice.selectedIndex].id;
    start.classList.add("hide");
    getQuiz();
});