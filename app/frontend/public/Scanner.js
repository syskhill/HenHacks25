document.addEventListener("DOMContentLoaded", function () {
    const scanButton = document.getElementById("scanButton");
    console.log("%cScanner.js loaded", "color: black; font-size: large");

    if (scanButton) {
        scanButton.addEventListener("click", async function () {
            // Display loading indicator
            scanButton.textContent = "Scanning...";
            scanButton.disabled = true;

            try {
                // Get the active tab
                const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
                const activeTab = tabs[0];
                
                // Check if we're on Gmail
                if (activeTab.url.includes('mail.google.com')) {
                    // Send message to content script to get email content
                    chrome.tabs.sendMessage(activeTab.id, { action: "getEmailContent" }, async (response) => {
                        if (response && response.success && response.emailContent) {
                            // We got content via DOM, analyze it
                            await analyzeEmailContent(response.emailContent);
                        } else {
                            // Try Gmail API via background script
                            // The background script will handle the API call
                            chrome.runtime.sendMessage({ 
                                action: "analyzeCurrentEmail", 
                                tabId: activeTab.id 
                            }, (apiResponse) => {
                                if (!apiResponse || !apiResponse.success) {
                                    // All attempts failed, fallback to screenshot
                                    takeAndAnalyzeScreenshot();
                                }
                            });
                        }
                    });
                } else {
                    // Not on Gmail, show error
                    alert("Please navigate to Gmail to analyze an email.");
                    scanButton.textContent = "Click to Scan";
                    scanButton.disabled = false;
                }
            } catch (error) {
                console.error("Error in scan process:", error);
                alert("An error occurred while scanning.");
                scanButton.textContent = "Click to Scan";
                scanButton.disabled = false;
            }
        });
    }

    // Handle results page display
    const resultBody = document.getElementById("resultBody");
    const scanResult = document.getElementById("scanResult");
    const emailDetails = document.getElementById("emailDetails");

    if (resultBody && scanResult) {
        // Get results from storage
        chrome.storage.local.get(['analysisResult', 'emailMetadata'], function(data) {
            const analysisResult = data.analysisResult;
            const metadata = data.emailMetadata;
            
            if (analysisResult) {
                // Display the score
                scanResult.textContent = analysisResult;
                resultBody.style.backgroundImage = "none";
                
                // Show email metadata if available
                if (metadata && emailDetails) {
                    emailDetails.innerHTML = `
                        <p><strong>From:</strong> ${metadata.from || 'Unknown'}</p>
                        <p><strong>Subject:</strong> ${metadata.subject || 'No subject'}</p>
                        <p><strong>Date:</strong> ${metadata.date || 'Unknown'}</p>
                    `;
                }

                // Set background color based on score
                const score = parseInt(analysisResult, 10);
                if (score >= 1 && score <= 3) {
                    resultBody.classList.add("safe");
                    resultBody.style.backgroundColor = "var(--safe-bg)";
                    console.log("This email is safe to open.");
                } else if (score >= 4 && score <= 6) {
                    resultBody.classList.add("warning");
                    resultBody.style.backgroundColor = "var(--warning-bg)";
                    console.log("This email is potentially harmful. Proceed with caution.");
                } else {
                    resultBody.classList.add("danger");
                    resultBody.style.backgroundColor = "var(--danger-bg)";
                    console.log("This email is dangerous. Do not open it.");
                }
            }
        });
    }
});

// Analyze email content via API
async function analyzeEmailContent(emailContent) {
    try {
        const response = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailContent }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Store in chrome.storage instead of localStorage for better security
        chrome.storage.local.set({ 
            'analysisResult': data.analysis 
        }, function() {
            window.location.href = 'results.html';
        });
    } catch (error) {
        console.error("Error analyzing email:", error);
        alert("Failed to analyze email: " + error.message);
        
        // Reset button state
        const scanButton = document.getElementById("scanButton");
        if (scanButton) {
            scanButton.textContent = "Click to Scan";
            scanButton.disabled = false;
        }
    }
}

// Take screenshot and analyze it (fallback method)
function takeAndAnalyzeScreenshot() {
    chrome.tabs.captureVisibleTab(null, {}, (image) => {
        fetch('http://localhost:5000/analyzeScreenshot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image })
        })
        .then(res => res.json())
        .then(data => {
            // Store result in chrome.storage
            chrome.storage.local.set({ 
                'analysisResult': data.analysis 
            }, function() {
                window.location.href = 'results.html';
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to analyze screenshot: " + error.message);
            
            // Reset button state
            const scanButton = document.getElementById("scanButton");
            if (scanButton) {
                scanButton.textContent = "Click to Scan";
                scanButton.disabled = false;
            }
        });
    });
}
