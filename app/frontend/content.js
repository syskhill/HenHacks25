// Extract the content of the currently opened or selected email
function getEmailContent() {
    const emailBody = document.querySelector('.a3s.aXjCH'); // Gmail's email body class
    return emailBody ? emailBody.innerText : null;
  }
  
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getEmailContent") {
      const emailContent = getEmailContent();
      sendResponse({ emailContent });
    }
  });