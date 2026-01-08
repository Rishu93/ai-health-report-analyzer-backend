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
