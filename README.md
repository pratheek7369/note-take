# 🗒️ Note-Taking Application (With Authentication & Deployment)

A complete Note-Taking Application with JWT Authentication that allows users to create, edit, delete, and manage notes with basic formatting options. Each user can securely manage their own notes.

## ✨ Features

### 🔐 Authentication
- ✅ Login & Logout using JWT
- ✅ Token stored in localStorage
- ✅ Protected routes (only authenticated users can access notes)
- ✅ Automatic redirect to login for unauthenticated users
- ✅ Persist login on page refresh

### 👤 User Features
- ✅ Create new notes
- ✅ Edit existing notes
- ✅ Delete notes
- ✅ View all notes
- ✅ Search notes by title/content

### ✍️ Formatting Options
- ✅ Bold
- ✅ Italic
- ✅ Underline
- ✅ Bullet points

### 🛡️ Edge Cases Handled
- ✅ Invalid login credentials
- ✅ Unauthorized access
- ✅ Empty note submission
- ✅ API failure
- ✅ Page refresh (persist login)

## Tech Stack

- React.js (Functional Components & Hooks)
- React Router DOM
- JWT Authentication
- MockAPI (for Notes CRUD)
- CSS (Custom Styling)
- Vite (Build Tool)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Update MockAPI URL:
   - Create a MockAPI account at https://mockapi.io/
   - Create a new project and resource named "notes"
   - Update the `MOCKAPI_BASE_URL` in `src/services/api.js` with your MockAPI URL

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
 ├── components/
 │   ├── ProtectedRoute.jsx
 │   ├── Navbar.jsx
 │   ├── NoteCard.jsx
 │   └── NoteEditor.jsx
 ├── pages/
 │   ├── Login.jsx
 │   └── Notes.jsx
 ├── services/
 │   └── api.js
 ├── utils/
 │   └── auth.js
 ├── App.jsx
 ├── index.js
 └── index.css
```

## Authentication

- Login API: `POST https://apis.ccbp.in/login`
- JWT token is stored in localStorage
- Protected routes require authentication
- Logout clears token and redirects to login

## MockAPI Setup

1. Create a MockAPI project
2. Create a resource named "notes" with the following schema:
   - id (string)
   - title (string)
   - content (string)
   - userId (string)

3. Update the `MOCKAPI_BASE_URL` in `src/services/api.js`

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub (see GitHub Setup below)
2. Go to [Vercel](https://vercel.com) and sign in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"
7. Your app will be live at `https://your-project.vercel.app`

Environment variables (important)
- `VITE_LOGIN_URL`: Production login URL used by the frontend to authenticate users. Set this to the auth endpoint you intend to use (for example `https://apis.ccbp.in/login`).

Steps to deploy and configure Vercel
1. Push your project to GitHub and note the repository URL.
2. Go to https://vercel.com and sign in with your GitHub account.
3. Click "New Project" → Import Git Repository → choose your repo.
4. Vercel will auto-detect a Vite app. Build command: `npm run build`. Output directory: `dist`.
5. In the Project Settings → Environment Variables, add `VITE_LOGIN_URL` with value `https://apis.ccbp.in/login` (or your auth provider URL). Set it for "Production".
6. Deploy the project. After deployment the site will be available at the Vercel URL shown in the dashboard.

Notes
- If you use a remote MockAPI for notes data, ensure the endpoints are publicly accessible and support CORS for your deployed origin.
- For a fully production-ready backend consider replacing the mock API with a real Node/Express + MongoDB API (MERN) which you can also deploy to Vercel (serverless functions) or another host.

### Deploy to Netlify

1. Push code to GitHub (see GitHub Setup below)
2. Go to [Netlify](https://netlify.com) and sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"
7. Your app will be live at `https://your-project.netlify.app`

## 📦 GitHub Setup

1. Initialize Git repository:
```bash
git init
git add .
git commit -m "Initial commit: Note-Taking App with JWT Authentication"
```

2. Create a new repository on GitHub

3. Push code to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 🔗 Live Project URL

After deployment, update this section with your live URL:
- **Vercel:** `https://your-project.vercel.app`
- **Netlify:** `https://your-project.netlify.app`

## License

MIT
