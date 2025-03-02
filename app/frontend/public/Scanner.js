document.addEventListener("DOMContentLoaded", function () {
    const scanButton = document.getElementById("scanButton");

    if (scanButton) {
        scanButton.addEventListener("click", async function () {
            // Extract email content from Gmail
            const emailContent = getEmailContent();

            if (!emailContent.trim()) {
                alert("Please open an email to analyze.");
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

            if (scanResult.textContent <=3) {
                resultBody.classList.add("safe");
                resultBody.style.color = "green";
            } else if (scanResult.textContent <= 7) {
                resultBody.classList.add("warning");
            } else {
                resultBody.classList.add("safe");
            }
        }
    }
});

// Function to extract email content from Gmail
function getEmailContent() {
    const emailBody = document.querySelector('div[role="listitem"] .a3s'); // More robust selector for Gmail email body
    return emailBody ? emailBody.innerText : '';
}



