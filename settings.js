const STORAGE_KEY = "skillpathSettings";

const DEFAULTS = {
  apiBaseUrl: "https://ai-course-builder-happen.onrender.com",
  defaultLanguage: "",
  defaultStudyTime: ""
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function normalizeBaseUrl(url) {
  return String(url).trim().replace(/\/+$/, "");
}

function fillForm() {
  const s = loadSettings();
  document.getElementById("apiBaseUrl").value = s.apiBaseUrl;
  document.getElementById("defaultLanguage").value = s.defaultLanguage;
  document.getElementById("defaultStudyTime").value = s.defaultStudyTime;
}

function showMessage(text) {
  const el = document.getElementById("settingsMessage");
  el.textContent = text;
  el.hidden = false;
}

document.getElementById("saveSettings").addEventListener("click", () => {
  const apiBaseUrl = normalizeBaseUrl(
    document.getElementById("apiBaseUrl").value
  );

  if (!apiBaseUrl) {
    alert("Please enter an API base URL.");
    return;
  }

  saveSettings({
    apiBaseUrl,
    defaultLanguage: document.getElementById("defaultLanguage").value.trim(),
    defaultStudyTime: document.getElementById("defaultStudyTime").value.trim()
  });

  showMessage("Settings saved.");
});

fillForm();

window.getSkillpathSettings = loadSettings;
window.SKILLPATH_DEFAULT_API = DEFAULTS.apiBaseUrl;
