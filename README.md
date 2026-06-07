# Smart Student Assistant

A modern student support app with a React/Vite frontend and an Express backend for study planning and assistant chat guidance.

## Project structure

- `client/` — React frontend built with Vite.
- `server/` — Node.js / Express backend API.
- `java-ai-service/` — placeholder folder for a future Spring Boot AI service.

## What it does today

- Provides a responsive dashboard UI for students.
- Presents study topics and learning tips.
- Supports a basic AI-style chat assistant endpoint.
- Generates a simple study plan from subjects, total hours, and available days.

## Run the project

### 1. Start the backend

```powershell
cd "c:\Users\satya\Downloads\bharti\OneDrive\Desktop\smart-student-assistant\server"
npm install
npm run start
```

For hot reload during development:

```powershell
npm run dev
```

### 2. Start the frontend

```powershell
cd "c:\Users\satya\Downloads\bharti\OneDrive\Desktop\smart-student-assistant\client"
npm install
npm run dev
```

The client should open at `http://localhost:5173` by default.

## Backend API

The server exposes these endpoints under `/api/assistant`:

- `GET /topics` — returns study topics and tips.
- `POST /chat` — sends a user message and receives a smart response.
- `POST /plan` — creates a study schedule based on subjects, hours, and days.

### Example payload for study plan

```json
{
  "subjects": ["Mathematics", "Science", "Language"],
  "totalHours": 12,
  "days": 5
}
```

## Folder details

### `client/`
- `src/App.jsx` — main dashboard UI.
- `src/App.css` — custom styles for the assistant interface.
- `src/index.css` — global styles.

### `server/`
- `server.js` — application entry point.
- `routes/assistantRoutes.js` — assistant-related API routes.
- `controllers/assistantController.js` — business logic for chat and planning.

## Future improvements

- Add real AI integration (OpenAI, Azure OpenAI, local model).
- Add authentication and student profiles.
- Save study plans and conversation history.
- Add notes, flashcards, and progress tracking.
- Add a proper Java AI service in `java-ai-service/SpringBoot API/`.

## Notes

If you add a backend server or change the API port, update `client/src/App.jsx` `API_BASE` accordingly.
project deploy link:https://smart-student-assistant-mv1v.vercel.app/
