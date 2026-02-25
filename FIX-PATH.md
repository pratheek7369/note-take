# Fix Node.js PATH Issue

Node.js is installed but not in your PATH environment variable. Here are solutions:

## Solution 1: Use the Helper Script (Quick Fix)

Use the `run-npm.ps1` script to run npm commands:

```powershell
.\run-npm.ps1 install
.\run-npm.ps1 run dev
```

## Solution 2: Fix PATH Permanently (Recommended)

### Option A: Using GUI
1. Press `Win + X` and select "System"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "User variables", find "Path" and click "Edit"
5. Click "New" and add: `C:\Program Files\nodejs`
6. Click "OK" on all dialogs
7. **Close ALL terminal windows** and reopen

### Option B: Using PowerShell (Run as Administrator)
1. Right-click PowerShell → "Run as Administrator"
2. Run this command:
```powershell
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", "User") + ";C:\Program Files\nodejs", "User")
```
3. Close ALL terminal windows and reopen

## Solution 3: Use Full Path Directly

You can use the full path in commands:
```powershell
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## Verify Fix

After fixing PATH, restart terminal and run:
```powershell
node --version
npm --version
```

Both should show version numbers.
