# RepoVerse Frontend

> React-based web application for **RepoVerse** — a Full Stack Version Control System.

The RepoVerse Frontend provides an intuitive and responsive interface for interacting with the RepoVerse ecosystem. It enables users to authenticate, manage repositories, track issues, and browse commit history through a modern React application powered by the RepoVerse Backend APIs.

---

## ✨ Features

- User Registration and Login
- JWT-based Authentication
- Repository Dashboard
- Create, View, Update, and Delete Repositories
- Public and Private Repository Support
- Issue Management
  - Create Issues
  - Edit Issues
  - Delete Issues
- View Repository Commit History
- User Profile Page
- Account Settings Page
- Protected Routes
- Toast Notifications
- Responsive User Interface
- Fully integrated with the RepoVerse Backend APIs

---

## 🛠️ Tech Stack

- React.js
- Vite
- React Router DOM
- Axios
- React Hot Toast
- CSS3

---

## 📂 Project Structure

```text
frontend/
│
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   ├── commit/
│   │   ├── common/
│   │   ├── home/
│   │   ├── issue/
│   │   ├── layout/
│   │   └── repository/
│   │
│   ├── context/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Installation

From the root of the **RepoVerse** project:

```bash
cd frontend

npm install
```

Create a `.env` file using `.env.example`.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## 📜 Available Scripts

Development server

```bash
npm run dev
```

Production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

## 📱 Application Pages

### 🏠 Home

- Landing page introducing RepoVerse
- Navigation to Login and Register

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication

### 📊 Dashboard

- View all repositories
- Create new repositories
- Navigate to repository details

### 📂 Repository

- View repository information
- Edit repository details
- Delete repository
- Browse commit history
- Manage repository issues

### 👤 Profile

- View user information
- Repository statistics

### ⚙️ Settings

- View account details
- Logout

---

## 📁 Folder Responsibilities

| Folder     | Responsibility                       |
| ---------- | ------------------------------------ |
| api        | Axios instance and API configuration |
| assets     | Static assets (images, icons, etc.)  |
| components | Reusable UI components               |
| context    | Global authentication state          |
| pages      | Application pages                    |
| routes     | Public and protected routing         |
| services   | API service layer                    |
| public     | Static public assets                 |

---

## ⚙️ Environment Variables

| Variable     | Description                           |
| ------------ | ------------------------------------- |
| VITE_API_URL | Base URL of the RepoVerse Backend API |

---

## 🔗 Backend Integration

The frontend communicates with the **RepoVerse Backend** using REST APIs.

Implemented integrations include:

- User Authentication
- Repository Management
- Issue Management
- Commit History
- Protected Routes using JWT
- Automatic Authorization Header Injection using Axios Interceptors

---

## ☁️ Deployment

The frontend is configured for deployment on **Vercel**.

Required environment variable:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

After deployment, the frontend communicates directly with the deployed RepoVerse Backend hosted on Render.

---

## 🚀 Future Improvements

- Repository Search
- Repository Filtering
- User Profile Editing
- Repository Collaborators
- Dark Mode
- Pagination
- Commit Diff Viewer
- Branch Visualization
- Activity Timeline

---

## 🌐 Related Components

- [Backend](../backend)
- [CLI](../cli)

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Manasvi Patidar**

Developed as the frontend component of **RepoVerse**, a Full Stack Version Control System built to provide a modern, responsive, and user-friendly interface for authentication, repository management, issue tracking, and commit history visualization through seamless integration with the RepoVerse Backend APIs.
