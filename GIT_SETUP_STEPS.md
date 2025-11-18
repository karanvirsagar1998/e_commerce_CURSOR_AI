# Git Setup and GitHub Upload - Step by Step Guide

## Step 1: Install Git

1. **Download Git for Windows:**
   - Go to: https://git-scm.com/download/win
   - Download the latest version (it will download an .exe file)

2. **Install Git:**
   - Run the downloaded installer
   - Click "Next" through the installation wizard
   - **Important:** Keep default settings (they're fine)
   - When asked about "Choosing the default editor", you can keep "Nano" or choose "Visual Studio Code" if you prefer
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

3. **Verify Installation:**
   - Close and reopen your terminal/IDE (or PowerShell)
   - Run: `git --version`
   - You should see something like: `git version 2.x.x`

---

## Step 2: Configure Git (First Time Only)

After installing Git, configure it with your name and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Replace with your actual name and email** (this will be used for your commits)

---

## Step 3: Create GitHub Repository

1. **Go to GitHub:**
   - Visit: https://github.com
   - Sign in (or create an account if you don't have one)

2. **Create New Repository:**
   - Click the "+" icon in the top right corner
   - Select "New repository"
   - Repository name: `e-commerce-app` (or any name you prefer)
   - Description: "Modern e-commerce application with React and Spring Boot"
   - Choose **Public** or **Private**
   - **IMPORTANT:** Do NOT check:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   - Click "Create repository"

3. **Copy Repository URL:**
   - After creating, GitHub will show you a page with instructions
   - Copy the HTTPS URL (it will look like: `https://github.com/YOUR_USERNAME/e-commerce-app.git`)
   - **Save this URL** - you'll need it in Step 5

---

## Step 4: Initialize Git in Your Project

Open PowerShell or Terminal in your project directory and run these commands:

```bash
# Navigate to your project (if not already there)
cd d:\IT\e-commerce

# Initialize Git repository
git init

# Add all files (the .gitignore will automatically exclude node_modules, target, etc.)
git add .

# Create your first commit
git commit -m "Initial commit: E-commerce application with React and Spring Boot"
```

---

## Step 5: Connect to GitHub and Push

```bash
# Add your GitHub repository as remote (replace with YOUR actual URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** When you run `git push`, GitHub will ask for authentication:
- **Option A:** Use GitHub Personal Access Token (recommended)
- **Option B:** Use GitHub Desktop (easier for beginners)

---

## Step 6: Authentication (Choose One Method)

### Method A: Personal Access Token (Recommended)

1. **Create Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: "E-commerce Project"
   - Select scopes: Check `repo` (this gives full repository access)
   - Click "Generate token"
   - **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

2. **Use Token:**
   - When `git push` asks for password, paste the token instead
   - Username: Your GitHub username

### Method B: GitHub Desktop (Easier)

1. **Download GitHub Desktop:**
   - Go to: https://desktop.github.com/
   - Download and install

2. **Sign in:**
   - Open GitHub Desktop
   - Sign in with your GitHub account
   - It will handle authentication automatically

3. **Publish from Desktop:**
   - File → Add Local Repository
   - Select: `d:\IT\e-commerce`
   - Click "Publish repository"
   - Check "Keep this code private" if you want it private
   - Click "Publish repository"

---

## Troubleshooting

### If `git push` fails with authentication error:

1. **Check your repository URL:**
   ```bash
   git remote -v
   ```
   Should show your GitHub URL

2. **Update remote URL if wrong:**
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

### If you get "fatal: not a git repository":

- Make sure you're in the project directory: `cd d:\IT\e-commerce`
- Run `git init` first

### If files are too large:

- Check `.gitignore` is working: `git status` should not show `node_modules` or `target`
- If it does, the `.gitignore` file might not be in the right location

---

## Quick Command Reference

```bash
# Check Git status
git status

# See what files will be committed
git status

# Add specific file
git add filename

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# See commit history
git log

# Check remote repository
git remote -v

# Push to GitHub
git push -u origin main
```

---

## After Successful Upload

1. **Verify on GitHub:**
   - Go to your repository page on GitHub
   - You should see all your files and folders

2. **Add Repository Topics:**
   - Click on repository settings (gear icon)
   - Scroll to "Topics"
   - Add: `react`, `spring-boot`, `java`, `ecommerce`, `vite`, `tailwindcss`

3. **Update Repository Description:**
   - Click the gear icon next to "About"
   - Add a description: "Modern e-commerce application with React frontend and Spring Boot backend"

---

## Need Help?

If you encounter any issues:
1. Make sure Git is installed and in your PATH
2. Verify you're in the correct directory
3. Check that `.gitignore` file exists in the root
4. Ensure your GitHub repository URL is correct
5. Verify authentication (token or GitHub Desktop)


