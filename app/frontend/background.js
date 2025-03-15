// OAuth2 token handling
let accessToken = null;

// Get auth token using Chrome Identity API
async function getAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      accessToken = token;
      resolve(token);
    });
  });
}

// Fetch email content from Gmail API
async function fetchEmailContent(messageId) {
  if (!accessToken) {
    await getAuthToken();
  }
  
  const response = await fetch(
    `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  
  if (!response.ok) {
    throw new Error(`Gmail API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Extract email body
  let emailBody = '';
  if (data.payload && data.payload.parts) {
    // Handle multipart emails
    for (const part of data.payload.parts) {
      if (part.mimeType === 'text/plain' && part.body.data) {
        // Decode from base64
        const decodedBody = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
        emailBody += decodedBody + '\n';
      }
    }
  } else if (data.payload && data.payload.body && data.payload.body.data) {
    // Handle single part emails
    const decodedBody = atob(data.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
    emailBody = decodedBody;
  }
  
  // Extract headers
  const headers = {};
  if (data.payload && data.payload.headers) {
    for (const header of data.payload.headers) {
      headers[header.name.toLowerCase()] = header.value;
    }
  }
  
  return {
    id: data.id,
    threadId: data.threadId,
    body: emailBody,
    subject: headers.subject || '',
    from: headers.from || '',
    to: headers.to || '',
    date: headers.date || ''
  };
}

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
  // Check if we're on Gmail
  if (tab.url.includes('mail.google.com')) {
    // First try to get content using content script (DOM method)
    chrome.tabs.sendMessage(tab.id, { action: "getEmailContent" }, async (response) => {
      // If content script method fails, try Gmail API
      if (!response || !response.success || !response.emailContent) {
        try {
          // Get current Gmail message ID and fetch content via API
          const emailId = tab.url.match(/#inbox\/([a-zA-Z0-9]+)/)?.[1];
          if (emailId) {
            const emailData = await fetchEmailContent(emailId);
            
            // Send to backend for analysis
            analyzeEmail(emailData.body);
          } else {
            // Fallback to screenshot method if we can't get the email ID
            chrome.tabs.captureVisibleTab(null, {}, (image) => {
              chrome.tabs.sendMessage(tab.id, { action: "analyzeScreenshot", image });
            });
          }
        } catch (error) {
          console.error("Error fetching email:", error);
          // Fallback to screenshot method
          chrome.tabs.captureVisibleTab(null, {}, (image) => {
            chrome.tabs.sendMessage(tab.id, { action: "analyzeScreenshot", image });
          });
        }
      } else {
        // Use content from DOM if available
        analyzeEmail(response.emailContent);
      }
    });
  }
});

// Send email content to backend for analysis
async function analyzeEmail(emailContent) {
  try {
    const response = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailContent })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // Store result in localStorage for popup to display
    chrome.storage.local.set({ 'analysisResult': data.analysis }, function() {
      // Open results page
      chrome.tabs.create({ url: chrome.runtime.getURL("public/results.html") });
    });
  } catch (error) {
    console.error("Error analyzing email:", error);
    alert("Failed to analyze email: " + error.message);
  }
}