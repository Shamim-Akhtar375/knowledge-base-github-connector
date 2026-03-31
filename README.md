# Knowledge Base + GitHub Connector

This is a full-stack project featuring a React + Tailwind CSS frontend and a FastAPI backend with GitHub API integration.

## Project Structure

- `/frontend` - React application built with Vite and Tailwind CSS.
- `/backend` - FastAPI application to interface with the GitHub API.

## Requirements

- Node.js (for frontend)
- Python 3.8+ (for backend)

## Setup Instructions

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the requirements:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file based on `.env.example` and add your GitHub Personal Access Token:
   ```bash
   cp .env.example .env
   ```
   Add: `GITHUB_PAT=your_token_here`
5. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at http://localhost:8000. You can view the docs at http://localhost:8000/docs.

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:5173.

## Features

- **Frontend**: A pixel-perfect Knowledge Base UI replication using `#4F46E5` (primary) and `#1E1B4B` (secondary) colors. Responsive design, clean typography, soft shadows.
- **Backend**: FastAPI endpoints to fetch repositories, fetch issues, and create new issues via GitHub API. Configured to gracefully handle permissions and CORS.
- **Integration**: The frontend communicates seamlessly with the backend.

## API Endpoints

- `GET /api/repos` - Fetch repositories for the authenticated user.
- `GET /api/issues?owner={owner}&repo={repo}` - Fetch issues for a given repository.
- `POST /api/create-issue` - Create a new issue using `{ owner, repo, title, body, labels }`.
