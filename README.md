# Job Portal

A full-stack monorepo containing a modern Job Portal application.

## Project Structure

- `frontend/`: A React application built with Vite and Tailwind CSS.
- `backend/`: A RESTful API built with Python and FastAPI.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Python](https://www.python.org/) (v3.9 or higher recommended)

## Getting Started

Follow the instructions below to set up and run both the backend and frontend development servers.

### 1. Backend Setup (FastAPI)

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a Python virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On **Windows**:
     ```powershell
     .\venv\Scripts\activate
     ```
   - On **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```
4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend API will be running at `http://127.0.0.1:8000`.*

### 2. Frontend Setup (React + Vite)

Open a **new terminal window/tab** (keep the backend server running).

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the Node modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend application will be running at `http://localhost:5173` (check the terminal output for the exact local URL).*

## Development Workflow

- The frontend utilizes hot-module replacement (HMR), so any changes made to `frontend/src` will instantly reflect in the browser.
- The backend is launched with the `--reload` flag, meaning any changes to `backend/main.py` will automatically restart the server.
