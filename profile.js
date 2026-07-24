function generateRoadmap() {
  const data = {
    skill: document.getElementById("skill").value,
    level: document.getElementById("level").value,
    goal: document.getElementById("goal").value,
    hours: document.getElementById("time").value,
    language: document.getElementById("language").value
  };

  if (data.skill === "") {
    alert("Please enter a skill");
    return;
  }

  sessionStorage.setItem(
    "learningData",
    JSON.stringify(data)
  );

  window.location.href = "roadmap.html";
}