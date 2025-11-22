# 🎓 Smart Subject Allocation & Elective Management System (SSAEMS) – Backend

## 🚀 Tech Stack
**MERN Stack:** MongoDB | Express.js | Node.js  
**Tools:** JWT | Multer | bcryptjs | Morgan | CSV Parser

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Project
```bash
git clone <your-repo-url>
cd backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create `.env` File
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ssaems
JWT_SECRET=supersecretkey123
NODE_ENV=development
```

### 4️⃣ Run the Server
```bash
npm run dev
```

### 5️⃣ Seed the Admin User
```bash
node seedAdmin.js
```
✅ Output:
```
✅ Admin user created successfully!
Email: admin@ssaems.com
Password: Admin@123
```

---

## 🧩 Authentication Routes (Public + Protected)

### 🔹 Register (Student or Faculty)
**POST** `/api/auth/register`
```json
{
  "name": "Riya Sharma",
  "email": "riya@example.com",
  "password": "123456",
  "role": "student"
}
```

**Response**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "6748c56f88a8a6e5f9f...",
    "name": "Riya Sharma",
    "email": "riya@example.com",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 🔹 Login
**POST** `/api/auth/login`
```json
{
  "email": "riya@example.com",
  "password": "123456"
}
```

**Response**
```json
{
  "message": "Login successful",
  "user": {
    "id": "6748c56f88a8a6e5f9f...",
    "name": "Riya Sharma",
    "email": "riya@example.com",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 🔹 Protected Profile Route
**GET** `/api/auth/profile`  
**Headers:**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "message": "Welcome to your profile",
  "user": {
    "_id": "6748c56f88a8a6e5f9f...",
    "name": "Riya Sharma",
    "email": "riya@example.com",
    "role": "student"
  }
}
```

---

## 🎓 Student Module (JWT Protected)

### 🔹 View Profile
**GET** `/api/student/profile`  
**Headers:**
```
Authorization: Bearer <student-token>
```

**Response**
```json
{
  "message": "Profile fetched successfully",
  "student": {
    "_id": "6748c56f88a8a6e5f9f...",
    "name": "Riya Sharma",
    "email": "riya@example.com",
    "role": "student"
  }
}
```

---

### 🔹 Submit Preferences
**POST** `/api/student/preferences`  
**Headers:**
```
Authorization: Bearer <student-token>
```
**Body:**
```json
{
  "preferences": ["AI", "ML", "IoT"]
}
```
**Response**
```json
{
  "message": "Preferences submitted successfully"
}
```

---

### 🔹 Get Allotment Result
**GET** `/api/student/allotment`  
**Headers:**
```
Authorization: Bearer <student-token>
```

**Response**
```json
{
  "message": "Allotment fetched successfully",
  "allotment": {
    "subjectId": {
      "subjectName": "AI",
      "capacity": 60
    },
    "confirmed": false
  }
}
```

---

## 👨‍🏫 Faculty / Coordinator Module (JWT Protected)

### 🔹 Upload Student List (CSV)
**POST** `/api/faculty/upload-students`  
**Headers:**
```
Authorization: Bearer <faculty-token>
```
**Body (form-data):**
| Key | Type | Value |
|------|------|--------|
| file | File | `students.csv` |

**Example CSV:**
```csv
name,email,password,percentage
Amit,amit@example.com,123456,85
Riya,riya@example.com,123456,91
```

**Response**
```json
{
  "message": "Students uploaded successfully"
}
```

---

### 🔹 Add New Subject
**POST** `/api/faculty/subjects`
**Headers:**
```
Authorization: Bearer <faculty-token>
```
**Body:**
```json
{
  "subjectName": "Machine Learning",
  "capacity": 40,
  "eligibility": "CGPA > 7.0"
}
```
**Response**
```json
{
  "message": "Subject added successfully",
  "subject": {
    "subjectName": "Machine Learning",
    "capacity": 40,
    "eligibility": "CGPA > 7.0"
  }
}
```

---

### 🔹 Get All Subjects
**GET** `/api/faculty/subjects`  
**Headers:**
```
Authorization: Bearer <faculty-token>
```

**Response**
```json
[
  {
    "_id": "6748d40d7d29a45a54e6f931",
    "subjectName": "Machine Learning",
    "capacity": 40,
    "eligibility": "CGPA > 7.0"
  }
]
```

---

### 🔹 Run Allocation
**POST** `/api/faculty/allocate`  
**Headers:**
```
Authorization: Bearer <faculty-token>
```

**Response**
```json
{
  "message": "Allocation completed successfully"
}
```

---

## 📚 Subject Routes (JWT Protected)

### 🎯 Postman API Collection — Subject Routes

Base URL:

http://localhost:5000/api/subjects

All routes are JWT-protected — you must log in as Faculty or Admin first via /api/auth/login
Then include the token in your Headers:

Authorization: Bearer <your_token_here>
Content-Type: application/json

🧩 1️⃣ Create a New Subject

Method: POST
URL: http://localhost:5000/api/subjects

Allowed Roles:
✅ Faculty
✅ Admin

Headers:

Authorization: Bearer <faculty-or-admin-token>
Content-Type: application/json

Body → raw → JSON

```json
{
  "subjectName": "Artificial Intelligence",
  "capacity": 60,
  "eligibility": "CGPA > 7.0"
}
```

Response:

```json
{
  "message": "Subject created successfully",
  "subject": {
    "_id": "675b2f49a4b0a729a4a5b431",
    "subjectName": "Artificial Intelligence",
    "capacity": 60,
    "eligibility": "CGPA > 7.0",
    "createdAt": "2025-11-06T15:30:12.123Z",
    "updatedAt": "2025-11-06T15:30:12.123Z"
  }
}
```

🧩 2️⃣ Get All Subjects

Method: GET
URL: http://localhost:5000/api/subjects

Allowed Roles:
✅ Student
✅ Faculty
✅ Admin

Headers:

Authorization: Bearer <any-valid-token>

Response:

```json
[
  {
    "_id": "675b2f49a4b0a729a4a5b431",
    "subjectName": "Artificial Intelligence",
    "capacity": 60,
    "eligibility": "CGPA > 7.0",
    "createdAt": "2025-11-06T15:30:12.123Z",
    "updatedAt": "2025-11-06T15:30:12.123Z"
  },
  {
    "_id": "675b2f49a4b0a729a4a5b432",
    "subjectName": "Machine Learning",
    "capacity": 50,
    "eligibility": "CGPA > 7.5"
  }
]
```

🧩 3️⃣ Get Subject by ID

Method: GET
URL:

http://localhost:5000/api/subjects/<subject_id>

Example:

http://localhost:5000/api/subjects/675b2f49a4b0a729a4a5b431

Allowed Roles:
✅ Student
✅ Faculty
✅ Admin

Headers:

Authorization: Bearer <any-valid-token>

Response:

```json
{
  "_id": "675b2f49a4b0a729a4a5b431",
  "subjectName": "Artificial Intelligence",
  "capacity": 60,
  "eligibility": "CGPA > 7.0",
  "createdAt": "2025-11-06T15:30:12.123Z",
  "updatedAt": "2025-11-06T15:30:12.123Z"
}
```

🧩 4️⃣ Update Subject

Method: PUT
URL:

http://localhost:5000/api/subjects/<subject_id>

Allowed Roles:
✅ Faculty
✅ Admin

Headers:

Authorization: Bearer <faculty-or-admin-token>
Content-Type: application/json

Body → raw → JSON

```json
{
  "capacity": 70,
  "eligibility": "CGPA > 7.2"
}
```

Response:

```json
{
  "message": "Subject updated successfully",
  "subject": {
    "_id": "675b2f49a4b0a729a4a5b431",
    "subjectName": "Artificial Intelligence",
    "capacity": 70,
    "eligibility": "CGPA > 7.2"
  }
}
```

🧩 5️⃣ Delete Subject (Admin only)

Method: DELETE
URL:

http://localhost:5000/api/subjects/<subject_id>

Allowed Roles:
✅ Admin only

Headers:

Authorization: Bearer <admin-token>

Response:

```json
{
  "message": "Subject deleted successfully"
}
```

✅ Summary Table
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| /api/subjects | POST | Create new subject | Faculty / Admin |
| /api/subjects | GET | Get all subjects | Any logged-in user |
| /api/subjects/:id | GET | Get subject by ID | Any logged-in user |
| /api/subjects/:id | PUT | Update subject details | Faculty / Admin |
| /api/subjects/:id | DELETE | Delete subject | Admin only |

💡 Example Test Order in Postman

Login as Admin/Faculty

POST /api/auth/login

Copy your token.

Add a New Subject

POST /api/subjects

List All Subjects

GET /api/subjects

Get Subject by ID

GET /api/subjects/<id>

Update Subject

PUT /api/subjects/<id>

Delete Subject (Admin only)

DELETE /api/subjects/<id>

🧠 Bonus Tip: Postman Environment Setup

To avoid pasting tokens every time:

Create a Postman environment variable called token.

In login request → “Tests” tab:

const data = pm.response.json();
pm.environment.set("token", data.token);

Then use this header in all other routes:

Authorization: Bearer {{token}}

---

## 🧑‍💼 Admin Module (Seeded)

### 🔹 Login as Admin
**POST** `/api/auth/login`
```json
{
  "email": "admin@ssaems.com",
  "password": "Admin@123"
}
```

**Response**
```json
{
  "message": "Login successful",
  "user": {
    "name": "System Administrator",
    "email": "admin@ssaems.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 🧭 Postman API Collection — SSAEMS Admin Module

All routes start with your backend base URL:

http://localhost:5000/api/admin

You must include your Admin JWT Token in headers:

Authorization: Bearer <admin-token>
Content-Type: application/json

### 1️⃣ Create a New Faculty (Manual by Admin)

**Endpoint:**

POST /api/admin/create-faculty

**Purpose:**
Admin creates a new faculty member (auto-approved, no approval required).

**Headers:**

Authorization: Bearer <admin-token>
Content-Type: application/json

**Body (JSON):**

```json
{
  "name": "Dr. Sneha Verma",
  "email": "sneha@faculty.com",
  "password": "Faculty@123"
}
```

**Expected Response:**

```json
{
  "message": "Faculty account created successfully",
  "faculty": {
    "id": "675f1a18b57f18a12c5a",
    "name": "Dr. Sneha Verma",
    "email": "sneha@faculty.com",
    "role": "faculty",
    "isApproved": true
  }
}
```

### 2️⃣ Get All Faculty (Approved + Pending)

**Endpoint:**

GET /api/admin/faculty

**Purpose:**
View all faculty accounts in the system.

**Headers:**

Authorization: Bearer <admin-token>

**Expected Response:**

```json
{
  "count": 3,
  "faculty": [
    {
      "_id": "675f1a18b57f18a12c5a",
      "name": "Dr. Sneha Verma",
      "email": "sneha@faculty.com",
      "role": "faculty",
      "isApproved": true
    },
    {
      "_id": "675f1a18b57f18a12c5b",
      "name": "Dr. Rajesh Nair",
      "email": "rajesh@faculty.com",
      "role": "faculty",
      "isApproved": false
    }
  ]
}
```

### 3️⃣ Get Pending Faculty Registrations

**Endpoint:**

GET /api/admin/faculty/pending

**Purpose:**
Lists all faculty who self-registered but haven’t been approved yet.

**Headers:**

Authorization: Bearer <admin-token>

**Expected Response:**

```json
{
  "count": 1,
  "pending": [
    {
      "_id": "675f1a18b57f18a12c5b",
      "name": "Dr. Rajesh Nair",
      "email": "rajesh@faculty.com",
      "role": "faculty",
      "isApproved": false
    }
  ]
}
```

### 4️⃣ Approve a Pending Faculty

**Endpoint:**

PUT /api/admin/faculty/approve/:id

**Example:**

PUT /api/admin/faculty/approve/675f1a18b57f18a12c5b

**Purpose:**
Approve a pending faculty account.

**Headers:**

Authorization: Bearer <admin-token>

**Expected Response:**

```json
{
  "message": "Faculty approved successfully"
}
```

### 5️⃣ Assign Faculty as Coordinator

**Endpoint:**

PUT /api/admin/faculty/assign-coordinator

**Purpose:**
Promote an approved faculty to Coordinator for a specific academic year.

**Headers:**

Authorization: Bearer <admin-token>
Content-Type: application/json

**Body (JSON):**

```json
{
  "facultyId": "675f1a18b57f18a12c5a",
  "assignedYear": "3rd Year"
}
```

**Expected Response:**

```json
{
  "message": "Faculty assigned as Coordinator successfully",
  "coordinator": {
    "id": "675f1a18b57f18a12c5a",
    "name": "Dr. Sneha Verma",
    "email": "sneha@faculty.com",
    "assignedYear": "3rd Year"
  }
}
```

**Error (if year already has a coordinator):**

```json
{
  "message": "A coordinator already exists for 3rd Year"
}
```

### 6️⃣ Get Admin Dashboard Analytics

**Endpoint:**

GET /api/admin/dashboard

**Purpose:**
View complete system statistics: students, faculty, coordinators, etc.

**Headers:**

Authorization: Bearer <admin-token>

**Expected Response:**

```json
{
  "totalStudents": 1200,
  "totalFaculty": 25,
  "pendingFaculty": 2,
  "totalCoordinators": 3,
  "totalSubjects": 10,
  "totalAllotments": 1175
}
```

### ⚙️ Testing Order (Recommended)

1️⃣ Register Faculty (as user) — /api/auth/register
2️⃣ View Pending Faculty — /api/admin/faculty/pending
3️⃣ Approve Faculty — /api/admin/faculty/approve/:id
4️⃣ Assign Coordinator — /api/admin/faculty/assign-coordinator
5️⃣ Check Dashboard — /api/admin/dashboard

---

✅ Summary Table
| Route | Method | Description | Access |
|-------|--------|-------------|--------|
| /api/admin/create-faculty | POST | Create a faculty account | Admin only |
| /api/admin/faculty | GET | View all faculty accounts | Admin only |
| /api/admin/faculty/pending | GET | View pending faculty registrations | Admin only |
| /api/admin/faculty/approve/:id | PUT | Approve a pending faculty | Admin only |
| /api/admin/faculty/assign-coordinator | PUT | Assign faculty as coordinator | Admin only |
| /api/admin/dashboard | GET | System summary stats | Admin only |

---

## 🧰 Utility Info

### 📦 Project Folder Overview
```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── studentController.js
│   ├── facultyController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── User.js
│   ├── Subject.js
│   ├── Preference.js
│   └── Allotment.js
├── routes/
│   ├── authRoutes.js
│   ├── studentRoutes.js
│   ├── facultyRoutes.js
├── seedAdmin.js
├── server.js
├── .env
└── package.json
```

---

## 🧠 Notes
- Use **Postman** to test routes with JWT tokens in headers.
- Only **Admin** can manage faculty accounts.
- Only **Faculty** can upload students and manage subjects.
- **Students** can only submit preferences and view their results.
- Seeded Admin credentials:
  ```
  Email: admin@ssaems.com
  Password: Admin@123
  ```

---

## 📈 Future Enhancements
- AI-based elective recommendation system  
- Integration with College ERP  
- Analytics dashboard for elective demand  
- Mobile app for student notifications  
- API Gateway for external integrations  

---

> 💡 **Created by:** _[Your Name]_  
> MERN Stack Project for Academic Automation and Efficiency
