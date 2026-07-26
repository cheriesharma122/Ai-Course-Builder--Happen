const form = document.getElementById("settingsForm");
const successMessage = document.getElementById("successMessage");

const fields = [
  "apiUrl",
  "learningGoal",
  "skillLevel",
  "weeklyHours",
  "duration"
];

// Load saved settings
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("settings"));

  if (!saved) return;

  fields.forEach(field => {
    if (saved[field]) {
      document.getElementById(field).value = saved[field];
    }
  });
});

// Save settings
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  fields.forEach(field => {
    const input = document.getElementById(field);
    const error = document.getElementById(field + "Error");

    if (!input.value.trim()) {
      error.textContent = "This field is required.";
      valid = false;
    } else {
      error.textContent = "";
    }
  });

  if (!valid) return;

  const settings = {};

  fields.forEach(field => {
    settings[field] = document.getElementById(field).value;
  });

  localStorage.setItem("settings", JSON.stringify(settings));

  successMessage.textContent = "Settings saved successfully!";
});