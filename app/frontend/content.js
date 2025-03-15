// Get the current Gmail message ID from URL
function getCurrentEmailId() {
  const url = window.location.href;
  const match = url.match(/#inbox\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

// Extract the content of the currently opened or selected email using DOM
function getEmailContentFromDOM() {
  const emailBody = document.querySelector('.a3s.aXjCH'); // Gmail's email body class
  return emailBody ? emailBody.innerText : null;
}

// Parse Gmail URL to determine if we're viewing an email
function isViewingEmail() {
  const url = window.location.href;
  return url.includes('#inbox/') || url.includes('?compose=') || url.includes('#all/');
}

// Get email metadata (sender, subject, etc.) from DOM
function getEmailMetadata() {
  const subject = document.querySelector('h2[data-thread-perm-id]')?.textContent;
  const sender = document.querySelector('.gD')?.getAttribute('email') || 
                document.querySelector('.gI')?.textContent;
  
  return {
    subject: subject || '',
    sender: sender || ''
  };
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle requests to get email content via DOM
  if (request.action === "getEmailContent") {
    if (isViewingEmail()) {
      const emailContent = getEmailContentFromDOM();
      const metadata = getEmailMetadata();
      const emailId = getCurrentEmailId();
      
      sendResponse({ 
        success: true, 
        emailContent, 
        metadata,
        emailId
      });
    } else {
      sendResponse({ success: false, error: "No email is currently open" });
    }
    return true; // Required for async response
  }
  
  // Handle screenshot analysis (keeping this functionality)
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
      sendResponse({ success: true, analysis: data.analysis });
    })
    .catch(error => {
      console.error('Error:', error);
      sendResponse({ success: false, error: error.message });
    });
    return true; // Required for async response
  }
});