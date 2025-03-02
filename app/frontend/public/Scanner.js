/*document.getElementById('scanForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const emailInput = document.getElementById('emailInput').value;
    const resultsDiv = document.getElementById('results');
    const loadingSpinner = document.getElementById('loadingSpinner');

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
        loadingSpinner.style.display = 'none';
        resultsDiv.innerHTML = `<p>${result.message}</p>`;
    } catch (error) {
        loadingSpinner.style.display = 'none';
        resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

function changeBackgroundColor(color) {
    document.documentElement.style.setProperty('--background-color', color);
}

function showDangerLevel(dangerLevel)
{
    if(dangerLevel <= 3)
    {
        console.log('This email seems safe.');
    }
    else if(dangerLevel <= 7)
    {
        console.log('This email might be suspicious.');
    }
    else if(dangerLevel <= 10)
    {
        console.log('This email is dangerous!');
    }
    else
    {
        console.error('Unable to determine the danger level.');
    }
}
*/

document.getElementById("scanButton").addEventListener("click", function() {
    // Simulate AI backend response (rating 1-10)
    const rating = Math.floor(Math.random() * 10) + 1;
    const container = document.getElementById("resultContainer");
    const resultText = document.getElementById("scanResult");

    if (rating >= 1 && rating <= 3) {
        container.className = "container safe";
        resultText.textContent = "No detection of phishing. This email is safe.";
    } else if (rating >= 4 && rating <= 6) {
        container.className = "container warning";
        resultText.textContent = "Some signs of phishing detected. Proceed with caution.";
    } else if (rating >= 7 && rating <= 10) {
        container.className = "container danger";
        resultText.textContent = "High risk of phishing! Do not click any links in this email.";
    }
});