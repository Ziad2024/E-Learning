# 🎓 E-Learning Platform API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

A robust, modular RESTful API for an Online Learning Management System (LMS). This backend powers a platform where instructors can create and manage courses, students can enroll in classes, and admins can oversee the entire ecosystem. 

Built with scalability, security, and clean code principles in mind.

---

## ✨ Key Features

* **Role-Based Access Control (RBAC):** Distinct permissions for `Admin`, `Instructor`, and `Student`.
* **Advanced Authentication:** Secure JWT-based authentication with password hashing (Bcrypt).
* **Course & Lesson Management:** Instructors can fully manage their curriculums, complete with nested lessons.
* **Student Enrollments:** Students can browse, search, and enroll in active courses securely.
* **Defensive Programming:** Protection against NoSQL injection (`express-mongo-sanitize`), global error handling, and robust `Joi` input validation.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Authentication:** JSON Web Tokens (JWT)
* **Security:** Helmet, CORS, Express Mongo Sanitize
* **Validation:** Joi

---

## 📂 Project Architecture (Modular Pattern)

The project is structured using a Feature-Driven Modular Architecture to keep the codebase clean, maintainable, and highly scalable.

    src/
    ├── DB/               # Database connection and Mongoose Models
    ├── middlewares/      # Global guards (Auth, Roles, Error Handling)
    ├── modules/          # Core Business Logic
    │   ├── auth/         # Registration, Login, and Tokens
    │   ├── courses/      # Course CRUD and search filters
    │   ├── enrollments/  # Student course registrations
    │   └── lessons/      # Lesson management for instructors
    ├── utils/            # Helper functions (API Errors, API Responses)
    └── main.js           # Express App Initialization

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 1. Clone the repository
    git clone https://github.com/Ahmed-Esmail-2001/e-learning-platform-api.git
    cd e-learning-platform-api

### 2. Install Dependencies
    npm install

### 3. Environment Variables
Create a `.env` file in the root directory and configure the following variables:

    PORT=4000
    DATABASE_URI=mongodb://127.0.0.1:27017/elearning
    JWT_SECRET=your_super_secret_key_here

### 4. Run the Server
    # For development
    npm run dev

    # For production
    npm start

---

## 📡 Core API Endpoints

### Authentication
* `POST /api/auth/register` - Register a new account
* `POST /api/auth/login` - Authenticate user and get token

### Courses
* `GET /api/courses` - Fetch all courses (supports pagination, filtering, search)
* `POST /api/courses` - Create a new course *(Instructor/Admin only)*
* `GET /api/courses/:id` - Get specific course details

### Lessons
* `GET /api/courses/:courseId/lessons` - Get all lessons for a course
* `POST /api/lessons` - Add a lesson to a course *(Instructor/Admin only)*

### Enrollments
* `POST /api/enrollments` - Enroll in a course *(Student only)*
* `GET /api/enrollments` - View enrolled courses

---

## 🤝 Contributing
Contributions are welcome! If you have suggestions or find a bug, please open an issue or submit a pull request.

## 📝 License
This project is open-source and available under the MIT License.
