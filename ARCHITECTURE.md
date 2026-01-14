# Student Management System - Architecture

## C1: System Context Diagram

┌─────────────────────────────────────────────────────┐
│ System User │
│ (ผู้ดูแลระบบ, อาจารย์, เจ้าหน้าที่) │
└────────────┬────────────────────────────────────────┘
│ HTTP/JSON (CRUD Operations)
▼
┌─────────────────────────────────────────────────────┐
│ Student Management System │
│ • จัดการข้อมูลนักศึกษา (CRUD) │
│ • คำนวณสถิติ (GPA เฉลี่ย, จำนวนสถานะ) │
│ • กรองนักศึกษาตามสาขาและสถานะ │
└────────────┬────────────────────────────────────────┘
│ SQL Queries
▼
┌─────────────────────────────────────────────────────┐
│ SQLite Database │
│ (students.db) │
└─────────────────────────────────────────────────────┘

yaml
Copy code

### Actors
- **System User**: ผู้ดูแลระบบ, อาจารย์, เจ้าหน้าที่ที่ใช้ระบบจัดการนักศึกษา

### System
- **Student Management System**
  - จัดการข้อมูลนักศึกษา (Create, Read, Update, Delete)
  - คำนวณค่าเฉลี่ย GPA และสถิติสถานะนักศึกษา
  - กรองข้อมูลนักศึกษาตามสาขา (Major) และสถานะ (Status)

### External Systems
- **SQLite Database**: ฐานข้อมูลสำหรับจัดเก็บข้อมูลนักศึกษา

---

## C2: Container Diagram - Layered Architecture

┌────────────────────────────────────────────────────────────────┐
│ CLIENT (Browser / Postman) │
└────────────┬───────────────────────────────────────────────────┘
│ HTTP/JSON
▼
╔════════════════════════════════════════════════════════════════╗
║ STUDENT MANAGEMENT SYSTEM ║
╠════════════════════════════════════════════════════════════════╣
║ ┌───────────────────────────────────────────────────────────┐ ║
║ │ PRESENTATION LAYER │ ║
║ │ • Routes (studentRoutes.js) │ ║
║ │ • Controllers (studentController.js) │ ║
║ │ • Middlewares (errorHandler.js) │ ║
║ │ │ ║
║ │ จัดการ HTTP Request / Response │ ║
║ └──────────────────────┬────────────────────────────────────┘ ║
║ │ ║
║ ▼ ║
║ ┌───────────────────────────────────────────────────────────┐ ║
║ │ BUSINESS LOGIC LAYER │ ║
║ │ • Services (studentService.js) │ ║
║ │ • Validators (studentValidator.js) │ ║
║ │ │ ║
║ │ Business Rules: │ ║
║ │ - student_code ต้องเป็นตัวเลข 10 หลัก │ ║
║ │ - email ต้องอยู่ในรูปแบบที่ถูกต้อง │ ║
║ │ - GPA ต้องอยู่ระหว่าง 0.0 – 4.0 │ ║
║ │ - ห้ามลบนักศึกษาที่มีสถานะ active │ ║
║ │ - ห้ามเปลี่ยนสถานะนักศึกษาที่ withdrawn │ ║
║ │ - คำนวณสถิติ (active, graduated, avg GPA) │ ║
║ └──────────────────────┬────────────────────────────────────┘ ║
║ │ ║
║ ▼ ║
║ ┌───────────────────────────────────────────────────────────┐ ║
║ │ DATA ACCESS LAYER │ ║
║ │ • Repositories (studentRepository.js) │ ║
║ │ • Database (connection.js) │ ║
║ │ │ ║
║ │ Methods: │ ║
║ │ - findAll(major, status) │ ║
║ │ - findById(id) │ ║
║ │ - create(studentData) │ ║
║ │ - update(id, studentData) │ ║
║ │ - updateGPA(id, gpa) │ ║
║ │ - updateStatus(id, status) │ ║
║ │ - delete(id) │ ║
║ └──────────────────────┬────────────────────────────────────┘ ║
╚═════════════════════════╪══════════════════════════════════════╝
│ SQL
▼
┌─────────────────────────┐
│ SQLite Database │
│ (students.db) │
│ │
│ Table: students │
│ - id │
│ - student_code │
│ - first_name │
│ - last_name │
│ - email │
│ - major │
│ - gpa │
│ - status │
│ - created_at │
└─────────────────────────┘
