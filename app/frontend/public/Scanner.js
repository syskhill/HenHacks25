
document.addEventListener("DOMContentLoaded", function () {
    const scanButton = document.getElementById("scanButton");

    if (scanButton) {
        scanButton.addEventListener("click", function () {
            const phishingScore = Math.floor(Math.random() * 10) + 1;
            localStorage.setItem("phishingScore", phishingScore);
            window.location.href = "results.html";
        });
    }

    const resultBody = document.getElementById("resultBody");
    const scanResult = document.getElementById("scanResult");

    if (resultBody && scanResult) {
        const phishingScore = localStorage.getItem("phishingScore");

        if (phishingScore) {
            const score = parseInt(phishingScore, 10);

            if (score >= 1 && score <= 3) {
                resultBody.classList.add("safe");
                scanResult.textContent = "No phishing detected. Your email is safe.";
            } else if (score >= 4 && score <= 6) {
                resultBody.classList.add("warning");
                scanResult.textContent = "Minimal phishing detected. Proceed with caution.";
            } else {
                resultBody.classList.add("danger");
                scanResult.textContent = "DANGER! Phishing detected. Do not click any links!";
            }
        }
    }
});

