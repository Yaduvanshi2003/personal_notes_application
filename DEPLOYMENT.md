# Deployment Guide for TaskApp

Follow these steps to deploy your full-stack application.

## 1. Prepare for Deployment

### Backend (.env)
Ensure your backend `.env` variables are ready for production. You will need a **MongoDB Atlas** connection string.
- `PORT=5000` (Railway/Render will override this)
- `MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/tasks-app`
- `JWT_SECRET=your_super_secret_key`
- `NODE_ENV=production`

### Frontend (.env)
Update your frontend API URL to point to your **deployed** backend URL.
- `VITE_API_URL=https://your-backend-url.railway.app/api`

---

## 2. Deploy the Backend (Railway / Render)
1.  Connect your GitHub repository to **Railway.app** or **Render.com**.
2.  Set the **Root Directory** to `backend`.
3.  Set the **Environment Variables** in the platform's dashboard:
    - `MONGO_URI`
    - `JWT_SECRET`
    - `NODE_ENV=production`
4.  The platform will automatically run `npm start`.

---

## 3. Deploy the Frontend (Netlify / Vercel)
1.  Connect your GitHub repository to **Netlify** or **Vercel**.
2.  Set the **Base Directory** to `frontend`.
3.  Set the **Build Command** to `npm run build`.
4.  Set the **Publish Directory** to `dist`.
5.  Set the **Environment Variable** `VITE_API_URL` to your backend's API URL (e.g., `https://your-backend.railway.app/api`).

---

## 4. Troubleshooting
- **CORS Errors**: Ensure the backend's `cors()` middleware allows your frontend's domain.
- **Mixed Content**: Ensure both frontend and backend are using `https`.
- **Database Connection**: Verify your MongoDB Atlas IP Whitelist allows "0.0.0.0/0" for deployment.
