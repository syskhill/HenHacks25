# HenHacks25 Project Commands & Style Guide

## Commands
- Backend setup: `cd app/backend && npm install`
- Start backend (dev): `cd app/backend && npm run dev`
- Start backend (prod): `cd app/backend && npm start`
- Load extension: Chrome → Extensions → Developer Mode → Load unpacked → select `/app/frontend`

## Code Style
- **Modules**: CommonJS pattern with `require`/`module.exports`
- **Async**: Use async/await for promises, not callbacks
- **Error handling**: Try/catch with specific error messages
- **Logging**: Console.log with emoji prefixes for visibility
- **Variables**: camelCase for variables, PascalCase for classes
- **Indentation**: 2 spaces
- **Environment**: Store sensitive data in .env file (GEMINI_API_KEY)

## Project Structure
- `/app/backend/`: Express server with Gemini AI integration
- `/app/frontend/`: Chrome extension files
- Extension scans emails for phishing threats using Gemini AI