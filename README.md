# Phishing Email Analyzer Chrome Extension

A Chrome extension that analyzes Gmail emails for phishing threats using Google's Gemini AI.

## Features

- **Gmail API Integration**: Automatically analyzes the email you're currently viewing
- **Multiple Detection Methods**:
  - Uses Gmail API for reliable access to email content
  - Falls back to DOM scraping if API access is unavailable
  - Can also use screenshots as a last resort
- **AI-powered Analysis**: Leverages Google's Gemini AI to detect phishing patterns
- **Real-time Results**: Quick threat assessment with a 1-10 score system
- **Visual Feedback**: Color-coded results make threats easy to identify

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd app/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Chrome Extension Setup

1. Get a Google API OAuth client ID:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Gmail API
   - Create OAuth credentials
   - Add the client ID to `manifest.json`

2. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `app/frontend` directory

## Usage

1. Navigate to Gmail
2. Open an email you want to analyze
3. Click the extension icon in the toolbar
4. View the analysis results

## Technology Stack

- **Frontend**: JavaScript Chrome Extension
- **Backend**: Node.js with Express
- **AI**: Google Gemini AI
- **APIs**: Gmail API for email access