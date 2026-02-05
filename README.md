# Hirely – Job Application & Internship Management System (MERN)

Hirely is a full-stack MERN application where:

- Admins post jobs/internships  
- Users apply for jobs  
- Admins review applications and update status  
- Users track their application status  

---

## 🚀 Tech Stack

Frontend:
- React (Vite)
- React Router DOM
- Axios

Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

---

## 👥 Roles

### Admin
- Login
- Create / Update / Delete Jobs
- View all applications
- Update application status

### User
- Register / Login
- Browse jobs
- Apply for jobs
- View applied jobs
- Track status

---

## 🔐 Authentication

- Email & Password
- JWT based auth
- Role based access
- Protected routes

---

## 📂 Folder Structure
hirely/
├── client/
└── server/



---


## 📡 API Endpoints


### Auth
POST /api/auth/register  
POST /api/auth/login  


### Jobs
GET /api/jobs  
GET /api/jobs/:id  
POST /api/jobs (admin)  
PUT /api/jobs/:id (admin)  
DELETE /api/jobs/:id (admin)  


### Applications
POST /api/applications/:jobId  
GET /api/applications/user  
GET /api/applications/admin  
PATCH /api/applications/:id/status  


---


## ⚙️ Setup Instructions


### Backend



cd server
npm install
npm run dev



Create `.env`:



PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
ADMIN_EMAIL=admin@hirely.com



---


### Frontend



cd client
npm install
npm run dev



---


## 🎯 Features


- JWT authentication
- Role based dashboards
- Prevent duplicate applications
- Status tracking workflow
- Persistent login


---


## 🧠 Learning Outcomes


- MERN architecture
- Auth & security
- State management
- API integration
- Real-world workflow system