document.getElementById('analyzeEmail').addEventListener('click', async () => {
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

        const data = await response.json();
        localStorage.setItem('analysisResult', data.analysis);
        window.location.href = 'result.html';
    } catch (error) {
        console.error("Error analyzing email:", error);
        alert("Failed to analyze email.");
    }
});document.getElementById('analyzeEmail').addEventListener('click', async () => {
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

        const data = await response.json();
        localStorage.setItem('analysisResult', data.analysis);
        window.location.href = 'result.html';
    } catch (error) {
        console.error("Error analyzing email:", error);
        alert("Failed to analyze email.");
    }
});