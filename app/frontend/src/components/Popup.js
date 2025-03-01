import React, { useState } from "react";

function Popup() {
    const [result, setResult] = useState("Click scan to analyze email.");

    const scanEmail = () => {
        chrome.runtime.sendMessage({ action: "scan_email_request" }, (response) => {
            if (response && response.result) {
                setResult(response.result);
            } else {
                setResult("Failed to scan email.");
            }
        });
    };

    return (
        <div style={{ width: "250px", padding: "10px" }}>
            <h2>Email Scanner</h2>
            <button onClick={scanEmail}>Scan Email</button>
            <p>{result}</p>
        </div>
    );
}

export default Popup;
