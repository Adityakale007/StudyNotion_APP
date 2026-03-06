# 🚀 StudyNotion – Full Stack EdTech Platform

[![React](https://img.shields.io/badge/Frontend-React-blue)]()
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)]()
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)]()
[![Express](https://img.shields.io/badge/API-Express.js-lightgrey)]()
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black)]()
[![Render](https://img.shields.io/badge/Backend-Render-purple)]()
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

**StudyNotion** is a **full-stack EdTech platform** built using the **MERN Stack** that allows students to explore and enroll in courses while enabling instructors to create and manage educational content.

It simulates the core experience of modern learning platforms like **Udemy or Coursera**.

---

# 🌐 Live Demo

Frontend
👉 [https://study-notion-app-five.vercel.app](https://study-notion-app-five.vercel.app)

Backend API
👉 [https://studynotion-backend-8bx4.onrender.com](https://studynotion-backend-8bx4.onrender.com)

---

# 📸 Screenshots

### Homepage
<img width="600" height="500" alt="Screenshot 2026-03-07 at 5 22 34 AM" src="https://github.com/user-attachments/assets/775153fe-d3fc-439e-b7ba-4976d2efb158" />
<img width="600" height="500" alt="Screenshot 2026-03-07 at 5 23 02 AM" src="https://github.com/user-attachments/assets/74efbd70-1f87-4763-81b6-7e13e8484044" />

### Course Page

<img width="600" height="500" alt="Screenshot 2026-03-07 at 5 20 47 AM" src="https://github.com/user-attachments/assets/6f8b797a-8a61-42a9-9b63-bb0a39454031" />

### Instructor Dashboard

<img width="600" height="500" alt="Screenshot 2026-03-07 at 5 24 20 AM" src="https://github.com/user-attachments/assets/88f3bd16-4aa6-4325-8aff-31f9a5cae1f2" />

---

# ✨ Features

## 👨‍🎓 Student Features

* Browse and explore courses
* Secure signup/login with OTP verification
* Purchase courses via Razorpay
* Access purchased course content
* Track course progress
* Rate and review courses
* Update profile details

---

## 👨‍🏫 Instructor Features

* Instructor dashboard
* Create, edit, and delete courses
* Upload course content and videos
* Manage sections and lectures
* Track enrolled students

---

## ⚙️ Platform Features

* 🔐 JWT Authentication
* 📧 OTP Email Verification
* 💳 Razorpay Payment Integration
* ☁️ Cloudinary Media Storage
* 📊 Instructor Analytics Dashboard
* 📁 Course Progress Tracking

---

# 🛠 Tech Stack

| Layer          | Technology                            |
| -------------- | ------------------------------------- |
| Frontend       | React.js, Redux Toolkit, Tailwind CSS |
| Backend        | Node.js, Express.js                   |
| Database       | MongoDB Atlas                         |
| Authentication | JWT, Bcrypt                           |
| Payments       | Razorpay                              |
| Media Storage  | Cloudinary                            |
| Deployment     | Vercel, Render                        |

---

# 🏗 System Architecture

```
Client (React Frontend)
        │
        ▼
REST API (Node.js + Express)
        │
        ▼
MongoDB Database
        │
        ▼
Cloudinary (Media Storage)
```

### Architecture Diagram

![Architecture](images/architecture.png)

---

# 📂 Project Structure

```
StudyNotion_APP
│
├── src/                   # React frontend
│   ├── components
│   ├── pages
│   ├── redux
│   ├── services
│   └── utils
│
├── server/                # Backend API
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── config
│
├── images/                # Screenshots for README
│
└── README.md
```

---

# 🔗 API Endpoints

### Authentication

```
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/auth/sendotp
POST /api/v1/auth/reset-password
```

### Courses

```
GET /api/v1/course/getAllCourses
POST /api/v1/course/createCourse
PUT /api/v1/course/editCourse
DELETE /api/v1/course/deleteCourse
```

### Payments

```
POST /api/v1/payment/capturePayment
POST /api/v1/payment/verifyPayment
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the repository

```bash
git clone https://github.com/Adityakale007/StudyNotion_APP.git
cd StudyNotion_APP
```

---

## 2️⃣ Install dependencies

Frontend

```
npm install
```

Backend

```
cd server
npm install
```

---

## 3️⃣ Setup Environment Variables

Create `.env` inside **server**

```
PORT=4000

MONGODB_URL=your_mongodb_connection
JWT_SECRET=your_secret

CLOUD_NAME=cloudinary_name
API_KEY=cloudinary_api_key
API_SECRET=cloudinary_api_secret

RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email
MAIL_PASS=your_password
```

---

## 4️⃣ Run the project

Backend

```
cd server
npm run dev
```

Frontend

```
npm start
```

---

# 🚀 Deployment

| Service       | Platform      |
| ------------- | ------------- |
| Frontend      | Vercel        |
| Backend       | Render        |
| Database      | MongoDB Atlas |
| Media Storage | Cloudinary    |

---

# 🔮 Future Enhancements

* Dark mode UI
* Course completion certificates
* Admin dashboard
* Course recommendation system
* Real-time notifications
* Mobile optimization

---

# 👨‍💻 Author

**Aditya Kale**
B.Tech 
NIT Raipur

GitHub
[https://github.com/Adityakale007](https://github.com/Adityakale007)

---

# ⭐ Support

If you like this project, consider starring the repository ⭐

```
⭐ Star the repo to support the project!
```
