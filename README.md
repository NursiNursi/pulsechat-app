# PulseChat App

PulseChat is a real-time chat application built with a Node.js/Express backend and a React + Vite frontend, backed by a MongoDB data model. This project was built as a **portfolio and full-stack (MERN) learning project** — it is not intended for general public/production use.

## Project Purpose

This project was built to:

- Practice and demonstrate full-stack development skills from the ground up (authentication, real-time messaging, media uploads, etc.)
- Serve as a learning exercise in integrating several third-party services (Cloudinary, Resend, Arcjet) into a single application
- Serve as a showcase project for a developer portfolio

> ⚠️ **Note:** Since this project is meant for learning and showcasing, it has not been fully hardened for real production use (e.g., no comprehensive security audit, only basic rate limiting, and environment configuration is set up for development/demo purposes).

## Overview

PulseChat is designed as a modern chat app that includes:

- User signup, login, logout, and authenticated session management
- Real-time messaging using Socket.IO
- Contact list and chat history retrieval
- Optional image messages uploaded through Cloudinary
- User profile updates with avatar support
- Email notifications via Resend
- Basic bot/rate-limit protection via Arcjet middleware hooks

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Zustand for state management
- Axios for API calls
- Tailwind CSS + DaisyUI
- Socket.IO client
- React Hot Toast

### Backend

- Node.js 20+
- Express
- MongoDB with Mongoose
- Socket.IO
- JWT authentication
- Cloudinary for image uploads
- Resend for email delivery
- Arcjet for request protection
- dotenv for environment configuration

### Infrastructure / Deployment (optional, for demo purposes)

- Nixpacks configuration included for demo deployment support
- Static frontend build can be served by the backend in production mode

## Features

- Secure authentication with JWT cookies
- User search / contact listing among registered users
- Real-time message delivery and online status updates
- Chat history by conversation partner
- Image upload support in messages and profile images
- Responsive layout for desktop and mobile screens
- Static asset serving for the built frontend (a production-like setup shown for learning purposes)

## Project Structure

```text
pulsechat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── emails/
│   │   │   ├── emailHandlers.js
│   │   │   └── emailTemplates.js
│   │   ├── lib/
│   │   │   ├── arcjet.js
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   ├── resend.js
│   │   │   ├── socket.js
│   │   │   └── utils.js
│   │   ├── middleware/
│   │   │   ├── arcjet.middleware.js
│   │   │   ├── auth.middleware.js
│   │   │   └── socket.auth.middleware.js
│   │   ├── models/
│   │   │   ├── Message.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── server.js
│   ├── package.json
│   └── .env (create locally)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── package.json
├── nixpacks.toml
├── .gitignore
└── README.md
```

## Prerequisites

To run this project locally (e.g. for portfolio review or code exploration), make sure you have:

- Node.js 20.19 or newer
- npm
- A local MongoDB instance or a MongoDB Atlas connection string
- A Cloudinary account and API credentials (a free tier account works fine for testing)
- A Resend account for email sending (optional — can be skipped if you only want to test the chat features)
- An Arcjet API key (optional)

## Installation

### 1) Install root dependencies

```bash
npm install
```

### 2) Install backend dependencies

```bash
cd backend
npm install
```

### 3) Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Environment Configuration

Create a `.env` file inside the backend directory with the following variables:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/pulsechat
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_sender@example.com
EMAIL_FROM_NAME=PulseChat

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

> The frontend uses the backend API at `http://localhost:3000/api` in development mode via the Axios client configuration.
>
> Note: the values above are placeholders for local development/demo use. Do not commit real credentials or secrets to a public repository.

## Running the Application

### Start the backend

From the backend folder:

```bash
npm run dev
```

This runs the Express server with Node watch mode.

### Start the frontend

From the frontend folder in a separate terminal:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

### Production build (for demo purposes)

From the project root:

```bash
npm run build
```

This installs dependencies in both subprojects and builds the frontend bundle. The backend can then serve the production assets for demo purposes.

### Start production server

```bash
npm start
```

This runs the backend server from the project root.

## Usage (Demo)

1. Open the frontend in your browser.
2. Create a new account or log in.
3. Select a contact from the list to begin chatting.
4. Send text messages or image attachments.
5. View online users and chat history in real time.
6. Update your profile image and profile details from the authenticated UI.

## API Overview

The backend exposes API routes under `/api`.

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/check`
- `PUT /api/auth/update-profile`

### Messaging

- `GET /api/message/:id` - Get conversation history with a user
- `POST /api/message/send/:id` - Send a message to a user

## What I Learned / Technical Challenges

Some of the challenges explored and solved during development of this project:

- Configuring Cloudinary (including handling a 403 error related to API key roles)
- Fixing a database connection race condition (making sure `connectDB()` is `await`ed before `app.listen()`)
- Debugging DNS resolution for MongoDB Atlas (switching from `mongodb+srv://` to a standard connection string when needed)
- Fixing common React bugs: a component placed outside `<Routes>`, a missing `await` on an Axios call, and incorrect `finally` logic on a loading state
- Adjusting Node.js version compatibility with Vite in the deployment configuration (Nixpacks)

## Notes

- The backend can serve the production frontend build from `../frontend/dist` when `NODE_ENV=production` — this is shown as an example setup, not for actual public hosting.
- Socket.IO is used for live delivery of new messages and online user presence.
- This project is open for learning purposes — feel free to explore the code, fork it, or use it as a learning reference.
