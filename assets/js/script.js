let startButton = document.getElementById("start-button");
startButton.onclick = beginQuiz;
let startDiv = document.getElementById("start-div");
let questionsDiv = document.getElementById("questions-div");
let timerId;
let timerEl = document.getElementById("timer");
let timeLeft = 120;
let questionAsk = document.getElementById("question-title");
let answerChoicesDiv = document.getElementById("answer-choices");
let correctAnswerDiv = document.getElementById("correct-answer");
let wrongAnswerDiv = document.getElementById("wrong-answer");
let score = 0;
let endDiv = document.getElementById("end-div");
let endScore = document.getElementById("end-score");
let highScoreDiv = document.getElementById("high-score-div");
let highScoreList = document.getElementById("high-score-list");
let submitInitialsButton = document.getElementById("submit-initials-button");
let initials = document.getElementById("initials");
const highScoresKey = "user-info";
let highscores = localStorage.getItem(highScoresKey);
if (highscores == null) {
  highscores = [];
} else {
  highscores = JSON.parse(highscores);
}

function beginQuiz() {
  startDiv.setAttribute("class", "hide");
  questionsDiv.removeAttribute("class");
  //start timer
  timerId = setInterval(timerFunc, 1000);
  timerEl.textContent = "Time: " + timeLeft;
  displayNextQuestion();

  //get next question with another function from questions array
  //can use
  //use question-title to grab current questions title
  //create event handler for each answer
  //
}

function timerFunc() {
  if (timeLeft <= 0) {
    endQuiz();
  } else {
    timeLeft--;
  }
  timerEl.textContent = "Time: " + timeLeft;
}

function endQuiz() {
  // alert("Quiz Done!" + " " + score);
  questionsDiv.classList.add("hide");
  endDiv.classList.remove("hide");
  clearInterval(timerId);
  timerEl.textContent = "Time: 0 ";
  endScore.textContent = score;
  //to be done when timer runs out end quiz
  // if timer runs out end quiz
}

submitInitialsButton.addEventListener("click", function () {
  console.log(initials.value);
  var userInput = {
    name: initials.value,
    score: score,
  };
  highscores.push(userInput);
  localStorage.setItem(highScoresKey, JSON.stringify(highscores));
  renderScores();
});

// to do: render user score into high score div, still need to build
function renderScores() {
  // var lsArray = localStorage.getItem(highScoresKey);
  console.log(highscores);
  for (let i = 0; i < highscores.length; i++) {
    let highScoreListItem = document.createElement("li");
    var x = document.createTextNode(
      highscores[i].name + " " + highscores[i].score
    );
    highScoreListItem.appendChild(x);
    highScoreList.appendChild(highScoreListItem);
  }
  highScoreDiv.classList.remove("hide");
}

//displays questions when start is clicked
function displayQuestion(question) {
  let answerChoices = question.answerChoices;
  questionAsk.textContent = question.title;
  for (let i = 0; i < answerChoices.length; i++) {
    displayAnswer(answerChoices[i], question.correctAnswer);
  }

  function displayAnswer(choice, correctAnswer) {
    var answerButton = document.createElement("button");
    var t = document.createTextNode(choice);
    answerButton.appendChild(t);
    answerChoicesDiv.appendChild(answerButton);
    answerButton.onclick = function () {
      if (correctAnswer == choice) {
        wrongAnswerDiv.setAttribute("class", "hide");
        correctAnswerDiv.removeAttribute("class");
        score++;
        console.log(score);
      } else {
        correctAnswerDiv.setAttribute("class", "hide");
        wrongAnswerDiv.removeAttribute("class");
        timeLeft = timeLeft - 15;
      }
      displayNextQuestion();
    };
  }
}

let currquestion = -1;
function displayNextQuestion() {
  answerChoicesDiv.innerHTML = "";
  currquestion++;
  if (currquestion >= questions.length) {
    endQuiz();
  } else {
    displayQuestion(questions[currquestion]);
  }
}

// function clearDetails() {
//   mainEl.innerHTML = "";
// }
