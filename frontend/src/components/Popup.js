document.getElementById("analyzeButton").addEventListener("click", async () => {
    const emailText = document.getElementById("enterEmail").ariaValueMax;
    const response = await fetch("https://gemini-ai-api.com/analyze", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ text: emailText })
    
    });
        const result = await response.json();
        document.getElementById("result").textContent = 'Phising Risk: ${result.risk_level} - ${result.message}';
    
    })