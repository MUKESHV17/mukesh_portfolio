# Premium Cyberpunk Full-Stack Developer Portfolio — Mukesh V

⚡ **Live Production Deployment**: [https://mukesh-portfolio-theta.vercel.app/](https://mukesh-portfolio-theta.vercel.app/)

Welcome to the repository of Mukesh V's premium, recruiter-focused personal developer portfolio website. This production-ready full-stack application features a stunning, high-performance dark cyberpunk space theme with glassmorphic cards, custom canvas particle backdrops, terminal typing effects, and smooth responsive scroll animations.

---

## 🚀 Key Highlights & Tech Stack

### Frontend (Client-side)
* **Framework**: React.js (Vite)
* **Styling**: Tailwind CSS (custom cyberpunk design tokens, glowing shadows, text gradients)
* **Animations**: Framer Motion (slide-reveal entries, hover scale triggers, modal transitions)
* **Icons**: Lucide React Icons
* **UI Features**: Lightweight interactive HTML5 Canvas `ParticlesBg`, custom trailing cursor ring, scroll-to-top glowing action trackers.

### Backend (Server-side)
* **Runtime**: Node.js & Express.js (Modular ES Modules architecture)
* **Database**: MongoDB (Mongoose models, auto-seeder, secure CRUD logs)
* **Securities**: JWT validation, bcrypt hashing, express-rate-limit gateways (login & contact spam prevention)
* **Alert System**: Nodemailer dispatching beautiful HTML emails to Mukesh and cyber-themed auto-acknowledgments back to the visitor.
* **Cached Proxy**: Dynamic cache for GitHub API profile metrics (`MUKESHV17`) protecting Mukesh from API rate limits.

---

## 📂 File Directory Structure

```text
mukesh-portfolio-fullstack/
│
├── package.json                   # Root orchestrator scripts
├── README.md                      # Complete system documentation (This file)
│
├── backend/                       # Express REST API Server
│   ├── .env                       # Active environment parameters (Created on setup)
│   ├── package.json               # Backend dependencies
│   ├── server.js                  # App bootstrap entry
│   ├── config/
│   │   └── db.js                  # Database connection & dynamic auto-seeder
│   ├── middleware/
│   │   ├── auth.js                # JWT validation guard
│   │   └── errorHandler.js        # Global Express exception parser
│   ├── models/
│   │   ├── User.js                # Admin credential schema
│   │   ├── Project.js             # Project showcase schema
│   │   ├── Skill.js               # Categorized skill badges schema
│   │   ├── Experience.js          # Chronological timeline schema
│   │   ├── Certification.js       # Verified credentials schema
│   │   └── Message.js             # Recruiter contact inquiries schema
│   ├── routes/
│   │   ├── authRoutes.js          # Authentication routing
│   │   ├── projectRoutes.js       # Projects CRUD
│   │   ├── skillRoutes.js         # Skills CRUD
│   │   ├── certRoutes.js          # Certifications CRUD
│   │   ├── expRoutes.js           # Experience CRUD
│   │   ├── messageRoutes.js       # Message inbox REST endpoints
│   │   └── githubRoutes.js        # Cached GitHub proxy
│   └── utils/
│       └── mailer.js              # Nodemailer templates & transport dispatch
│
└── frontend/                      # React SPA Client
    ├── package.json               # Frontend dependencies
    ├── tailwind.config.js         # Cyberpunk theme color mappings & glows
    ├── index.html                 # SEO shell & Google Fonts preloads
    └── src/
        ├── main.jsx               # Render bootstrap
        ├── index.css              # Custom scrollbars, glassmorphism card tokens
        ├── App.jsx                # Router gateway map
        ├── context/
        │   └── AuthContext.jsx    # Persistent JWT admin session provider
        ├── utils/
        │   └── api.js             # Shared pre-configured Axios client
        ├── components/
        │   ├── Navbar.jsx         # Glassmorphic header & active sections tracker
        │   ├── Footer.jsx         # Styled cyberpunk footer with quick links
        │   ├── ParticlesBg.jsx    # Interactive neural canvas background
        │   ├── CustomCursor.jsx   # Trailing glowing cyan pointer
        │   ├── ScrollToTop.jsx    # Slide-up viewport scroll helper
        │   ├── ProjectCard.jsx    # Frosted project tile with tech stack tags
        │   ├── ProjectModal.jsx   # Long-form popup overview dialog
        │   ├── SkillCard.jsx      # Progress bar & category highlight card
        │   ├── ExpTimeline.jsx    # Alternating vertical chronology grid
        │   └── SocialGlowCard.jsx # Coding badges (LeetCode, GFG, Codeforces)
        └── pages/
            ├── MainPortfolio.jsx  # Primary sectioned portfolio view
            ├── AdminLogin.jsx     # Glowing cyber gateway door
            └── AdminDashboard.jsx # Full CRUD controls tab center
```

---

## 🏁 Local Quick Start & Seeding

### 1. Database Setup
Make sure MongoDB is installed locally and running on the default port `27017`. Alternatively, you can obtain a free MongoDB Atlas connection string and set `MONGO_URI` inside `backend/.env`.

### 2. Dependency Installations
From the root project folder, run our custom monorepo scripts to automatically install all packages in one run:
```bash
npm run install-all
```

### 3. Launch Development Environments
Once dependencies are fetched, run the unified development script. It will run both the Express backend on `http://localhost:5000` and the Vite React frontend on `http://localhost:5173` concurrently:
```bash
npm run dev
```

### 4. Automatic Database Seeding
On first startup, the backend automatically seeds the MongoDB database with:
* **Initial Admin Credentials**:
  * **Username**: `admin`
  * **Password**: `MukeshCyber2026!`
  * **Email**: `mukesh631701@gmail.com`
* **3 Major Projects** (Healthcare risk prediction, E-Wallet microservices, YOLO Traffic flow optimizer)
* **20+ Categorized Skills**
* **Internship Timelines & Certifications**

---

## 🔒 Accessing the Administration Portal

To customize your resume links, modify projects, update skills, or inspect contact form submissions:
1. Open the website at `http://localhost:5173`
2. Click the glowing **PORTAL** lock button in the top-right navbar or navigate directly to `http://localhost:5173/login`.
3. Input the seeded administrative credentials listed above.
4. Access the **Control Panel** to perform full CRUD or read incoming recruiter messages!

---

## 🌍 Production Deployment Guides

### Backend Deployment (Render.com)
1. Register a free account on [Render](https://render.com/).
2. Create a new **Web Service** connected to your GitHub repository.
3. Set the following Build settings:
   * **Root Directory**: `backend`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
4. Set your Environment Variables in Render:
   * `MONGO_URI`: Your MongoDB Atlas Cluster connection URL (e.g., `mongodb+srv://...`)
   * `JWT_SECRET`: A complex custom key.
   * `EMAIL_USER` & `EMAIL_PASS`: Gmail address and App Password (if enabling real email notifications).

### Frontend Deployment (Vercel)
1. Register a free account on [Vercel](https://vercel.com/).
2. Create a new **Project** connected to your GitHub repository.
3. Configure the Project settings:
   * **Root Directory**: `frontend`
   * **Framework Preset**: `Vite`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. Deploy! The frontend resolves API requests dynamically and communicates with the backend seamlessly.
