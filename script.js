const container = document.querySelector(".container");

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

function generateStart(quizzes) {
  const title1 = document.createElement("h1");
  title1.innerHTML = "Welcome to the";
  const title2 = document.createElement("h2");
  title2.innerHTML = "Frontend Quiz";
  const title3 = document.createElement("h3");
  title3.innerHTML = "Pick a subject to get started";

  container.appendChild(title1);
  container.appendChild(title2);
  container.appendChild(title3);

  quizzes.forEach((quiz) => {
    const answer = document.createElement("div");
    answer.classList.add("quiz-option");

    const answerImage = document.createElement("img");
    answerImage.src = quiz.icon;
    answerImage.alt = `${quiz.title} icon`;

    const answerText = document.createElement("h1");
    answerText.innerHTML = quiz.title;

    answer.appendChild(answerImage);
    answer.appendChild(answerText);
    container.appendChild(answer);
  });
}

loadQuestions();
