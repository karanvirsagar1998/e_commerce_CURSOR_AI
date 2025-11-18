# Installation Guide

This guide will help you install all the necessary software to run the e-commerce application.

## Required Software

### 1. Java Development Kit (JDK) 17 or Higher

**Why:** Spring Boot 3.x requires Java 17 or higher.

**Installation:**
- **Windows:**
  - Download from: https://adoptium.net/ (recommended) or https://www.oracle.com/java/technologies/downloads/
  - Choose JDK 17 or higher (LTS version recommended)
  - Run the installer and follow the setup wizard
  - Make sure to check "Add to PATH" during installation

- **macOS:**
  ```bash
  # Using Homebrew
  brew install openjdk@17
  ```

- **Linux (Ubuntu/Debian):**
  ```bash
  sudo apt update
  sudo apt install openjdk-17-jdk
  ```

**Verify Installation:**
```bash
java -version
javac -version
```
You should see version 17 or higher.

---

### 2. Apache Maven

**Why:** Used to build and manage the Spring Boot project dependencies.

**Installation:**
- **Windows:**
  - Download from: https://maven.apache.org/download.cgi
  - Download the `apache-maven-X.X.X-bin.zip` file
  - Extract to a folder (e.g., `C:\Program Files\Apache\maven`)
  - Add Maven's `bin` directory to your PATH environment variable:
    - Go to System Properties → Environment Variables
    - Edit the `Path` variable
    - Add: `C:\Program Files\Apache\maven\bin`

- **macOS:**
  ```bash
  # Using Homebrew
  brew install maven
  ```

- **Linux (Ubuntu/Debian):**
  ```bash
  sudo apt update
  sudo apt install maven
  ```

**Verify Installation:**
```bash
mvn -version
```
You should see Maven version information.

---

### 3. Node.js and npm

**Why:** Required to run the React frontend application.

**Installation:**
- **All Platforms:**
  - Download from: https://nodejs.org/
  - Choose the **LTS (Long Term Support)** version (recommended)
  - Run the installer and follow the setup wizard
  - npm comes bundled with Node.js

**Verify Installation:**
```bash
node -v
npm -v
```
You should see version numbers for both.

**Note:** Node.js 18 or higher is recommended for this project.

---

## Optional but Recommended

### 4. Integrated Development Environment (IDE)

**Options:**
- **IntelliJ IDEA** (Community Edition is free)
  - Download: https://www.jetbrains.com/idea/download/
  - Excellent Spring Boot support
  
- **Eclipse IDE for Enterprise Java and Web Developers**
  - Download: https://www.eclipse.org/downloads/
  - Free and open-source

- **Visual Studio Code**
  - Download: https://code.visualstudio.com/
  - Free, lightweight, with extensions for Java and React
  - Recommended extensions:
    - Extension Pack for Java
    - ESLint
    - Prettier
    - Tailwind CSS IntelliSense

### 5. Git (Optional)

**Why:** For version control (if you want to track changes).

**Installation:**
- Download from: https://git-scm.com/downloads
- Follow the installation wizard

**Verify Installation:**
```bash
git --version
```

---

## Quick Verification Checklist

Run these commands in your terminal/command prompt to verify everything is installed:

```bash
# Check Java
java -version
javac -version

# Check Maven
mvn -version

# Check Node.js and npm
node -v
npm -v
```

All commands should return version numbers without errors.

---

## After Installation - Running the Application

Once all software is installed, follow these steps:

### 1. Start the Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

Wait for the message: "Started EcommerceApplication in X.XXX seconds"
The backend will be running on: http://localhost:8080

### 2. Start the Frontend (React)

Open a **new terminal window** and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be running on: http://localhost:5173

### 3. Open in Browser

Navigate to: **http://localhost:5173**

---

## Troubleshooting

### Java Issues
- **"java is not recognized"**: Make sure Java is added to your PATH environment variable
- **Wrong Java version**: Make sure you have JDK 17 or higher, not just JRE

### Maven Issues
- **"mvn is not recognized"**: Add Maven's bin directory to your PATH
- **Download errors**: Check your internet connection and firewall settings

### Node.js Issues
- **"node is not recognized"**: Restart your terminal after installation
- **npm install fails**: Try clearing npm cache: `npm cache clean --force`

### Port Already in Use
- If port 8080 is busy: Change `server.port` in `backend/src/main/resources/application.properties`
- If port 5173 is busy: Vite will automatically use the next available port

---

## System Requirements

- **Operating System:** Windows 10/11, macOS 10.15+, or Linux
- **RAM:** Minimum 4GB (8GB recommended)
- **Disk Space:** At least 2GB free space
- **Internet:** Required for downloading dependencies

---

## Need Help?

If you encounter any issues during installation:
1. Check the official documentation for each tool
2. Verify all environment variables are set correctly
3. Make sure you have administrator/root privileges if needed
4. Restart your computer after installing new software

