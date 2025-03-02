// Extract the content of the currently opened or selected email
function getEmailContent() {
    const emailBody = document.querySelector('.a3s.aXjCH'); // Gmail's email body class
    return emailBody ? emailBody.innerText : null;
  }
  
  // Listen for messages from the background script
  /*
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getEmailContent") {
      const emailContent = getEmailContent();
      sendResponse({ emailContent });
    }
  });
  */

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyzeScreenshot") {
        const { image } = request;
        fetch('http://localhost:5000/analyzeScreenshot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image })
        })
        .then(res => res.json())
        .then(data => {
            alert(`Analysis: ${data.analysis}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});