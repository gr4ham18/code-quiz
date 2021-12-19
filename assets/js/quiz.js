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
