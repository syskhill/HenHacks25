chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        chrome.runtime.sendMessage({ action: "getEmailContent" }, (response) => {
          if (response && response.emailContent) {
            fetch('http://localhost:3000/analyze-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ emailContent: response.emailContent })
            })
            .then(res => res.json())
            .then(data => {
              alert(`Analysis: ${data.analysis}`);
            })
            .catch(error => {
              console.error('Error:', error);
            });
          } else {
            alert('No email content found.');
          }
        });
      }
    });
  });