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

