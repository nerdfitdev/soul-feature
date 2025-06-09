const form = document.querySelector('form');
const moodInput = form.querySelector('input');
const reflectionInput = form.querySelector('textarea');
const reflectionsDiv = document.querySelector('.past-reflections');
const motivationDiv = document.querySelector('.motivation-message');

const messages = [
  "You're growing, even if it's silent.",
  "One small step today, big change tomorrow.",
  "God sees your heart and your effort.",
  "You're doing better than you think.",
  "Grace is still your portion.",
  "You're building a masterpiece — you.",
];

let savedReflection = JSON.parse(localStorage.getItem('soulReflections')) || [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const mood = moodInput.value.trim();
  const reflection = reflectionInput.value.trim();
  const date = new Date().toLocaleDateString();

  if (!mood || !reflection) return;
  
  const newEntry = {mood, reflection, date};

  savedReflection.push(newEntry);
  saveToStorage();

  moodInput.value = '';
  reflectionInput.value = '';
  renderReflection();
  renderMotivation();
});

function saveToStorage() {
  localStorage.setItem('soulReflections', JSON.stringify(savedReflection));
}

function renderReflection() {
  reflectionsDiv.innerHTML = '';

  let entriesHTML = '';

  savedReflection.forEach((entry) => {
    entriesHTML += `
      <p><strong>Date:</strong>${entry.date}</p>
      <p><strong>Mood:</strong>${entry.mood}</p>
      <p><strong>Reflection:</strong>${entry.reflection}</p>
    `;
  });

  reflectionsDiv.innerHTML = entriesHTML;
}

function renderMotivation() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  motivationDiv.innerHTML = messages[randomIndex];
}

renderReflection();