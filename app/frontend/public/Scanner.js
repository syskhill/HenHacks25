/*document.getElementById("scanForm").addEventListener("click", async function (event) {
    event.preventDefault();
    const emailInput = document.getElementById('emailInput').value;
    const resultsDiv = document.getElementById('results');
    //const loadingSpinner = document.getElementById('loadingSpinner');

    resultsDiv.innerHTML = '';
    loadingSpinner.style.display = 'block';

    try {
        const response = await fetch('/api/scan-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailInput })
        });

        const result = await response.json();
       // loadingSpinner.style.display = 'none';
        resultsDiv.innerHTML = `<p>${result.message}</p>`;
    } catch (error) {
        //loadingSpinner.style.display = 'none';
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

function changeBackgroundColor(color) {
    document.documentElement.style.setProperty('--background-color', color);
}
const rating = Math.floor(Math.random() * 10) + 1;
showDangerLevel(rating);
function showDangerLevel(dangerLevel)
{
    if(dangerLevel <= 3)
    {
        changeBackgroundColor('green');
        console.log('This email seems safe.');
    }
    else if(dangerLevel <= 7)
    {
        changeBackgroundColor('yellow');
        console.log('This email might be suspicious.');
    }
    else if(dangerLevel <= 10)
    {
        changeBackgroundColor('red');
        console.log('This email is dangerous!');
    }
    else
    {
        console.error('Unable to determine the danger level.');
    }
}
*/
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

