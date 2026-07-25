# AI SkillPath

AI SkillPath is a full-stack web app that builds personalized learning roadmaps from your goals, experience, and available time—surfacing videos, docs, and projects along the path.

**Stack:** HTML · CSS · JavaScript · Python · FastAPI · Google Gemini

## Getting started

### Backend

1. Create a virtual environment and install dependencies:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Add a `backend/.env` file with your Gemini API key:

   ```env
   GEMINI_API_KEY=your_key_here
   ```

3. Run the API:

   ```bash
   uvicorn main:app --reload
   ```

The API serves `POST /generate-roadmap` and exposes docs at `http://127.0.0.1:8000/docs`.

### Frontend

Open `index.html` in a browser, or serve the project root with any static file server. Complete your profile on the landing flow to generate a roadmap.

**Note:** The frontend in `roadmap.js` may point at a deployed backend URL. For local development, update the `fetch` URL to your running API (for example `http://127.0.0.1:8000/generate-roadmap`).