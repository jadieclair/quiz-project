// Array of Quiz Questions
const questions = [
  {
    question:
      "Which CSS property is used to control the space between the content and the border of an element?",
    answer: [
      {text: "A. Margin", correct: false},
      {text: "B. Border-Spacing",correct: false},
      {text: "C. Padding", correct: true}, // Correct Answer
      {text: "D. Add border", correct: false},
    ]
  },
  {
    question:
      "What is another name for an HTML tag?",
    answer: [
      {text: "A. element", correct: true}, // Correct Answer
      {text: "B. code", correct: false},
      {text: "C. head", correct: false},
      {text: "D. class", correct: false},
    ]
  },
  {
    question: "What is the Spread syntax?",
    answer: [
      {text: "A. (/..)", correct: false},
      {text: "B. (../)", correct: false},
      {text: "C. (...)", correct: true}, // Correct Answer
      {text: "D. (.**)", correct: false},
    ]
  },
  {
    question: "In JavaScript, what is the purpose of the 'addEventListener' method?",
    answer: [
      {text: "A. To create a new element in the DOM", correct: false},
      {text: "B. To attach a function to an HTML element for a specified event", correct: true}, // Correct Answer
      {text: "C. To add a new event to the browser's event list", correct: false},
      {text: "D. To attach a function to an CSS element", correct: false},
    ]
  },
  {
    question: "What are the differences between var, let, and const?",
    answer: [
      {text: "A. let and const are scoped to a function. var is block-scoped.", correct: false},
      {text: "B. var is scoped to a function. let and const are block-scoped.", correct: true}, // Correct Answer
      {text: "C. None of the above", correct: false},
      {text: "D. All of the above", correct: false},
    ]
  },
  {
    question: "How do you create a new array in JavaScript?",
    answer: [
      {text: "A. [ ]", correct: true}, // Correct Answer
      {text: "B. new Array()", correct: false},
      {text: "C. Array.create()", correct: false},
      {text: "D. {}", correct: false},
    ]
  },
  {
    question: "In CSS, which property is used to create a flexible grid container with multiple rows and columns?",
    answer: [
      {text: "A. grid-gap", correct: false},
      {text: "B. grid-area", correct: false},
      {text: "C. grid-column", correct: false},
      {text: "D. Grid-template", correct: true}, // Correct Answer
    ]
  },
  {
    question:
      "What method is used to add a new element to the end of an array in JavaScript?",
    answer: [
      {text: "A. append()", correct: false},
      {text: "B. push()", correct: true}, // Correct Answer
      {text: "C. add()", correct: false},
      {text: "D. pop()", correct: false},
    ]
  },
  {
    question: "How do you center an element horizontally in CSS?",
    answer: [
      {text: "A. position: center;", correct: false},
      {text: "B. text-align: center", correct: false},
      {text: "C. text-align: center;", correct: true}, // Correct Answer
      {text: "D. Justify-content: center", correct: false},
    ]
  },
  {
    question:
      "In JavaScript, which of the following options correctly explains the concept of closures?",
    answer: [
      {text: "A. A closure is a data structure used to store key-value pairs.", correct: false},
      {text: "B. Closures are a type of JavaScript loop used to iterate over arrays and objects.", correct: false},
      {text: "C. Closures refer to a function that is defined inside another function and has access to its parent function's variables even after the parent function has completed execution.", correct: true}, // Correct Answer
      {text: "D. All of the above", correct: false},
    ]
  },
  // Add more questions here if needed
];

const questionElement = document.querySelector(".question-text");
  const option = document.querySelector(".option-list");
  const nextButton = document.querySelector(".next-btn");
  const headerScore = document.querySelector(".header-score");

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      nextButton.innerHTML = "Next";
      headerScore.textContent = "Score: 0 / " + questions.length;
      showQuestion();
    }

    function showQuestion() {
      resetState();
      let currentQuestion = questions[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

      currentQuestion.answer.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("option");
        option.appendChild(button);
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
      });
    }

    function resetState() {
      nextButton.style.display = "none";
      while (option.firstChild) {
        option.removeChild(option.firstChild);
      }
    }

    function selectAnswer(e) {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
      } else {
        selectedBtn.classList.add("incorrect");
      }
      Array.from(option.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";
      headerScore.textContent = "Score: " + score + " / " + questions.length;
      const percentage = ((score / questions.length) * 100).toFixed(2);
      
    }

    function showScore() {
      resetState();
      questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
      nextButton.innerHTML = "Play Again";
      nextButton.style.display = "block";
    }

    function handleNextButton() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showScore();
      }
    }

    nextButton.addEventListener("click", () => {
      if (currentQuestionIndex < questions.length) {
        handleNextButton();
      } else {
        startQuiz();
      }
    });

    // Start the quiz when the "Start Quiz" button is clicked
    const startButton = document.querySelector(".start-btn");
    startButton.addEventListener("click", () => {
      document.querySelector(".quiz-section").style.display = "block"; // Show the quiz section
      startQuiz();
    });

    // Reload the page to restart the quiz when the "Try Again" button is clicked
    const tryAgainButton = document.querySelector(".tryAgain-btn");
    tryAgainButton.addEventListener("click", () => {
      location.reload();
    });

    // Go back to the home section when the "Home" button is clicked
    const goHomeButton = document.querySelector(".goHome-btn");
    goHomeButton.addEventListener("click", () => {
      document.querySelector(".quiz-section").style.display = "none"; // Hide the quiz section
      startButton.parentElement.parentElement.style.display = "block"; // Show the home section
    });