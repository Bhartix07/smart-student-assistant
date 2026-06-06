# Server: Smart Student Assistant

This folder contains the Express backend API for the Smart Student Assistant.

## Getting started

```powershell
cd "c:\Users\satya\Downloads\bharti\OneDrive\Desktop\smart-student-assistant\server"
npm install
npm run start
```

For development with auto reload:

```powershell
npm run dev
```

## API endpoints

- `GET /` — server status.
- `GET /health` — health check.
- `GET /api/assistant/topics` — fetch assistant topics.
- `POST /api/assistant/chat` — send a chat question to the assistant.
- `POST /api/assistant/plan` — create a study plan.

## Folder structure

- `server.js` — Express app setup and route registration.
- `routes/assistantRoutes.js` — assistant API route definitions.
- `controllers/assistantController.js` — response logic and study plan generation.

## Notes

The backend currently uses a lightweight built-in response generator. To extend it:

- add a real AI/chat model integration,
- load topics from a database,
- add user sessions and saved plans.
