# RepoVerse Developer Guide

This guide contains everything required to set up, configure, run, and deploy the complete **RepoVerse** project.

RepoVerse is a Full Stack Version Control System consisting of three independent applications:

- **Frontend** — React + Vite
- **Backend** — Node.js + Express.js + MongoDB
- **CLI** — Node.js Command Line Interface

---

# Development Requirements

# Clone Repository

```bash
git clone <repository-url>
cd RepoVerse
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=...
JWT_SECRET=...
CLIENT_URL=http://localhost:5173
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5000/api
```

The application will be available at:

```
http://localhost:5173
```

---

# CLI Setup

```bash
cd cli
npm install
npm link
repoverse --help
```

Configure the backend URL in `config.js`.

```javascript
const BACKEND_URL = "http://localhost:5000";
```

Replace the localhost URL with your deployed backend URL after deployment.

---

# Local Development Workflow

Start Backend

```bash
cd backend
npm run dev
```

Start Frontend

```bash
cd frontend
npm run dev
```

CLI can now communicate directly with the backend.

---

# CLI Workflow

Initialize repository.

```bash
repoverse init
```

Login.

```bash
repoverse login
```

Stage files.

```bash
repoverse add
```

Create commit.

```bash
repoverse commit "Initial Commit"
```

Upload commit.

```bash
repoverse push
```

Clone repository.

```bash
repoverse clone username/repository-name
```

Pull latest snapshot.

```bash
repoverse pull
```

Restore previous commit.

```bash
repoverse revert <commit-id>
```

---

# Backend Architecture

```text
Client
      │
      ▼
Express Server
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
Models
      │
      ▼
MongoDB Atlas
```

---

# Frontend Architecture

```text
Pages
      │
      ▼
Components
      │
      ▼
Axios Services
      │
      ▼
Backend REST API
```

---

# CLI Architecture

```text
User
      │
      ▼
Commander.js
      │
      ▼
CLI Commands
      │
      ▼
REST API
      │
      ▼
Backend
```

---

# Environment Variables

## Backend

| Variable   | Description               |
| ---------- | ------------------------- |
| PORT       | Backend Port              |
| MONGO_URI  | MongoDB Connection String |
| JWT_SECRET | Secret used for JWT       |
| CLIENT_URL | Frontend URL              |

---

## Frontend

| Variable     | Description     |
| ------------ | --------------- |
| VITE_API_URL | Backend API URL |

---

## CLI

Update

```
config.js
```

```javascript
const BACKEND_URL = "http://localhost:5000";
```

Replace with deployed backend URL after deployment.

---

# Deployment Guide

## Backend Deployment

Deploy the backend to **Render** and configure:

```env
PORT
MONGO_URI
JWT_SECRET
CLIENT_URL
```

---

## Frontend Deployment

Deploy the frontend to **Vercel**.

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## CLI

Update

```javascript
config.js;
```

Replace

```javascript
const BACKEND_URL = "http://localhost:5000";
```

with

```javascript
const BACKEND_URL = "https://your-backend-url.onrender.com";
```

Republish CLI if required.

---
