# Setup Guide - Note Taking Application

## Prerequisites

Before you can run this application, you need to install **Node.js** (which includes npm).

## Step 1: Install Node.js

### Option A: Download from Official Website (Recommended)

1. Visit: **https://nodejs.org/en/download**
2. Download the **Windows Installer (.msi)** - Choose the **LTS version** (recommended)
3. Run the installer:
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installation wizard
   - **Important**: Make sure "Add to PATH" option is checked (it's checked by default)
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

4. **Restart your terminal/PowerShell** (close and reopen it)

5. Verify installation:
   ```bash
   node --version
   npm --version
   ```
   Both commands should show version numbers.

### Option B: Using Package Managers

**Using Chocolatey:**
```bash
choco install nodejs-lts
```

**Using winget:**
```bash
winget install OpenJS.NodeJS.LTS
```

## Step 2: Install Project Dependencies

Once Node.js is installed, navigate to the project directory and run:

```bash
npm install
```

This will install all required dependencies:
- React
- React DOM
- React Router DOM
- Vite (build tool)

## Step 3: Configure MockAPI

1. Create a free account at **https://mockapi.io/**
2. Create a new project
3. Create a resource named **"notes"** with these fields:
   - `id` (string, auto-generated)
   - `title` (string)
   - `content` (string)
   - `userId` (string)

4. Copy your MockAPI endpoint URL (it will look like: `https://xxxxxxxxxxxxx.mockapi.io/api/v1/notes`)

5. Open `src/services/api.js` and replace this line:
   ```javascript
   const MOCKAPI_BASE_URL = 'https://your-mockapi-url.mockapi.io/api/v1/notes';
   ```
   with your actual MockAPI URL:
   ```javascript
   const MOCKAPI_BASE_URL = 'https://xxxxxxxxxxxxx.mockapi.io/api/v1/notes';
   ```

## Step 4: Run the Application

Start the development server:

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is busy).

Open your browser and navigate to the URL shown in the terminal.

## Step 5: Test the Application

1. **Login**: Use the login API endpoint `https://apis.ccbp.in/login`
   - Enter any username and password
   - On successful login, you'll be redirected to the Notes page

2. **Create Notes**: Click "+ New Note" button
   - Add a title and content
   - Use formatting buttons (Bold, Italic, Underline, Bullet List)
   - Click "Save"

3. **Edit Notes**: Click the edit icon (✏️) on any note

4. **Delete Notes**: Click the delete icon (🗑️) on any note

5. **Search**: Use the search bar to filter notes by title or content

6. **Logout**: Click the "Logout" button in the navbar

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Restart your terminal after installing Node.js
- Verify installation with `node --version`

### "Port already in use"
- Vite will automatically use the next available port
- Check the terminal output for the actual URL

### API Errors
- Verify MockAPI URL is correct in `src/services/api.js`
- Check that MockAPI resource is named "notes"
- Ensure MockAPI resource has the correct fields (id, title, content, userId)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder, ready for deployment on Vercel or Netlify.

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Vercel will auto-detect Vite
5. Deploy!

### Deploy to Netlify

1. Push code to GitHub
2. Go to https://netlify.com
3. Add new site from Git
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

## Need Help?

- Check Node.js installation: https://nodejs.org/
- MockAPI documentation: https://mockapi.io/docs
- React documentation: https://react.dev/
