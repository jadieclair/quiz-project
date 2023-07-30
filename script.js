
// Define the Quiz class
class Quiz {
  constructor() {
    // DOM Element Selection
    this.startBtn = document.querySelector(".start-btn");
    this.popupInfo = document.querySelector(".popup-info");
    this.exitBtn = document.querySelector(".exit-btn");
    this.main = document.querySelector(".main");
    this.continueBtn = document.querySelector(".continue-btn");
    this.quizSection = document.querySelector(".quiz-section");
    this.quizBox = document.querySelector(".quiz-box");
    this.resultBox = document.querySelector(".result-box");
    this.tryAgainBtn = document.querySelector(".tryAgain-btn");
    this.goHomeBtn = document.querySelector(".goHome-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.optionList = document.querySelector(".option-list");
    this.timerDisplay = document.querySelector(".timer");

    // Global Variables for tracking the state
    this.questionCount = 0;
    this.questionNumb = 1;
    this.userScore = 0;

    // Timer variables
    this.duration = 5 * 60; // 5 minutes

    // Bind event handlers to the class instance
    this.startBtn.onclick = this.startQuiz.bind(this);
    this.exitBtn.onclick = this.exitQuiz.bind(this);
    this.continueBtn.onclick = this.continueQuiz.bind(this);
    this.tryAgainBtn.onclick = this.tryAgain.bind(this);
    this.goHomeBtn.onclick = this.goHome.bind(this);
    this.nextBtn.onclick = this.nextQuestion.bind(this);

    // Load questions on page load
    document.addEventListener("DOMContentLoaded", () => {
      this.showQuestions();
      this.questionCounter();
    });
  }

  // Timer function
  startTimer() {
    let timer = this.duration;
    let minutes, seconds;

    let intervalId = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.timerDisplay.textContent = `${minutes}:${seconds}`;

      if (--timer < 0) {
        clearInterval(intervalId);
        // Timer has ended, show result box
        this.showResultBox();
      }
    }, 1000);
  }

  // Function to handle user option selection
  optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[this.questionCount].answer;
    let allOptions = this.optionList.children.length;

    if (userAnswer == correctAnswer) {
      // If user's answer is correct
      answer.classList.add("correct");
      this.userScore += 1;
      this.headerScore();
    } else {
      // If user's answer is incorrect, automatically highlight the correct answer
      answer.classList.add("incorrect");

      for (let i = 0; i < allOptions; i++) {
        if (this.optionList.children[i].textContent == correctAnswer) {
          this.optionList.children[i].setAttribute("class", "option correct");
        }
      }
    }

    // Disable all options after selection
    for (let i = 0; i < allOptions; i++) {
      this.optionList.children[i].classList.add("disabled");
    }

    // Show the Next button to proceed to the next question
    this.nextBtn.classList.add("active");
  }

  // Function to display questions and options
  showQuestions() {
    const questionText = document.querySelector(".question-text");
    questionText.textContent = `${questions[this.questionCount].numb}. ${
      questions[this.questionCount].question
    }`;

    let optionTag = "";
    for (let i = 0; i < questions[this.questionCount].options.length; i++) {
      optionTag += `<div class="option"><span>${
        questions[this.questionCount].options[i]
      }</span></div>`;
    }

    this.optionList.innerHTML = optionTag;

    const option = document.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
      option[i].setAttribute("onclick", "quiz.optionSelected(this)");
    }
  }

  // Function to update the question counter
  questionCounter() {
    const questionTotal = document.querySelector(".question-total");
    questionTotal.textContent = `${this.questionNumb} of ${questions.length} Questions`;
  }

  // Function to update the header score display
  headerScore() {
    const headerScoreText = document.querySelector(".header-score");
    headerScoreText.textContent = `Score: ${this.userScore} / ${questions.length}`;
  }

  // Function to display the result box
  showResultBox() {
    this.quizBox.classList.remove("active");
    this.resultBox.classList.add("active");

    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Your Score ${this.userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector(".circular-progress");
    const progressValue = document.querySelector(".progress-value");
    let progressStartValue = -1;
    let progressEndValue = (this.userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
      progressStartValue++;

      progressValue.textContent = `${progressStartValue}%`;
      circularProgress.style.background = `conic-gradient(#c40094 ${
        progressStartValue * 3.6
      }deg, rgba(255, 255, 255, .1) 0deg)`;

      if (progressStartValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);

    // Alert if the user scored less than 5/10
    if (this.userScore < 5) {
      alert("You scored less than 5 out of 10. Please redo the quiz.");
    }
  }

  // Start Button Click Event
  startQuiz() {
    this.popupInfo.classList.add("active");
    this.main.classList.add("active");
    this.startTimer();
  }

  // Exit Button Click Event
  exitQuiz() {
    this.popupInfo.classList.remove("active");
    this.main.classList.remove("active");
  }

  // Continue Button Click Event
  continueQuiz() {
    this.quizSection.classList.add("active");
    this.popupInfo.classList.remove("active");
    this.main.classList.remove("active");
    this.quizBox.classList.add("active");

    this.showQuestions();
    this.questionCounter();
    this.headerScore();
  }

  // Try Again Button Click Event
  tryAgain() {
    this.quizBox.classList.add("active");
    this.resultBox.classList.remove("active");

    this.questionCount = 0;
    this.questionNumb = 1;
    this.userScore = 0;

    this.showQuestions();
    this.questionCounter();
    this.headerScore();
  }

  // Go Home Button Click Event
  goHome() {
    this.quizSection.classList.remove("active");
    this.resultBox.classList.remove("active");

    this.questionCount = 0;
    this.questionNumb = 1;
    this.userScore = 0;

    this.showQuestions();
    this.questionCounter();
  }

  // Next Button Click Event
  nextQuestion() {
    if (this.questionCount < questions.length - 1) {
      this.questionCount++;
      this.showQuestions();

      this.questionNumb++;
      this.questionCounter();

      this.nextBtn.classList.remove("active");
    } else {
      this.showResultBox();
    }
  }
}

// Create an instance of the Quiz class
const quiz = new Quiz();