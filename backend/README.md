# RepoVerse Backend

> Backend API for **RepoVerse** — a Full Stack Version Control System built using **Node.js**, **Express.js**, and **MongoDB**.

The RepoVerse Backend serves as the core of the RepoVerse ecosystem, providing secure REST APIs for user authentication, repository management, issue tracking, and version control operations. It powers both the React frontend and the custom RepoVerse CLI, enabling seamless communication across all components of the system.

---

## ✨ Features

- JWT-based User Authentication
- Complete Repository Management (Create, Read, Update, Delete)
- Issue Management System
- Commit Management
  - Push Commits
  - Pull Latest Repository Snapshot
  - Clone Public Repositories
  - Revert to Previous Commits
  - View Commit History
- Protected REST APIs
- ZIP File Upload Support using Multer
- MongoDB Integration with Mongoose
- CORS Configuration
- Fully integrated with the RepoVerse React Frontend
- Fully integrated with the RepoVerse CLI
- Supports the complete CLI workflow including repository initialization, authentication, staging, committing, pushing, pulling, cloning, and reverting

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Multer
- UUID
- CORS
- dotenv
- Morgan

---

## 📂 Project Structure

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── storage/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── uploads/
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Installation

From the root of the **RepoVerse** project:

```bash
cd backend

npm install
```

Create a `.env` file using `.env.example`.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

Start the development server:

```bash
npm run dev
```

The backend will be available at:

```
http://localhost:5000
```

---

## 📜 Available Scripts

Development server

```bash
npm run dev
```

Production server

```bash
npm start
```

---

## 📚 API Modules

### 🔐 Authentication

- Register User
- Login User

### 📦 Repository

- Create Repository
- Get All Repositories
- Get Repository by ID
- Update Repository
- Delete Repository

### 🐞 Issues

- Create Issue
- Update Issue
- Delete Issue
- Get Repository Issues

### 💾 Commits

- Push Commit
- Pull Latest Commit
- Clone Public Repository
- Revert Commit
- Get Commit History

---

## ⚙️ Environment Variables

| Variable   | Description                        |
| ---------- | ---------------------------------- |
| PORT       | Backend server port                |
| MONGO_URI  | MongoDB connection string          |
| JWT_SECRET | Secret key used for JWT generation |
| CLIENT_URL | Frontend URL allowed through CORS  |

---

## 📁 Folder Responsibilities

| Folder      | Responsibility                              |
| ----------- | ------------------------------------------- |
| config      | Database configuration                      |
| controllers | Business logic                              |
| middleware  | Authentication and upload middleware        |
| models      | MongoDB schemas                             |
| routes      | REST API endpoints                          |
| services    | Reserved for future service layer           |
| storage     | Reserved for future storage implementations |
| utils       | Helper utilities                            |
| uploads     | Uploaded repository snapshots               |

---

## 🔐 Authentication

Protected endpoints require a JWT token in the request header.

Example:

```text
Authorization: Bearer <your_token>
```

---

## ☁️ Deployment

The backend is configured for deployment on **Render**.

Required environment variables:

- PORT
- MONGO_URI
- JWT_SECRET
- CLIENT_URL

After deployment, update the backend URL used by both the **RepoVerse Frontend** and the **RepoVerse CLI**.

---

## 🔗 CLI Integration

The backend provides REST APIs used by the RepoVerse CLI.

Supported CLI operations include:

- Repository Initialization
- User Authentication
- Stage Files
- Create Commits
- Push Repository Snapshots
- Pull Latest Snapshot
- Clone Public Repositories
- View Commit History
- Revert to Previous Commits

---

## 🚀 Future Improvements

- Refresh Token Authentication
- Cloud Storage (AWS S3 / Cloudinary)
- Repository Collaborators
- Branch Support
- Pull Requests
- Repository Search
- Repository Stars
- Commit Diff Viewer

---

## 👨‍💻 Author

**Manasvi Patidar**

Developed as the backend component of **RepoVerse**, a Full Stack Version Control System built to demonstrate authentication, repository management, issue tracking, snapshot-based version control, REST API development, and seamless integration with both a React web application and a custom command-line interface.
