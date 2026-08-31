# PulseChat App

PulseChat is a real-time chat application built with a Node.js/Express backend and a React + Vite frontend. It supports user authentication, online presence, direct messaging, media attachments, and profile updates with a MongoDB-backed data model.

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

### Infrastructure / Deployment

- Nixpacks configuration included for deployment support
- Static frontend build served by the backend in production mode

## Features

- Secure authentication with JWT cookies
- User search / contact listing among registered users
- Real-time message delivery and online status updates
- Chat history by conversation partner
- Image upload support in messages and profile images
- Responsive layout for desktop and mobile screens
- Production-ready static asset serving for the built frontend

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

Before running the app, make sure you have:

- Node.js 20.19 or newer
- npm
- MongoDB instance or MongoDB Atlas connection string
- Cloudinary account and API credentials
- Resend account for email sending
- Arcjet API key (optional but configured in the app)

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

### Production build

From the project root:

```bash
npm run build
```

This installs dependencies in both subprojects and builds the frontend bundle. The backend can then serve production assets.

### Start production server

```bash
npm start
```

This runs the backend server from the project root.

## Usage

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

## Notes

- The backend serves the production frontend build from `../frontend/dist` when `NODE_ENV=production`.
- Socket.IO is used for live delivery of new messages and online user presence.
- The workspace includes a root-level package.json script to simplify project setup and startup for deployment or local production use.
