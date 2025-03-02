document.addEventListener("DOMContentLoaded", function () {
    const scanButton = document.getElementById("scanButton");

    if (scanButton) {
        scanButton.addEventListener("click", async function () {
            const emailContent = document.getElementById('emailTextArea').value;

            if (!emailContent.trim()) {
                alert("Please enter email content to analyze.");
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ emailContent }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                localStorage.setItem('analysisResult', data.analysis);
                window.location.href = 'results.html';
            } catch (error) {
                console.error("Error analyzing email:", error);
                alert("Failed to analyze email.");
            }
        });
    }

    const resultBody = document.getElementById("resultBody");
    const scanResult = document.getElementById("scanResult");

    if (resultBody && scanResult) {
        const analysisResult = localStorage.getItem('analysisResult');

        if (analysisResult) {
            scanResult.textContent = analysisResult;
<<<<<<< HEAD

            if (analysisResult.includes("Phishing")) {
                resultBody.classList.add("danger");
            } else if (analysisResult.includes("Minimal phishing")) {
                resultBody.classList.add("warning");
            } else {
                resultBody.classList.add("safe");
=======
            if (score >= 1 && score <= 3) {
                resultBody.classList.add("safe");
                resultBody.style.backgroundColor = "green";
            } else if (score >= 4 && score <= 6) {
                resultBody.classList.add("warning");
                resultBody.style.backgroundColor = "yellow";
            } else {
                resultBody.classList.add("danger");
                resultBody.style.backgroundColor = "red";

>>>>>>> 1f39d2eb1ebb22b346e76f47ec8ce09d977e64f5
            }
        }
    }
});



