// constants
const timerEl = document.getElementById("timer-el");
const sections = {
    intro: document.getElementById("intro"),
    questionCard: document.getElementById("question-card"),
    results: document.getElementById("results"),
    highScores: document.getElementById("high-scores"),
};

// page rules 
let questionCounter;
let correctQuestions;
let timeRemaining;
let score;
function pageLoad() {
    timerEl.innerText = "";
    for (item in sections) sections[item].style.display = "none";
    sections.intro.style.display = "flex";
    questionCounter = 0;
    correctQuestions = 0;
    score = 0;
    timeRemaining = 240;
}
pageLoad();

// start
function beginQuiz() {
    document.getElementById(
        "timer-el"
    ).innerText = `Remaining Time: ${timeRemaining}`;
    startTimer();
    questionCounter = 0;
    renderQuestion(questions[questionCounter]);
}

// timer functionality 
function startTimer() {
    interval = setInterval(countdown, 1000);
}

function countdown() {
    if (timeRemaining <= 0) return renderResults();
    timeRemaining--;
    document.getElementById(
        "timer-el"
    ).innerText = `Remaining Time: ${timeRemaining}`;
}

function stopTimer() {
    clearInterval(interval);
}

// Generate Questions
function renderQuestion(question) {
    if (questionCounter >= questions.length) return renderResults();
    sections.intro.style.display = "none";
    sections.questionCard.style.display = "flex";
    document.getElementById("question-notification-el").innerText = "";
    document.getElementById("next-question-button").innerText = "Skip";
    document.getElementById("question-text-el").innerText = question.text;
    document.getElementById("answers-container-el").innerHTML = "";
    for (let i = 0; i < question.answers.length; i++) {
        let btn = document.createElement("button");
        btn.className = "answer-choice";
        btn.innerText = question.answers[i];
        btn.className = "hoverable-button answer-choice";
        btn.onclick = captureAnswer;
        document.getElementById("answers-container-el").appendChild(btn);
    }
}

// store answer
function captureAnswer(e) {
    if (e.target.innerText.charAt(0) === questions[questionCounter].correct) {
        correctQuestions++;
        document.getElementById("question-notification-el").innerText = "Your answer is ... Correct!";
    } else {
        timeRemaining > 30 ? (timeRemaining -= 30) : (timeRemaining = 0);
        document.getElementById(
            "question-notification-el"
        ).innerText = `Your answer is ... Incorrect, the correct answer is ${questions[questionCounter].correct}`;
    }
    for (item in e.target.parentElement.children) {
        let button = e.target.parentElement.children[item];
        button.onclick = "";
        button.className = "answer-choice";
        if (button !== e.target) {
            button.className = "answer-choice non-selected";
        }
    }
    document.getElementById("next-question-button").innerText = "Continue";
}

// move to next question
function nextQuestion() {
    questionCounter++;
    renderQuestion(questions[questionCounter]);
  }

  // generate the result
function renderResults() {
    stopTimer();
    document.getElementById("timer-el").innerText = "";
    document.getElementById("invalid-initials-message").style.display = "none";
    score = timeRemaining + correctQuestions * 10;
    sections.questionCard.style.display = "none";
    sections.results.style.display = "flex";
    document.getElementById(
      "correct-questions-el"
    ).innerText = `${correctQuestions}/10`;
    document.getElementById("time-remaining-el").innerText = timeRemaining;
    document.getElementById("final-score-el").innerText = score;
    document.getElementById("initials").value = "";
  }