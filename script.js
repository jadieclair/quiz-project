// DOM Element Selection
const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");
const nextBtn = document.querySelector(".next-btn");
const optionList = document.querySelector(".option-list");

// Start Button Click Event
startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};

// Exit Button Click Event
exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

// Continue Button Click Event
continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  // Show the first question and initialize the counters
  showQuestions(0);
  questionCounter(1);
  headerScore();
};

// Try Again Button Click Event
tryAgainBtn.onclick = () => {
  quizBox.classList.add("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  // Reset question and score counters
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  // Show the first question and update counters
  showQuestions(questionCount);
  questionCounter(questionNumb);
  headerScore();
};

// Go Home Button Click Event
goHomeBtn.onclick = () => {
  quizSection.classList.remove("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  // Reset question and score counters
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  // Show the first question and update counters
  showQuestions(questionCount);
  questionCounter(questionNumb);
};

// Global Variables for tracking the state
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

// Next Button Click Event
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    // Show the next question
    questionCount++;
    showQuestions(questionCount);

    // Update question number
    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove("active");
  } else {
    // Show the result box when all questions are answered
    showResultBox();
  }
};

// Function to display questions and options
function showQuestions(index) {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  // Generate HTML for options
  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

  // Set the options in the quiz section
  optionList.innerHTML = optionTag;

  // Add click event to each option for user selection
  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// Function to handle user option selection
function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
    // If user's answer is correct
    answer.classList.add("correct");
    userScore += 1;
    headerScore();
  } else {
    // If user's answer is incorrect, automatically highlight the correct answer
    answer.classList.add("incorrect");

    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }

  // Disable all options after selection
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }

  // Show the Next button to proceed to the next question
  nextBtn.classList.add("active");
}

// Function to update the question counter
function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

// Function to update the header score display
function headerScore() {
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

// Function to display the result box
function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");
  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;

    // Update circular progress bar and percentage display
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${
      progressStartValue * 3.6
    }deg, rgba(255, 255, 255, .1) 0deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}
