console.log("Content script loaded.");

function getEmailContent() {
    let emailBody = document.querySelector("div[role='main'] div[dir='ltr']");
    return emailBody ? emailBody.innerText : "No email detected.";
}

chrome.runtime.sendMessage({ action: "scan_email", content: getEmailContent() });
