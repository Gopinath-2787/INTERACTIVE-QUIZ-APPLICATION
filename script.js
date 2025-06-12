const quizData = [
  {
    question: "JavaScript ignores extra spaces",
    options: ["True", "False", "Sometimes", "everytime"],
    answer: "False"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Google", "Netscape", "Apple"],
    answer: "Netscape"
  },
  {
    question: "When did JavaScript developed?",
    options: ["1989", "1995", "1991", "1998"],
    answer: "1995"
  },
  {
    question: "Who invented javaScript?",
    options: ["James Gosling", "Tim Berners-Lee", "Brendan Eich", "Unknown"],
    answer: "Brendan Eich"
  }
];

let current = 0;
let score = 0;
let timeLeft = 20;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");
const currentCount = document.getElementById("current");
const totalCount = document.getElementById("total");


totalCount.innerText = quizData.length;


function loadQuestion() {
  const q = quizData[current];
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(btn, option);
    optionsEl.appendChild(btn);
  });

  currentCount.innerText = current + 1;
  nextBtn.style.display = "none";
  
}

function checkAnswer(button, selected) {
  clearInterval(timer);
  const correct = quizData[current].answer;

  Array.from(optionsEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correct) {
      btn.classList.add("correct");
    } else if (btn.innerText === selected) {
      btn.classList.add("wrong");
    }
  });

  if (selected === correct) {
    score++;
  }

  nextBtn.style.display = "inline-block";
}

function disableOptions() {
  const correct = quizData[current].answer;
  Array.from(optionsEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correct) {
      btn.classList.add("correct");
    }
  });
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.querySelector(".quiz-container").innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} / ${quizData.length}</p>
  `;
}



loadQuestion();
