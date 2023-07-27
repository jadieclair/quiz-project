// Array of Quiz Questions
const questions = [
  {
    numb: 1,
    question:
      "Which CSS property is used to control the space between the content and the border of an element?",
    answer: "C. Padding",
    options: [
      "A. Margin",
      "B. Border-Spacing",
      "C. Padding", // Correct Answer
      "D. Add border"
    ],
  },
  {
    numb: 2,
    question:
      "In HTML, what is the correct way to create a checkbox input element?",
    answer: "A. <input type='checkbox'>", // Correct Answer
    options: [
      "A. <input type='checkbox'>",
      "B. <input type='check'>",
      "C. <check type='input'>",
      "D. <input type='checkBox'>"
    ],
  },
  {
    numb: 3,
    question: "What is the Spread syntax?",
    answer: "C. (...) - Spread Operator", // Correct Answer
    options: ["A. (/..)", "B. (../)", "C. (...)" "D. (.**)"],
  },
  {
    numb: 4,
    question:
      "In JavaScript, what is the purpose of the 'addEventListener' method?",
    answer: "B. To attach a function to an HTML element for a specified event", // Correct Answer
    options: [
      "A. To create a new element in the DOM",
      "B. To attach a function to an HTML element for a specified event",
      "C. To add a new event to the browser's event list",
      "D. To attach a function to an CSS element"
  },
  {
    numb: 5,
    question: "What are the differences between var, let, and const?",
    answer: "B. var is scoped to a function. let and const are block-scoped.", // Correct Answer
    options: [
      "A. let and const are scoped to a function. var is block-scoped.",
      "B. var is scoped to a function. let and const are block-scoped.",
      "C. None of the above",
      "D. All of the above"
    ],
  },
  {
    numb: 6,
    question: "How do you create a new array in JavaScript?",
    answer: "A. [ ]", // Correct Answer
    options: ["A. [ ]", "B. new Array()", "C. Array.create()" "D. {}"],
  },
  {
    numb: 7,
    question: "In CSS, which property is used to create a flexible grid container with multiple rows and columns?",
    answer: "D. Grid-template", // Correct Answer
    options: [
      "A. grid-gap",
      "B. grid-area",
      "C. grid-column",
      "D. Grid-template"
    ],
  },
  {
    numb: 8,
    question:
      "What method is used to add a new element to the end of an array in JavaScript?",
    answer: "B. push()", // Correct Answer
    options: ["A. append()", "B. push()", "C. add()" "D. pop()"],
  },
  {
    numb: 9,
    question: "How do you center an element horizontally in CSS?",
    answer: "C. text-align: center;", // Correct Answer
    options: [
      "A. position: center;",
      "B. text-align: center",
      "C. text-align: center;",
      "D. Justify-content: center"
    ],
  },
  {
    numb: 10,
    question:
      "In JavaScript, which of the following options correctly explains the concept of closures?",
    answer:
      "C. Closures refer to a function that is defined inside another function and has access to its parent function's variables even after the parent function has completed execution.", // Correct Answer
    options: [
      "A. A closure is a data structure used to store key-value pairs.",
      "B. Closures are a type of JavaScript loop used to iterate over arrays and objects.",
      "C. Closures refer to a function that is defined inside another function and has access to its parent function's variables even after the parent function has completed execution.",
      "D. All of the above"
    ],
  },
  // Add more questions here if needed
];

// Quiz questions array with comments and corrections
