import { analyzeEmailWithGemini } from "./apiHandler.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scan_email_request") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    function: getEmailContent
                },
                async (injectionResults) => {
                    const emailText = injectionResults[0]?.result || "No email found.";
                    const result = await analyzeEmailWithGemini(emailText);
                    sendResponse({ result });
                }
            );
        });
        return true; // Allows async response
    }
});

function getEmailContent() {
    let emailBody = document.querySelector("div[data-message-id]");
    return emailBody ? emailBody.innerText : "No email detected.";
}
