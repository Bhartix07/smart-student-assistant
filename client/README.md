# Client: Smart Student Assistant

This folder contains the React frontend for the Smart Student Assistant.

## Getting started

```powershell
cd "c:\Users\satya\Downloads\bharti\OneDrive\Desktop\smart-student-assistant\client"
npm install
npm run dev
```

## What it includes

- `src/App.jsx` — main dashboard UI with chat and study plan features.
- `src/App.css` — custom visual styling for the dashboard.
- `src/index.css` — global app styles.

## How it works

The client uses `fetch` to communicate with the backend API at:

- `http://localhost:5000/api/assistant/topics`
- `http://localhost:5000/api/assistant/chat`
- `http://localhost:5000/api/assistant/plan`

If your backend runs on a different port, update `API_BASE` in `src/App.jsx`.

## Next steps

- add error handling for unavailable backend,
- add topic selection and saved study plans,
- add authentication and user accounts,
- add a real AI model backend.
