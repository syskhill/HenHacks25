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

            if (analysisResult >= 1 || analysisResult <=3) {
                resultBody.classList.add("safe");
                scanResult.textContent = "No phishing detected. Your email is safe.";
            } else if (analysisResult >= 4 || analysisResult <= 7) {
                resultBody.classList.add("warning");
                scanResult.textContent = "Minimal phishing detected. Proceed with caution.";

            } else {
                resultBody.classList.add("danger");
                scanResult.textContent = "DANGER! Phishing detected. Do not click any links!";

            }
        }
    }
});



