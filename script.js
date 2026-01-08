function analyseData() {
  const fileInput = document.getElementById("fileUpload");
  const resultBox = document.getElementById("result");

  if (fileInput.files.length === 0) {
    resultBox.innerHTML = "⚠️ Please upload a file first.";
    return;
  }

  resultBox.innerHTML = "⏳ Analysing data using AI...";

  // Backend API call (example)
  fetch("http://127.0.0.1:5000/analyse", {
    method: "POST",
    body: new FormData().append("file", fileInput.files[0])
  })
  .then(response => response.json())
  .then(data => {
    resultBox.innerHTML = `✅ Result: ${data.result}`;
  })
  .catch(() => {
    resultBox.innerHTML = "Backend not connected (demo mode)";
  });
}

document.addEventListener("DOMContentLoaded", function () {

  const introPage = document.getElementById("introPage");
  const appPage = document.getElementById("appPage");
  const startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", function () {

    // Fade out intro
    introPage.classList.add("fade-out");

    setTimeout(function () {
      introPage.style.display = "none";

      // Show app + fade in
      appPage.style.display = "flex";
      appPage.classList.add("fade-in");

    }, 400); // must match fadeOut duration
  });

});

const fileInput = document.getElementById("fileUpload");
const fileName = document.getElementById("fileName");

fileInput.addEventListener("change", function () {
  fileName.textContent = this.files.length
    ? this.files[0].name
    : "No file selected";
});
