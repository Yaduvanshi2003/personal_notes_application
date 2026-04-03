# Premium Notes App

A full-stack, production-ready personal notes application built with React, Node.js, Express, and MongoDB. This application features a modern, dark-themed UI with glassmorphism effects and provides a seamless user experience for managing notes with authentication, searching, and tagging.

## Features

- **User Authentication**: Secure registration and login using JWT and bcrypt.
- **Note Management**: Create, read, update, and delete notes.
- **Search Functionality**: Quickly find notes by searching title and body content.
- **Tagging System**: Add and filter notes by custom tags.
- **Protected Routes**: Secure access to user-specific dashboards.
- **Modern Responsive UI**: Clean, premium design that works across desktop and mobile devices.
- **Production-Ready Backend**: Structured MVC architecture with standard error handling and validation.
- **Docker Support**: Backend can be easily containerized for deployment.

## Tech Stack

- **Frontend**: React (Vite), Axios, React Router v6, Vanilla CSS.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB (Atlas recommended).
- **Authentication**: JSON Web Tokens (JWT).
- **Styling**: Modern Vanilla CSS with dark mode and glassmorphism.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB account (Atlas cluster)

### Setup Instructions

1.  **Clone the Repository** (If applicable)

2.  **Backend Setup**
    - Navigate to the `backend` directory.
    - Install dependencies: `npm install`
    - Create a `.env` file based on `.env.example`:
      ```env
      PORT=5000
      MONGO_URI=your_mongodb_cluster_uri
      JWT_SECRET=your_jwt_secret_key
      ```
    - Start the backend server: `npm run dev` (development) or `npm start` (production).

3.  **Frontend Setup**
    - Navigate to the `frontend` directory.
    - Install dependencies: `npm install`
    - Create a `.env` file (optional, for changing API base URL):
      ```env
      VITE_API_URL=http://localhost:5000/api
      ```
    - Start the frontend development server: `npm run dev`.

## Environment Variables

### Backend
- `PORT`: The port number for the server (default: 5000).
- `MONGO_URI`: Your MongoDB Atlas connection string.
- `JWT_SECRET`: A secret key for signing JWT tokens.

### Frontend
- `VITE_API_URL`: The base URL of your backend API.

## Deployment

### Backend (Railway)
1.  Connect your GitHub repository to Railway.
2.  Deploy the `backend` folder.
3.  Add the environment variables (`MONGO_URI`, `JWT_SECRET`) in the Railway project settings.

### Frontend (Netlify)
1.  Connect your GitHub repository to Netlify.
2.  Set the build command to `npm run build` and the publish directory to `dist`.
3.  Add the environment variable `VITE_API_URL` pointing to your deployed backend.

## MongoDB Atlas Connection
1.  Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database).
2.  In "Network Access", allow your IP or allow access from anywhere (`0.0.0.0/0`) for development.
3.  In "Database Access", create a user with "Read and Write to any database" permissions.
4.  Get the connection string from the "Connect" button and replace `<password>` with your database user's password.

## Bonus: Docker
To run the backend with Docker:
```bash
cd backend
docker build -t notes-app-backend .
docker run -p 5000:5000 --env-file .env notes-app-backend
```
