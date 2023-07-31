try {
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
      this.time = document.querySelector(".time"); // Added to display remaining time

      // Global Variables for tracking the state
      this.questionCount = 0;
      this.questionNumb = 1;
      this.userScore = 0;
      this.timer = 5 * 60; // 5 minutes in seconds

      // Bind event handlers to the class instance
      this.startBtn.onclick = this.startQuiz.bind(this);
      this.exitBtn.onclick = this.exitQuiz.bind(this);
      this.continueBtn.onclick = this.continueQuiz.bind(this);
      this.tryAgainBtn.onclick = this.tryAgain.bind(this);
      this.goHomeBtn.onclick = this.goHome.bind(this);
      this.nextBtn.onclick = this.nextQuestion.bind(this);

      // Load questions on page load
      document.addEventListener("DOMContentLoaded", () => {
        this.questions = [
          {
            numb: 1,
            question: "What does HTML stand for?",
            answer: "C. Hyper Text Markup Language",
            options: [
              "A. Hyper Type Multi Language",
              "B. Hyper Text Multiple Language",
              "C. Hyper Text Markup Language",
              "D. Home Text Multi Language",
            ],
          },
          {
            numb: 2,
            question:
              "What is the correct way to declare a variable in JavaScript?",
            answer: "D. const variableName = value;", // Correct Answer
            options: [
              "A. variableName = value;",
              "B. var variableName = value;",
              "C. let variableName = value;",
              "D. const variableName = value;",
            ],
          },
          {
            numb: 3,
            question:
              "Which property is used to change the text color of an element?",
            answer: "C. color", // Correct Answer
            options: [
              "A. text-color",
              "B. font-color",
              "C. color",
              "D. text-style",
            ],
          },
          {
            numb: 4,
            question: "What does CSS stand for?",
            answer: "A. Cascading Style Sheet",
            options: [
              "A. Cascading Style Sheet",
              "B. Cute Style Sheet",
              "C. Computer Style Sheet",
              "D. Continued Style Sheet",
            ],
          },
          {
            numb: 5,
            question: "What does PHP stand for?",
            answer: "A. Hypertext Preprocessor",
            options: [
              "A. Hypertext Preprocessor",
              "B. Hometext Programming",
              "C. Hypertext Preprogramming",
              "D. Programming Hypertext Preprocessor",
            ],
          },
          {
            numb: 6,
            question:
              "What CSS property controls space between the content and border of an element?",
            answer: "C. Padding",
            options: [
              "A. Margin",
              "B. Border-Spacing",
              "C. Padding", // Correct Answer
              "D. Add border",
            ],
          },
          {
            numb: 7,
            question: "How do you center an element horizontally in CSS?",
            answer: "C. text-align: center;", // Correct Answer
            options: [
              "A. position: center;",
              "B. text-align: center",
              "C. text-align: center;",
              "D. Justify-content: center",
            ],
          },
          {
            numb: 8,
            question: "What does SQL stand for?",
            answer: "D. Structured Query Language",
            options: [
              "A. Strength Query Language",
              "B. Stylesheet Query Language",
              "C. Science Question Language",
              "D. Structured Query Language",
            ],
          },
          {
            numb: 9,
            question:
              "Which of these methods is used to add elements to the end of an array?",
            answer:
              "A. .push()", // Correct Answer
            options: [
              "A. .push()",
              "B. .pop()",
              "C. .shift()",
              "D. .unshift()",
            ],
          },
          {
            numb: 10,
            question: "What does XML stand for?",
            answer: "D. Extensible Markup Language",
            options: [
              "A. Excellent Multiple Language",
              "B. Explore Multiple Language",
              "C. Extra Markup Language",
              "D. Extensible Markup Language",
            ],
          },
        ];

        this.showQuestions();
        this.questionCounter();
      });
    }

    // Timer function
    startTimer() {
      let intervalId = setInterval(() => {
        let minutes = Math.floor(this.timer / 60);
        let seconds = this.timer % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.time.textContent = `${minutes}:${seconds}`;

        if (this.timer <= 0) {
          clearInterval(intervalId);
          // Timer has ended, show result box
          this.showResultBox();
        }

        this.timer--;
      }, 1000);
    }

    // Function to handle user option selection
    optionSelected = (answer) => {
      let userAnswer = answer.textContent;
      let correctAnswer = this.questions[this.questionCount].answer;
      let allOptions = this.optionList.children;

      if (userAnswer == correctAnswer) {
        // If user's answer is correct
        answer.classList.add("correct");
        this.userScore += 1;
        this.headerScore();
      } else {
        // If user's answer is incorrect, automatically highlight the correct answer
        answer.classList.add("incorrect");

        for (let i = 0; i < allOptions.length; i++) {
          if (allOptions[i].textContent === correctAnswer) {
            allOptions[i].classList.add("correct");
          }
        }
      }

      // Disable all options after selection
      for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.add("disabled");
      }

      // Show the Next button to proceed to the next question
      this.nextBtn.classList.add("active");
    };

    // Function to display questions and options
    showQuestions() {
      const questionText = document.querySelector(".question-text");
      questionText.textContent = `${this.questions[this.questionCount].numb}. ${
        this.questions[this.questionCount].question
      }`;

      let optionTag = "";
      for (let i = 0; i < this.questions[this.questionCount].options.length; i++) {
        optionTag += `<div class="option"><span>${
          this.questions[this.questionCount].options[i]
        }</span></div>`;
      }

      this.optionList.innerHTML = optionTag;

      const option = document.querySelectorAll(".option");
      for (let i = 0; i < option.length; i++) {
        option[i].addEventListener("click", () => this.optionSelected(option[i]));
      }
    }

    // Function to update the question counter
    questionCounter() {
      const questionTotal = document.querySelector(".question-total");
      questionTotal.textContent = `${this.questionNumb} of ${this.questions.length} Questions`;
    }

    // Function to update the header score display
    headerScore() {
      const headerScoreText = document.querySelector(".header-score");
      headerScoreText.textContent = `Score: ${this.userScore} / ${this.questions.length}`;
    }

    // Function to display the result box
    showResultBox() {
      this.quizBox.classList.remove("active");
      this.resultBox.classList.add("active");

      const scoreText = document.querySelector(".score-text");
      scoreText.textContent = `You Scored: ${this.userScore} out of ${this.questions.length}`;

      const circularProgress = document.querySelector(".circular-progress");
      const progressValue = document.querySelector(".progress-value");
      let progressStartValue = 0;
      let progressEndValue = (this.userScore / this.questions.length) * 100;
      let speed = 20;

      let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${
          progressStartValue * 3.6
        }deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue >= progressEndValue) {
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
      this.timer = 5 * 60; // Reset the timer

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
      this.timer = 5 * 60; // Reset the timer

      this.showQuestions();
      this.questionCounter();
    }

    // Next Button Click Event
    nextQuestion() {
      if (this.questionCount < this.questions.length - 1) {
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
} catch (error) {
  // Handle any errors that occur within the try block
  console.error("An error occurred:", error);
}