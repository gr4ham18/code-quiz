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

