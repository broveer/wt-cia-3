# College Admin Dashboard

A full-stack web application for managing student records in a college.
Built as part of the __Web Technologies CIA - 3__ assignment.

Link to ZIP file: [College Admin Dashboard.zip](https://drive.google.com/file/d/1bOniF_AwTGehppKSMKAuohB0BytMPPIJ/view?usp=sharing)

| | |
|---|---|
| **Submitted By** | Brahmvir Singh Seeray |
| **Register No.** | 2420916 |
| **Class** | 4 BBA DS |

---

## Features

- **Dashboard** — view total student count and number of departments at a glance
- **Student Table** — lists all students with their Name, Email, Department, and Phone
- **Add Student** — form to enroll a new student into the system
- **Edit Student** — update any student's details via a modal popup
- **Delete Student** — remove a student with a confirmation prompt
- All data is persisted in a cloud MongoDB database

---

## Running the Project

> **Prerequisites:** [Node.js](https://nodejs.org) must be installed.

```bash
# 1. Navigate into the project folder
cd client

# 2. Install all dependencies (only needed once)
npm install

# 3. Start both the frontend and backend together
npm start
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS v4 + Neumorphic design |
| Bundler | Vite |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (cloud) + Mongoose |
| Routing | React Router v7 |

---

## Project Structure

```
client/
├── server.js          # Express API entry point
├── models/
│   └── Student.js     # Mongoose schema
├── routes/
│   └── students.js    # REST API routes (GET / POST / PUT / DELETE)
└── src/
    ├── components/
    │   ├── Navbar.tsx
    │   ├── StudentTable.tsx
    │   └── EditModal.tsx
    └── pages/
        ├── Dashboard.tsx
        └── AddStudent.tsx
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | Fetch all students |
| `POST` | `/api/students` | Add a new student |
| `PUT` | `/api/students/:id` | Update a student |
| `DELETE` | `/api/students/:id` | Delete a student |
