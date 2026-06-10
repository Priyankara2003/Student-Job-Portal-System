# 📋 Member Task Assignments — Student Job Portal System

> This document maps each group member's tasks to the specific **files** and **code line ranges** they are responsible for.

---

## Member 01 — User Registration & Login
**Module:** Security & Access Control  
**Task:** Developing the API for new users to register and login function.

### Backend Files

| File | Lines | Description |
|------|-------|-------------|
| `backend/auth.py` | L1–L61 (entire file) | JWT token creation, password hashing (bcrypt), `get_current_user` dependency, OAuth2 bearer scheme |
| `backend/main.py` | L40–L60 | `POST /auth/register` — validates email uniqueness, hashes password, creates User record |
| `backend/main.py` | L63–L70 | `POST /auth/login` — verifies credentials, returns JWT access token |
| `backend/main.py` | L73–L75 | `GET /users/me` — returns the currently authenticated user |
| `backend/schemas.py` | L7–L9 | `TokenResponse` schema (access_token + token_type) |
| `backend/schemas.py` | L12–L17 | `UserBase` schema (name, email, role, contact_no, bio) |
| `backend/schemas.py` | L20–L21 | `UserCreate` schema (inherits UserBase + password) |
| `backend/schemas.py` | L24–L26 | `UserLogin` schema (email + password) |
| `backend/schemas.py` | L29–L34 | `UserOut` schema (user output with user_id, created_at) |
| `backend/models.py` | L9–L22 | `User` SQLAlchemy model (users table definition) |
| `backend/config.py` | L1–L28 (entire file) | Environment config, DB URL builder |
| `backend/database.py` | L1–L26 (entire file) | SQLAlchemy engine, session factory, `get_db` dependency |
| `database.sql` | L1–L15 | `CREATE TABLE users` SQL definition |

### Frontend Files

| File | Lines | Description |
|------|-------|-------------|
| `frontend/src/pages/Auth.jsx` | L1–L173 (entire file) | Login form (L65–L101), Register form (L103–L168), form handlers (L20–L63) |
| `frontend/src/pages/Auth.jsx` | L20–L36 | `handleLogin` — calls `/auth/login`, fetches user, stores token |
| `frontend/src/pages/Auth.jsx` | L38–L63 | `handleRegister` — calls `/auth/register`, auto-login, redirect |
| `frontend/src/context/AuthContext.jsx` | L1–L49 (entire file) | Auth state management, localStorage persistence, `setAuth`/`clearAuth` |
| `frontend/src/api/client.js` | L1–L23 (entire file) | `apiRequest()` — base HTTP client with error handling |
| `frontend/src/components/Layout.jsx` | L35–L41 | Logout button logic |

---

## Member 02 — Job Creator
**Module:** Vacancy Posting  
**Task:** Developing the API to allow brokers to input job details (Title, Description, Salary) into the database.

### Backend Files

| File | Lines | Description |
|------|-------|-------------|
| `backend/main.py` | L145–L164 | `POST /jobs` — validates broker role, creates Job record with title, description, salary, location, category |
| `backend/schemas.py` | L44–L53 | `JobBase` + `JobCreate` schemas (title, description, salary, location, category) |
| `backend/schemas.py` | L64–L70 | `JobOut` schema (job output with job_id, broker_id, created_at) |
| `backend/models.py` | L25–L38 | `Job` SQLAlchemy model (jobs table definition) |
| `database.sql` | L17–L28 | `CREATE TABLE jobs` SQL definition |

### Frontend Files

| File | Lines | Description |
|------|-------|-------------|
| `frontend/src/pages/EmployerDashboard.jsx` | L12–L18 | `jobForm` state (title, category, location, salary, description) |
| `frontend/src/pages/EmployerDashboard.jsx` | L45–L64 | `handleCreateJob` — POST request to create a new job |
| `frontend/src/pages/EmployerDashboard.jsx` | L134–L236 | "Post a New Job" form UI (title, category, location, salary, description inputs) |

---

## Member 03 — Job Editor
**Module:** Content Updates  
**Task:** Building the function that allows a broker to edit or update the details of a job they previously posted.

### Backend Files

| File | Lines | Description |
|------|-------|-------------|
| `backend/main.py` | L167–L184 | `PUT /jobs/{job_id}` — validates ownership, updates job fields dynamically via `model_dump(exclude_unset=True)` |
| `backend/schemas.py` | L56–L61 | `JobUpdate` schema (all fields optional for partial updates) |

### Frontend Files

| File | Lines | Description |
|------|-------|-------------|
| `frontend/src/pages/EmployerDashboard.jsx` | L11 | `editingJob` state — tracks which job is being edited (null or job_id) |
| `frontend/src/pages/EmployerDashboard.jsx` | L19–L25 | `editForm` state — holds the edit form values |
| `frontend/src/pages/EmployerDashboard.jsx` | L81–L92 | `startEdit(job)` — populates edit form with current job data |
| `frontend/src/pages/EmployerDashboard.jsx` | L94–L97 | `cancelEdit()` — resets edit state |
| `frontend/src/pages/EmployerDashboard.jsx` | L99–L118 | `handleUpdateJob` — sends PUT request to update job |
| `frontend/src/pages/EmployerDashboard.jsx` | L136–L147 | Dynamic header: toggles between "Post a New Job" / "Edit Job" with Cancel button |
| `frontend/src/pages/EmployerDashboard.jsx` | L149–L234 | Shared form — dynamically uses `editForm` or `jobForm` based on `editingJob` state |
| `frontend/src/pages/EmployerDashboard.jsx` | L263–L269 | "✏️ Edit" button in the jobs table |

---

## Member 04 — Vacancy Remover
**Module:** Cleanup Logic  
**Task:** Creating the "Delete" API so brokers can remove job listings once they are filled or expired.

### Backend Files

| File | Lines | Description |
|------|-------|-------------|
| `backend/main.py` | L187–L201 | `DELETE /jobs/{job_id}` — validates ownership, deletes job, returns 204 No Content |

### Frontend Files

| File | Lines | Description |
|------|-------|-------------|
| `frontend/src/pages/EmployerDashboard.jsx` | L66–L79 | `handleDelete(jobId)` — sends DELETE request, refreshes job list |
| `frontend/src/pages/EmployerDashboard.jsx` | L270–L276 | "🗑 Delete" button in the jobs table |

---

## Member 05 — Job List Display
**Module:** Public Feed  
**Task:** Building the main API that fetches and displays all active job vacancies in a list for students.

### Backend Files

| File | Lines | Description |
|------|-------|-------------|
| `backend/main.py` | L100–L112 | `GET /jobs` — fetches all jobs, supports optional search/category filtering, ordered by newest first |
| `backend/main.py` | L115–L122 | `GET /jobs/mine` — fetches broker's own jobs (used by employer dashboard) |

### Frontend Files

| File | Lines | Description |
|------|-------|-------------|
| `frontend/src/pages/Home.jsx` | L1–L173 (entire file) | Main job listing page |
| `frontend/src/pages/Home.jsx` | L23–L28 | `useEffect` — fetches jobs from `GET /jobs` with search/category params |
| `frontend/src/pages/Home.jsx` | L44–L103 | Hero section with stats, search bar |
| `frontend/src/pages/Home.jsx` | L117–L169 | Job cards grid — displays title, description preview, location, salary, category badge |

---

## Member 06 — Search & Filter
**Module:** Discovery Engine  
**Task:** Developing a simple search feature to filter jobs by title or category (e.g., "Delivery" or "Tutoring").

### Backend Files

| File | Lines | Description |
|------|-------|-------------|
| `backend/main.py` | L100–L112 | `GET /jobs?search=&category=` — `search` param uses `ILIKE` on title+description, `category` param does exact match |

### Frontend Files

| File | Lines | Description |
|------|-------|-------------|
| `frontend/src/pages/Home.jsx` | L7–L9 | `useSearchParams` — reads `search` and `category` from URL query params |
| `frontend/src/pages/Home.jsx` | L58–L85 | Search bar form — text input + "Search Jobs" button, updates URL params on submit |
| `frontend/src/pages/Home.jsx` | L105–L115 | Category pills — "All Jobs", "IT & Software", "Marketing", "Retail", "Tutoring", "Other" — each links to `/?category=X` |

---

## Member 07 — Job Detail Viewer
**Module:** Information Retrieval  
**Task:** Creating an API that shows the full description and broker contact details for a specific single job.

### Backend Files

| File | Lines | Description |
|------|-------|-------------|
| `backend/main.py` | L125–L142 | `GET /jobs/{job_id}` — fetches single job with full description + broker name & email |
| `backend/schemas.py` | L73–L75 | `JobDetail` schema (extends JobOut with `broker_name`, `broker_email`) |

### Frontend Files

| File | Lines | Description |
|------|-------|-------------|
| `frontend/src/pages/JobDetails.jsx` | L1–L80 (entire file) | Full job detail page |
| `frontend/src/pages/JobDetails.jsx` | L13–L17 | `useEffect` — fetches job details from `GET /jobs/{id}` |
| `frontend/src/pages/JobDetails.jsx` | L48–L57 | Job info display: category, title, location, salary, full description |
| `frontend/src/pages/JobDetails.jsx` | L53–L57 | Broker Contact section — broker name and email |
| `frontend/src/App.jsx` | L19 | `/jobs/:id` route registration |

---

## Member 08 — Application Submission
**Module:** Transactional Logic  
**Task:** Developing the "Apply" button logic that records a student's details against a specific job ID.

### Backend Files

| File | Lines | Description |
|------|-------|-------------|
| `backend/main.py` | L204–L237 | `POST /jobs/{job_id}/apply` — validates student role, checks duplicate, creates Application record |
| `backend/main.py` | L240–L270 | `GET /applications/me` — lists all applications for the current student |
| `backend/main.py` | L273–L303 | `GET /employer/applicants` — lists all applicants for the broker's jobs |
| `backend/main.py` | L306–L340 | `PATCH /applications/{id}` — broker updates application status (Pending/Accepted/Rejected) |
| `backend/schemas.py` | L78–L79 | `ApplicationCreate` schema |
| `backend/schemas.py` | L82–L92 | `ApplicationOut` schema (application_id, job_id, student_id, status, applied_at, job_title, company_name) |
| `backend/schemas.py` | L95–L100 | `ApplicantOut` schema (student_name, student_email, job_title, status, applied_at) |
| `backend/models.py` | L41–L57 | `Application` SQLAlchemy model (applications table, unique constraint on job_id+student_id) |
| `database.sql` | L31–L43 | `CREATE TABLE applications` SQL definition |

### Frontend Files

| File | Lines | Description |
|------|-------|-------------|
| `frontend/src/pages/Home.jsx` | L30–L42 | `handleApply(jobId)` — sends POST to `/jobs/{id}/apply` |
| `frontend/src/pages/Home.jsx` | L146–L158 | "Apply Now" / "Login to Apply" buttons on job cards |
| `frontend/src/pages/JobDetails.jsx` | L19–L33 | `handleApply()` — sends POST to apply from the job detail page |
| `frontend/src/pages/JobDetails.jsx` | L60–L74 | "Apply Now" button on job detail page |
| `frontend/src/pages/StudentDashboard.jsx` | L1–L65 (entire file) | Student's "My Applications" dashboard — lists all applied jobs with status |
| `frontend/src/pages/EmployerDashboard.jsx` | L291–L326 | Applicants table — shows student name, email, job title, status |

---

## Member 09 — Profile Management
**Module:** System Architecture & Data Layer  
**Task:** Creating the API to retrieve and update user profile information (Name, Contact, Bio).

### Backend Files

| File | Lines | Description |
|------|-------|-------------|
| `backend/main.py` | L73–L75 | `GET /users/me` — retrieves current user's profile |
| `backend/main.py` | L78–L97 | `PUT /users/me` — updates name, contact_no, bio, role |
| `backend/schemas.py` | L37–L41 | `UserUpdate` schema (name, contact_no, bio, role — all optional) |
| `backend/models.py` | L17 | `contact_no` column on User model |
| `backend/models.py` | L18 | `bio` column on User model (TEXT type) |
| `backend/alembic/versions/add_user_bio_column.py` | L1–L27 (entire file) | Alembic migration to add `bio` column to users table |
| `database.sql` | L12–L13 | `contact_no` and `bio` columns in users table SQL |

### Frontend Files

| File | Lines | Description |
|------|-------|-------------|
| `frontend/src/pages/Profile.jsx` | L1–L165 (entire file) | **Profile Management page** |
| `frontend/src/pages/Profile.jsx` | L5–L11 | Component state — form (name, contact_no, bio), loading, saving, error, success |
| `frontend/src/pages/Profile.jsx` | L13–L29 | `useEffect` — fetches profile data from `GET /users/me` |
| `frontend/src/pages/Profile.jsx` | L31–L49 | `handleSave` — sends PUT to `/users/me` to update profile |
| `frontend/src/pages/Profile.jsx` | L74–L133 | Profile edit form — Full Name, Contact Number, Bio fields + Save button |
| `frontend/src/pages/Profile.jsx` | L136–L161 | Account Details card — Email, Role, User ID, Member Since |
| `frontend/src/App.jsx` | L8 | Profile page import |
| `frontend/src/App.jsx` | L20 | `/profile` route registration |
| `frontend/src/components/Layout.jsx` | L29–L31 | "Profile" nav link in the navigation bar |

---

## 📂 Shared / Common Files

These files are shared infrastructure used by multiple members:

| File | Purpose | Used By |
|------|---------|---------|
| `backend/config.py` | Environment config & DB URL builder | All backend members |
| `backend/database.py` | SQLAlchemy engine, session, `get_db` | All backend members |
| `backend/auth.py` | JWT auth, password hashing, `get_current_user` | Members 01, 02, 03, 04, 08, 09 |
| `backend/models.py` | All SQLAlchemy models (User, Job, Application) | All backend members |
| `backend/schemas.py` | All Pydantic request/response schemas | All backend members |
| `backend/.env` | Database credentials & JWT secret | All backend members |
| `backend/requirements.txt` | Python dependencies | All backend members |
| `frontend/src/api/client.js` | HTTP client (`apiRequest`) | All frontend members |
| `frontend/src/context/AuthContext.jsx` | Auth state management | All frontend members |
| `frontend/src/components/Layout.jsx` | App layout, navbar, footer | All frontend members |
| `frontend/src/App.jsx` | React Router configuration | All frontend members |
| `frontend/src/index.css` | Global Tailwind CSS config | All frontend members |
| `frontend/tailwind.config.js` | Tailwind theme (colors, fonts) | All frontend members |
| `database.sql` | Full database schema | All members |

---

## 🗂️ Complete File Tree

```
├── database.sql                                    # Full SQL schema
├── README.md                                       # Project setup instructions
├── member-tasks.md                                 # This file
├── backend/
│   ├── .env                                        # Environment variables
│   ├── requirements.txt                            # Python dependencies
│   ├── config.py                                   # DB config builder
│   ├── database.py                                 # SQLAlchemy engine & session
│   ├── models.py                                   # User, Job, Application models
│   ├── schemas.py                                  # Pydantic schemas
│   ├── auth.py                                     # JWT auth & password utilities
│   ├── main.py                                     # FastAPI app & all API endpoints
│   └── alembic/versions/
│       ├── 07c35d4c2e1e_add_jobs_category.py       # Migration: category column
│       └── add_user_bio_column.py                  # Migration: bio column
├── frontend/
│   ├── src/
│   │   ├── api/client.js                           # HTTP client
│   │   ├── context/AuthContext.jsx                  # Auth state provider
│   │   ├── components/Layout.jsx                   # App layout & navbar
│   │   ├── pages/
│   │   │   ├── Auth.jsx                            # Login & Register page
│   │   │   ├── Home.jsx                            # Job listing + search + filter
│   │   │   ├── JobDetails.jsx                      # Single job detail view
│   │   │   ├── EmployerDashboard.jsx               # Post/Edit/Delete jobs + Applicants
│   │   │   ├── StudentDashboard.jsx                # Student's applications list
│   │   │   └── Profile.jsx                         # Profile management (Name, Contact, Bio)
│   │   ├── App.jsx                                 # Router configuration
│   │   ├── main.jsx                                # React entry point
│   │   └── index.css                               # Global styles
│   ├── tailwind.config.js                          # Tailwind theme config
│   └── package.json                                # Frontend dependencies
```
