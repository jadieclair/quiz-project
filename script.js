const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");

startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");
};






















// please place quiz code above this
// result progress

const circularProgress = document.querySelector('.circular-progress');
const progressValue = document.querySelector('.progress-value');
let progressStartValue = -1;
let progressEndValue = (userScore / questions.length) * 100;
let speed = 20;

let progress = setInterval(() => {
  progressStartValue++;

  // console.log(progressStartValue);
  progressValue.textContent = `${progressStartValue}%`;
  circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, 1) 0deg)`;

  if (progressStartValue === progressEndValue) {
    clearInterval(progress);
  }
}, speed);