document.addEventListener("DOMContentLoaded", function () {

  // ===== ELEMENTS =====
  const introPage = document.getElementById("introPage");
  const appPage = document.getElementById("appPage");
  const startBtn = document.getElementById("startBtn");
  const cover = document.getElementById("transitionCover");

  const analyseBtn = document.getElementById("analyseBtn");
  const fileInput = document.getElementById("fileUpload");
  const fileName = document.getElementById("fileName");
  const resultBox = document.querySelector(".result-box");

  console.log("startBtn:", startBtn);
  console.log("introPage:", introPage);
  console.log("appPage:", appPage);
  console.log("transitionCover:", cover);

  // ===== GET STARTED =====
  if (startBtn && introPage && appPage) {
    startBtn.addEventListener("click", function () {
      console.log("Get Started clicked");

      if (cover) cover.classList.add("active");

      introPage.classList.add("fade-out");

      setTimeout(() => {
        introPage.style.display = "none";
        appPage.style.display = "flex";
        appPage.classList.add("fade-in");
      }, 400);
    });
  }

  // ===== FILE NAME UPDATE =====
  if (fileInput && fileName) {
    fileInput.addEventListener("change", function () {
      fileName.textContent = this.files.length
        ? this.files[0].name
        : "No file selected";
    });
  }

  // ===== ANALYSE BUTTON =====
  if (analyseBtn) {
    analyseBtn.addEventListener("click", async function () {

      if (!fileInput.files.length) {
        alert("Please upload a file first");
        return;
      }

      resultBox.innerText = "Analyzing report...";

      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      try {
        const response = await fetch("http://127.0.0.1:8000/analyze-report", {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        let html = `<h3>📄 Report: ${data.filename}</h3><hr/>`;

for (const key in data.analysis) {
  const value = data.analysis[key];
  const status = value.toLowerCase().includes("low") || value.toLowerCase().includes("high")
    ? "⚠️"
    : "✅";

  html += `<p><b>${key}</b>: ${value} ${status}</p>`;
}

html += `<hr/><h4>🧠 AI Extract (Preview)</h4>`;
html += `<p style="font-size:13px; white-space:pre-wrap;">${data.text_preview}</p>`;

resultBox.innerHTML = html;


      } catch (err) {
        console.error(err);
        resultBox.innerText = "❌ Backend not reachable";
      }
    });
  }

});
