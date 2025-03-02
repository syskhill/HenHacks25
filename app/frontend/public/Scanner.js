document.addEventListener("DOMContentLoaded", function () {
    const scanButton = document.getElementById("scanButton");
    console.log("%c color: black", "font-size: large");

    if (scanButton) {
        scanButton.addEventListener("click", async function () {
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
            resultBody.style.backgroundImage = "none"; // Remove the background image

            const score = parseInt(analysisResult, 10); // Assuming analysisResult is a score

            if (score >= 1 && score <= 3) {
                resultBody.classList.add("safe");
                resultBody.style.backgroundColor = "var(--safe-bg)";
                console.log("This email is safe to open.");
            } else if (score >= 4 && score <= 6) {
                resultBody.classList.add("warning");
                resultBody.style.color = "var(--warning-bg)";
                console.log("This email is potentially harmful. Proceed with caution.");
            } else {
                resultBody.classList.add("danger");
                resultBody.style.color = "var(--danger-bg)";
                console.log("This email is dangerous. Do not open it.");
            }
        }
    }
});

// Function to extract email content from Gmail
function getEmailContent() {
    const emailBody = document.querySelector('div[role="listitem"] .a3s'); // More robust selector for Gmail email body
    return emailBody ? emailBody.innerText : '';
}



