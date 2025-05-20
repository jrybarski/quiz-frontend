const containerWelcome = document.querySelector(".container-welcome");
const container = document.querySelector(".container");
const containerQuiz = document.querySelector(".container-quiz");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const sunIcon = document.querySelector(".icon.sun");
const moonIcon = document.querySelector(".icon.moon");
const nameOfQuiz = document.querySelector(".nameOfQuiz");

async function loadQuestions() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    const quizzes = data.quizzes;

    if (quizzes && quizzes.length > 0) {
      generateStart(quizzes);
    } else {
      console.error("Brak pytań w pliku JSON.");
    }
  } catch (error) {
    console.error("Błąd podczas ładowania pytań:", error);
  }
}

function updateIcons(isDarkMode) {
  if (isDarkMode) {
    sunIcon.src = "assets/images/icon-sun-dark.svg";
    moonIcon.src = "assets/images/icon-moon-dark.svg";
    container.style.backgroundImage =
      "url('/assets/images/pattern-background-mobile-dark.svg')";
  } else {
    sunIcon.src = "assets/images/icon-sun-light.svg";
    moonIcon.src = "assets/images/icon-moon-light.svg";
    container.style.backgroundImage =
      "url('/assets/images/pattern-background-mobile-light.svg')";
  }
}

if (themeToggle.checked) {
  body.classList.add("dark-mode");
  updateIcons(true);
} else {
  updateIcons(false);
}

themeToggle.addEventListener("change", () => {
  const isDarkMode = themeToggle.checked;
  body.classList.toggle("dark-mode", isDarkMode);
  updateIcons(isDarkMode);
});

function generateStart(quizzes) {
  const title1 = document.createElement("h1");
  title1.innerHTML = "Welcome to the";
  const title2 = document.createElement("h2");
  title2.innerHTML = "Frontend Quiz!";
  const title3 = document.createElement("h3");
  title3.innerHTML = "Pick a subject to get started.";

  containerWelcome.appendChild(title1);
  containerWelcome.appendChild(title2);
  containerWelcome.appendChild(title3);

  quizzes.forEach((quiz, index) => {
    const answer = document.createElement("div");
    answer.classList.add("quiz-option", `option-${index + 1}`);

    const answerImage = document.createElement("img");
    answerImage.src = quiz.icon;
    answerImage.alt = `${quiz.title} icon`;

    const answerText = document.createElement("h4");
    answerText.innerHTML = quiz.title;

    answer.appendChild(answerImage);
    answer.appendChild(answerText);
    containerWelcome.appendChild(answer);
  });

  const htmlElement = document.querySelector(".option-1");
  const cssElement = document.querySelector(".option-2");
  const jsElement = document.querySelector(".option-3");
  const accessElement = document.querySelector(".option-4");

  if (htmlElement) {
    htmlElement.addEventListener("click", () =>
      getQuizzStarted("html", quizzes)
    );
  } else {
    console.error("Element .option-1 nie znaleziony.");
  }
  if (cssElement) {
    cssElement.addEventListener("click", () => getQuizzStarted("css", quizzes));
  } else {
    console.error("Element .option-2 nie znaleziony.");
  }
  if (jsElement) {
    jsElement.addEventListener("click", () => getQuizzStarted("js", quizzes));
  } else {
    console.error("Element .option-3 nie znaleziony.");
  }
  if (accessElement) {
    accessElement.addEventListener("click", () =>
      getQuizzStarted("access", quizzes)
    );
  } else {
    console.error("Element .option-4 nie znaleziony.");
  }
}

function getQuizzStarted(quiz, quizzes) {
  containerWelcome.style.visibility = "hidden";
  containerWelcome.style.height = "1px";
  nameOfQuiz.style.visibility = "visible";

  let questionCount = 1;

  const nameOfQuizImg = document.createElement("img");
  nameOfQuizImg.classList.add("quizimg");
  const nameOfQuizText = document.createElement("h1");
  nameOfQuiz.appendChild(nameOfQuizImg);
  nameOfQuiz.appendChild(nameOfQuizText);
  const questionCountElement = document.createElement("h1");
  containerQuiz.appendChild(questionCountElement);

  let selectedQuiz;
  if (quiz === "html") {
    selectedQuiz = quizzes.find((q) => q.title.toLowerCase() === "html");
    nameOfQuizImg.src = "./assets/images/icon-html.svg";
    nameOfQuizImg.style.backgroundColor = "rgb(248, 227, 187)";
    nameOfQuizText.innerHTML = "HTML";
    loadAnswers(selectedQuiz, questionCount);
  } else if (quiz === "css") {
    selectedQuiz = quizzes.find((q) => q.title.toLowerCase() === "css");
    nameOfQuizImg.src = "./assets/images/icon-css.svg";
    nameOfQuizImg.style.backgroundColor = "rgb(185, 247, 185)";
    nameOfQuizText.innerHTML = "CSS";
    loadAnswers(selectedQuiz, questionCount);
  } else if (quiz === "js") {
    selectedQuiz = quizzes.find((q) => q.title.toLowerCase() === "javascript");
    nameOfQuizImg.src = "./assets/images/icon-js.svg";
    nameOfQuizImg.style.backgroundColor = "rgb(186, 186, 248)";
    nameOfQuizText.innerHTML = "JavaScript";
    loadAnswers(selectedQuiz, questionCount);
  } else if (quiz === "access") {
    selectedQuiz = quizzes.find(
      (q) => q.title.toLowerCase() === "accessibility"
    );
    nameOfQuizImg.src = "./assets/images/icon-accessibility.svg";
    nameOfQuizImg.style.backgroundColor = "rgb(252, 185, 252)";
    nameOfQuizText.innerHTML = "Accessibility";
    loadAnswers(selectedQuiz, questionCount);
  }

  if (selectedQuiz && selectedQuiz.questions) {
    const questionCountLength = selectedQuiz.questions.length;
    questionCountElement.innerHTML = `Question ${questionCount} of ${questionCountLength}`;
  } else {
    console.error(`Nie znaleziono quizu dla tematu: ${quiz} lub brak pytań.`);
    questionCountElement.innerHTML = "Błąd: Brak pytań";
  }
}

function loadAnswers(selectedQuiz, questionCount) {
  const lettersArray = ["A", "B", "C", "D"];
  const answearsQuiz = selectedQuiz.questions[questionCount - 1].options;

  const title = selectedQuiz.questions[questionCount - 1].question;
  const questionTitle = document.createElement("div");
  questionTitle.innerHTML = title;
  questionTitle.classList.add("question-title");
  containerQuiz.appendChild(questionTitle);

  answearsQuiz.forEach((elem, index) => {
    const answear = document.createElement("div");
    answear.classList.add("answear-row");

    const questionOptionLetter = document.createElement("h2");

    const questionOption = document.createElement("h3");

    questionOptionLetter.innerHTML = lettersArray[index];
    questionOption.innerHTML = elem;
    answear.appendChild(questionOptionLetter);
    answear.appendChild(questionOption);
    containerQuiz.appendChild(answear);
  });
}

loadQuestions();
