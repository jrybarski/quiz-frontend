const containerWelcome = document.querySelector(".container-welcome");
const container = document.querySelector(".container");
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

  htmlElement.addEventListener("click", () => getQuizzStarted("html"));
  cssElement.addEventListener("click", () => getQuizzStarted("css"));
  jsElement.addEventListener("click", () => getQuizzStarted("js"));
  accessElement.addEventListener("click", () => getQuizzStarted("access"));
}

loadQuestions();

function getQuizzStarted(quiz) {
  containerWelcome.style.visibility = "hidden";
  containerWelcome.style.height = "1px";
  nameOfQuiz.style.visibility = "visible";

  const nameOfQuizImg = document.createElement("img");
  nameOfQuizImg.classList.add("quizimg");
  const nameOfQuizText = document.createElement("h1");
  nameOfQuiz.appendChild(nameOfQuizImg);
  nameOfQuiz.appendChild(nameOfQuizText);

  if (quiz === "html") {
    nameOfQuizImg.src = "./assets/images/icon-html.svg";
    nameOfQuizImg.style.backgroundColor = "rgb(248, 227, 187)";
    nameOfQuizText.innerHTML = "HTML";
  } else if (quiz === "css") {
    nameOfQuizImg.src = "./assets/images/icon-css.svg";
    nameOfQuizText.innerHTML = "CSS";
  } else if (quiz === "js") {
    nameOfQuizImg.src = "./assets/images/icon-js.svg";
    nameOfQuizText.innerHTML = "JavaScript";
  } else if (quiz === "access") {
    nameOfQuizImg.src = "./assets/images/icon-accessibility.svg";
    nameOfQuizText.innerHTML = "Accessibility";
  }
}
