document.getElementById('scanForm').addEventListener('submit', async function (event) {
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

function showDangerLevel(email)
{
    if(--BackgroundColor == green)
    {
        messageElement.textContent = 'This email seems safe.';
    }
    else if(--BackgroundColor == orange)
    {
        messageElement.textContent = 'This email might be suspicious.';
    }
    else if(--BackgroundColor == red)
    {
        messageElement.textContent = 'This email is dangerous!';
    }
    else
    {
        messageElement.textContent = 'Unable to determine the danger level.';
    }
}
