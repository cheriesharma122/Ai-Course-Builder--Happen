const container = document.getElementById("roadmap");

async function loadRoadmap() {
  const savedData = sessionStorage.getItem("learningData");

  if (!savedData) {
    showError(
      "No learning details were found. Please create a new roadmap."
    );
    return;
  }

  const data = JSON.parse(savedData);

  try {
    const savedSettings =
      JSON.parse(localStorage.getItem("settings")) || {};
  
    const apiUrl =
      savedSettings.apiUrl ||
      "https://ai-course-builder-happen.onrender.com";
  
    const response = await fetch(
      `${apiUrl.replace(/\/$/, "")}/generate-roadmap`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.detail || "Roadmap generation failed."
      );
    }

    displayRoadmap(result);

  } catch (error) {
    console.error(error);

    showError(error.message);
  }
}


function displayRoadmap(result) {
  container.innerHTML = `
    <section class="roadmap-summary">

      <div class="summary-title">
        <p class="small-heading">
          Personalized learning roadmap
        </p>

        <h2>
          ${escapeHtml(result.skill)}
        </h2>
      </div>

      <div class="summary-grid">

        <div class="summary-card">
          <span>Current Level</span>
          <strong>${escapeHtml(result.level)}</strong>
        </div>

        <div class="summary-card">
          <span>Career Goal</span>
          <strong>${escapeHtml(result.goal)}</strong>
        </div>

        <div class="summary-card">
          <span>Daily Study Time</span>
          <strong>${escapeHtml(result.hours)}</strong>
        </div>

        <div class="summary-card">
          <span>Language</span>
          <strong>${escapeHtml(result.language)}</strong>
        </div>

      </div>

    </section>

    <section class="ai-roadmap-card">

      <div class="ai-label">
        AI-generated learning plan
      </div>

      <div class="roadmap-content">
        ${formatRoadmap(result.roadmap)}
      </div>

    </section>
  `;
}


function formatRoadmap(text) {
  let formatted = escapeHtml(text);

  formatted = formatted
    .replace(
      /\*\*(.*?)\*\*/g,
      "<h2 class='roadmap-section-title'>$1</h2>"
    )
    .replace(
      /^### (.*)$/gm,
      "<h3 class='roadmap-subtitle'>$1</h3>"
    )
    .replace(
      /^## (.*)$/gm,
      "<h2 class='roadmap-section-title'>$1</h2>"
    )
    .replace(
      /^# (.*)$/gm,
      "<h1 class='roadmap-main-title'>$1</h1>"
    )
    .replace(
      /^- \[ \] (.*)$/gm,
      "<div class='checklist-item'>☐ $1</div>"
    )
    .replace(
      /^- (.*)$/gm,
      "<div class='roadmap-list-item'>• $1</div>"
    )
    .replace(
      /^\d+\. (.*)$/gm,
      "<div class='roadmap-list-item numbered-item'>$1</div>"
    )
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>");

  return `<p>${formatted}</p>`;
}


function showError(message) {
  container.innerHTML = `
    <section class="error-card">

      <h2>Roadmap could not be generated</h2>

      <p>${escapeHtml(message)}</p>

      <p>
        Please try again in a few moments. The AI service may be temporarily busy.
      </p>

      <button
        class="primary-button"
        onclick="createNewRoadmap()"
      >
        Try Again
      </button>

    </section>
  `;
}


function createNewRoadmap() {
  window.location.href = "profile.html";
}


function downloadRoadmap() {
  window.print();
}


function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


loadRoadmap();