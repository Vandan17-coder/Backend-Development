# 🚀 Backend Development Learning & Project Repository

Welcome to the **Backend Development** repository. This repository is a modular collection of Node.js and Express.js projects ranging from foundational HTTP servers to production-grade REST APIs, secure JWT & session-based authentication architectures, and cloud media upload workflows.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Repository Structure](#-repository-structure)
- [Module Deep Dives](#-module-deep-dives)
  - [1. Authentication & Session Management (`authentication/`)](#1-authentication--session-management-authentication)
  - [2. Cloud Media Upload & Posts (`project/`)](#2-cloud-media-upload--posts-project)
  - [3. Post Management REST API (`post-app/`)](#3-post-management-rest-api-post-app)
  - [4. Notes CRUD API (`api/` & `practice/`)](#4-notes-crud-api-api--practice)
  - [5. Express Server Fundamentals (`create-server/`)](#5-express-server-fundamentals-create-server)
- [Tech Stack & Tools](#-tech-stack--tools)
- [API Reference & Endpoints](#-api-reference--endpoints)
- [Getting Started](#-getting-started)
- [Security & Architecture Highlights](#-security--architecture-highlights)

---

## 🌟 Overview

This repository contains multiple backend modules designed to demonstrate real-world patterns:

- **Authentication Architecture**: Dual-token system (short-lived access tokens + long-lived secure refresh tokens) with database session tracking, device fingerprinting (IP & User-Agent), and revocation.
- **File Upload & Cloud Storage**: Streamlined multipart file processing using Multer memory storage and ImageKit cloud CDN integration.
- **RESTful CRUD Patterns**: Clean model-controller-router architectural patterns with MongoDB & Mongoose ODM.
- **Fullstack Integration**: REST APIs connected with modern React & Vite frontends.

---

## 📂 Repository Structure

```text
Backend/
├── authentication/              # Advanced Auth & Session Management API
│   ├── src/
│   │   ├── config/              # App & DB configuration
│   │   ├── controllers/         # Auth business logic (register, refresh, logout, getMe)
│   │   ├── middleware/          # Auth verification middleware
│   │   ├── models/              # User and Session Mongoose models
│   │   ├── routes/              # Auth route definitions
│   │   └── app.js               # Express application initialization
│   ├── server.js                # Server entry point
│   └── package.json
│
├── project/                     # Full-Stack Image Upload & Feed Application
│   ├── backend/
│   │   ├── src/
│   │   │   ├── db/              # Database connection
│   │   │   ├── models/          # Post model
│   │   │   ├── services/        # Storage service
│   │   │   └── app.js           # File upload & post endpoints
│   │   ├── server.js
│   │   └── package.json
│   └── frontend/                # React + Vite frontend application
│       ├── src/
│       │   ├── pages/           # CreatePost & Feed pages
│       │   └── App.jsx
│       └── package.json
│
├── post-app/                    # Post Management Service (CRUD)
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/          # DB config
│   │   │   ├── controllers/     # Post controllers (CRUD)
│   │   │   ├── models/          # Post schema
│   │   │   ├── routes/          # Express router
│   │   │   └── app.js
│   │   └── server.js
│   └── frontend/                # Client interface
│
├── api/                         # Notes REST API with Mongoose
│   ├── src/
│   │   ├── db/                  # DB connection logic
│   │   ├── models/              # Note model
│   │   └── app.js               # Express routes for Notes CRUD
│   └── server.js
│
├── practice/                    # Interactive REST API Practice Workspace
│   ├── src/
│   │   ├── db/
│   │   ├── models/
│   │   └── app.js
│   └── server.js
│
├── create-server/               # Express.js Core Fundamentals & Basic Routing
│   └── server.js
│
├── note.txt                     # Quick reference for HTTP methods & commands
└── package.json                 # Monorepo root config
```

---

## 🔍 Module Deep Dives

### 1. Authentication & Session Management (`authentication/`)

A production-ready authentication subsystem implementing security best practices:

- **Password Hashing**: Passwords hashed securely using `bcrypt` (10 salt rounds).
- **Dual-Token System**:
  - **Access Token**: Short-lived (15 minutes) JWT sent in JSON responses for API authorization.
  - **Refresh Token**: Long-lived (7 days) JWT sent via `httpOnly`, `sameSite: strict` secure cookie.
- **Session Tracking & Token Hashing**: Refresh tokens are cryptographically hashed using SHA-256 (`crypto.createHash("sha256")`) before storing in the database.
- **Audit Metadata**: Tracks `ip` address and `userAgent` per session to monitor client devices.
- **Revocation & Rotation**: Refreshing an access token rotates the refresh token hash and invalidates revoked sessions upon logout.

### 2. Cloud Media Upload & Posts (`project/`)

A media-sharing backend integrating cloud storage with a modern React client:

- **Multer Memory Storage**: Fast in-memory buffer handling for incoming multipart/form-data images (`upload.single("image")`).
- **ImageKit SDK Integration**: Direct binary upload to ImageKit cloud CDN and persistent URL generation.
- **Post Metadata Persistence**: Saves caption and hosted image URL directly to MongoDB.
- **CORS Configuration**: Pre-configured CORS policies for seamless communication with the Vite client (`http://localhost:5173`).

### 3. Post Management REST API (`post-app/`)

A modular CRUD REST API with full lifecycle post management:

- Complete Create, Read, Update, and Delete operations for user posts.
- Sorted queries (`createdAt: -1`) to serve latest content first.
- Parameterized routes with error handling for invalid or missing resource IDs.

### 4. Notes CRUD API (`api/` & `practice/`)

Hands-on implementations demonstrating core MongoDB & Mongoose operations:

- `POST /notes` — Create new notes.
- `GET /notes` — Retrieve notes.
- `PATCH /notes/:id` — Update note descriptions by ID.
- `DELETE /notes/:id` — Remove note documents by ID.

### 5. Express Server Fundamentals (`create-server/`)

Starter module demonstrating foundational Node.js and Express concepts:

- Creating an Express server instance (`const app = express()`).
- Basic HTTP routing (`GET /`, `GET /about`).
- Port listening and request lifecycles.

---

## 🛠️ Tech Stack & Tools

| Category | Technologies |
|---|---|
| **Runtime & Framework** | Node.js, Express.js (v5) |
| **Database & ODM** | MongoDB, Mongoose (v9) |
| **Authentication & Security** | JSON Web Tokens (`jsonwebtoken`), `bcrypt`, `crypto`, `cookie-parser` |
| **File Upload & Media** | `multer`, `@imagekit/nodejs` |
| **Frontend** | React 18 / 19, Vite, Tailwind CSS / Vanilla CSS |
| **Logging & Utilities** | `morgan`, `dotenv`, `cors` |

---

## 📡 API Reference & Endpoints

### 🔐 Authentication Service (`authentication/`)

#### 1. Register User
- **Endpoint**: `POST /api/auth/register`
- **Body**:
```json
{
  "name": "john_doe",
  "email": "user@example.com",
  "password": "your_password"
}
```
- **Response** `201 Created`:
```json
{
  "message": "user register successfully",
  "user": {
    "_id": "<user_id>",
    "name": "john_doe",
    "email": "user@example.com"
  },
  "accessToken": "<access_token>"
}
```
*(Sets `refreshToken` in HttpOnly Cookie)*

#### 2. Get Authenticated User Profile
- **Endpoint**: `GET /api/auth/get-me`
- **Headers**: `Authorization: Bearer <access_token>`
- **Response** `200 OK`:
```json
{
  "message": "user fetched successfully",
  "user": {
    "_id": "<user_id>",
    "name": "john_doe",
    "email": "user@example.com"
  }
}
```

#### 3. Refresh Access Token
- **Endpoint**: `GET /api/auth/refresh-token`
- **Cookies**: `refreshToken=<refresh_token>`
- **Response** `200 OK`:
```json
{
  "message": "Access token refreshed successfully",
  "accessToken": "<access_token>"
}
```

#### 4. Logout
- **Endpoint**: `GET /api/auth/logout`
- **Cookies**: `refreshToken=<refresh_token>`
- **Response** `200 OK`:
```json
{
  "message": "Logged out successfully"
}
```

---

### 📸 Media Posts Service (`project/backend/`)

| Method | Endpoint | Description | Content-Type |
|---|---|---|---|
| `POST` | `/create-post` | Upload image to storage and create post | `multipart/form-data` (`image`, `caption`) |
| `GET` | `/posts` | Get all posts | `application/json` |

---

### 📝 Posts API (`post-app/backend/`)

| Method | Endpoint | Description | Body / Params |
|---|---|---|---|
| `GET` | `/api/posts` | Fetch all posts | - |
| `POST` | `/api/posts` | Create a post | `{ "caption": "...", "image": "..." }` |
| `PUT` | `/api/posts/:id` | Update post by ID | `{ "caption": "...", "image": "..." }` |
| `DELETE` | `/api/posts/:id` | Delete post by ID | - |

---

### 📒 Notes API (`api/`)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/notes` | Create a new note (`{ "title": "...", "discription": "..." }`) |
| `GET` | `/notes` | Retrieve notes |
| `PATCH` | `/notes/:id` | Update note description |
| `DELETE` | `/notes/:id` | Delete note by ID |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or MongoDB Atlas instance)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Running

#### 1. Running the Authentication Service
```bash
cd authentication
npm install
node server.js
```

#### 2. Running the Media Upload Fullstack Project
```bash
# Backend
cd project/backend
npm install
node server.js

# Frontend (in another terminal)
cd project/frontend
npm install
npm run dev
```

#### 3. Running the Post App
```bash
# Backend
cd post-app/backend
npm install
node server.js
```

#### 4. Running the Notes API
```bash
cd api
npm install
node server.js
```

---

## 🔒 Security & Architecture Highlights

1. **Defensive Storage of Tokens**: Refresh tokens are never stored in raw plaintext in the database. Instead, SHA-256 hashes are stored to guard against database leak vulnerabilities.
2. **HttpOnly Cookie Protection**: Refresh tokens are shielded against XSS (Cross-Site Scripting) attacks by setting `httpOnly: true` and `sameSite: "strict"`.
3. **Graceful Session Revocation**: Logging out sets `revoked: true` on the database session and clears the cookie, preventing token reuse.
4. **Decoupled Architecture**: Clear separation of concerns with dedicated folders for controllers, routes, models, services, and database connections.

---

## 👨‍💻 Author & Contribution

Developed as part of the Backend Development journey. Feel free to explore, learn, and contribute!
