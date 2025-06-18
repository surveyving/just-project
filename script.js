// Функция для обновления прогресса
let progress = 0;
function updateProgress(value) {
  progress = Math.min(progress + value, 100);
  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("progressText").textContent =
    progress + "% бүтүрүлдү";
  localStorage.setItem("progress", progress);
}

// Загрузка прогресса при загрузке страницы
window.onload = function () {
  const savedProgress = localStorage.getItem("progress");
  if (savedProgress) {
    progress = parseInt(savedProgress);
    document.getElementById("progressFill").style.width = progress + "%";
    document.getElementById("progressText").textContent =
      progress + "% бүтүрүлдү";
  }
};

// Функция для показа уведомления о скором появлении
function showComingSoon() {
  alert("Бул бөлүм жакында ачылат!");
}

// Функция для проверки ответов
function checkAnswer(exerciseId, correctAnswer) {
  const input = document.getElementById(exerciseId);
  const resultDiv = document.getElementById(exerciseId + "-result");
  const userAnswer = input.value.trim();

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    resultDiv.textContent = "Туура! Азаматсыз!";
    resultDiv.className = "result-message correct-answer";
    updateProgress(5); // Увеличиваем прогресс за правильный ответ
  } else {
    resultDiv.textContent = "Туура эмес. Кайра аракет кылыңыз.";
    resultDiv.className = "result-message wrong-answer";
  }
}

// Tologon ---------

const input = document.getElementById("searchInput");
const output = document.getElementById("dictionaryContent");
const modal = document.getElementById("modal");
const btn = document.getElementById("aboutBtn");
const span = document.querySelector(".close");

let dictionary = [];

async function loadDictionary() {
  try {
    const response = await fetch("slovar.json");
    dictionary = await response.json();
  } catch (error) {
    output.textContent = "Ошибка загрузки словаря";
    console.error(error);
  }
}

function displayDictionary(words) {
  output.innerHTML = "";

  if (words.length === 0) {
    output.textContent = "Ничего не найдено";
    return;
  }

  words.forEach(({ kyrgyz, russian }) => {
    const div = document.createElement("div");
    div.className = "dictionary-item";
    div.textContent = `${kyrgyz} - ${russian}`;
    output.appendChild(div);
  });
}

function searchDictionary(query) {
  const lowerQuery = query.toLowerCase();
  const filtered = dictionary.filter(
    ({ kyrgyz, russian }) =>
      kyrgyz.toLowerCase().startsWith(query.toLowerCase()) ||
      russian.toLowerCase().startsWith(query.toLowerCase())
  );
  displayDictionary(filtered);
}

input.addEventListener("input", () => {
  const query = input.value.trim();
  if (query === "") {
    output.innerHTML = "";
  } else {
    searchDictionary(query);
  }
});
loadDictionary();

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// ---------

// Добавляем новый JavaScript для интерактивных упражнений
document.addEventListener("DOMContentLoaded", function () {
  // Обработка сопоставления
  const matchingItems = document.querySelectorAll(".matching-item");
  let selectedItem = null;

  matchingItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (selectedItem === null) {
        selectedItem = this;
        this.classList.add("selected");
      } else {
        if (selectedItem.dataset.word === this.dataset.word) {
          selectedItem.classList.add("correct");
          this.classList.add("correct");
          updateProgress(5);
        } else {
          selectedItem.classList.add("wrong");
          this.classList.add("wrong");
          setTimeout(() => {
            selectedItem.classList.remove("wrong", "selected");
            this.classList.remove("wrong");
          }, 1000);
        }
        selectedItem = null;
      }
    });
  });

  // Обработка перетаскивания
  const draggableItems = document.querySelectorAll(".draggable-item");
  const dropZones = document.querySelectorAll(".drop-zone");

  draggableItems.forEach((item) => {
    item.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", this.dataset.category);
      this.classList.add("dragging");
    });

    item.addEventListener("dragend", function () {
      this.classList.remove("dragging");
    });
  });

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", function (e) {
      e.preventDefault();
      this.classList.add("dragover");
    });

    zone.addEventListener("dragleave", function () {
      this.classList.remove("dragover");
    });

    zone.addEventListener("drop", function (e) {
      e.preventDefault();
      this.classList.remove("dragover");
      const category = e.dataTransfer.getData("text/plain");

      if (category === this.dataset.category) {
        const draggedItem = document.querySelector(".dragging");
        this.appendChild(draggedItem);
        updateProgress(5);
      }
    });
  });
});

// Функция для аудио упражнений
function playAudio(word) {
  // Здесь можно добавить реальные аудио файлы
  alert("Аудио ойнотулууда: " + word);
}

function checkAudioAnswer(word, correctAnswer) {
  const input = document.getElementById("audioInput");
  const resultDiv = document.getElementById("audioResult");
  const userAnswer = input.value.trim();

  resultDiv.style.display = "block";
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    resultDiv.textContent = "Туура! Азаматсыз!";
    resultDiv.className = "result-message correct-answer";
    updateProgress(5);
    input.value = "";
  } else {
    resultDiv.textContent = "Туура эмес. Кайра аракет кылыңыз.";
    resultDiv.className = "result-message wrong-answer";
  }
}

// Добавляем анимацию для галереи
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.querySelector("img").style.transform = "scale(1.1)";
  });

  item.addEventListener("mouseleave", function () {
    this.querySelector("img").style.transform = "scale(1)";
  });
});
