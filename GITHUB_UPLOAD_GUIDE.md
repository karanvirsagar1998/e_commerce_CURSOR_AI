# GitHub Upload Guide

## Option 1: Manual Upload via GitHub Web Interface (Easiest)

### Steps:

1. **Create a New Repository on GitHub:**
   - Go to https://github.com
   - Click the "+" icon in the top right → "New repository"
   - Name it (e.g., "e-commerce-app" or "ecommerce-project")
   - Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Upload Files Manually:**
   - On the new repository page, click "uploading an existing file"
   - Drag and drop or select these folders/files:
     - `backend/` folder (entire folder)
     - `frontend/` folder (entire folder)
     - `README.md`
     - `PROMPT_HISTORY.md`
     - `GITHUB_UPLOAD_GUIDE.md`
     - `.gitignore` (if visible)
   - Add a commit message: "Initial commit: E-commerce application"
   - Click "Commit changes"

### ⚠️ Important Notes:
- **DO NOT upload:**
  - `backend/target/` folder (compiled files)
  - `frontend/node_modules/` folder (dependencies)
  - `frontend/dist/` folder (build output)
  - Any `.class` files
  - IDE files (`.idea/`, `.vscode/`)

- **The `.gitignore` file will help exclude these automatically if you use Git later**

---

## Option 2: Using Git Commands (If Git is Installed)

### Prerequisites:
- Install Git from https://git-scm.com/download/win
- Restart your terminal/IDE after installation

### Steps:

1. **Initialize Git Repository:**
   ```bash
   cd d:\IT\e-commerce
   git init
   ```

2. **Add All Files:**
   ```bash
   git add .
   ```

3. **Create Initial Commit:**
   ```bash
   git commit -m "Initial commit: E-commerce application"
   ```

4. **Add Remote Repository:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```
   (Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual GitHub username and repository name)

5. **Push to GitHub:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

---

## Option 3: Using GitHub Desktop (GUI Tool)

1. Download GitHub Desktop from https://desktop.github.com/
2. Sign in with your GitHub account
3. Click "File" → "Add Local Repository"
4. Browse to `d:\IT\e-commerce`
5. Click "Publish repository" to create and push to GitHub

---

## Recommended Folder Structure for GitHub:

```
e-commerce/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── .gitignore
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
├── README.md
├── PROMPT_HISTORY.md
├── GITHUB_UPLOAD_GUIDE.md
└── .gitignore
```

---

## After Uploading:

1. **Update README.md** with:
   - Project description
   - Setup instructions
   - How to run the application
   - Technologies used

2. **Add Topics/Tags** to your repository:
   - Click on repository settings
   - Add topics like: `react`, `spring-boot`, `java`, `ecommerce`, `vite`

3. **Consider Adding:**
   - License file (MIT, Apache, etc.)
   - Contributing guidelines
   - Issue templates

---

## Quick Checklist Before Upload:

- [ ] `.gitignore` file is in root directory
- [ ] `backend/target/` is excluded
- [ ] `frontend/node_modules/` is excluded
- [ ] All source code files are included
- [ ] README.md is updated
- [ ] No sensitive information (API keys, passwords) in code

---

## Need Help?

If you encounter any issues:
1. Check that file sizes are under 100MB (GitHub limit)
2. Ensure you're logged into GitHub
3. Verify repository name doesn't already exist
4. Check browser console for errors during upload

