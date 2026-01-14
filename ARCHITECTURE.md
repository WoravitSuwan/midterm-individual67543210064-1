# Student Management System – Architecture

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
- System User: ผู้ดูแลระบบ, อาจารย์, เจ้าหน้าที่ที่ใช้ระบบจัดการนักศึกษา

### System
- Student Management System  
  - จัดการข้อมูลนักศึกษา (Create, Read, Update, Delete)  
  - คำนวณค่าเฉลี่ย GPA และสถิติสถานะนักศึกษา  
  - กรองข้อมูลนักศึกษาตามสาขา (Major) และสถานะ (Status)  

### External Systems
- SQLite Database: ฐานข้อมูลสำหรับจัดเก็บข้อมูลนักศึกษา

---

## C2: Container Diagram – Layered Architecture

+-----------------------------+
|   CLIENT                    |
|  (Browser / Postman)        |
+-------------+---------------+
              |
              | HTTP / JSON
              v
+-----------------------------------------------+
|        STUDENT MANAGEMENT SYSTEM               |
|                                               |
|  +-----------------------------------------+  |
|  |  PRESENTATION LAYER                     |  |
|  |-----------------------------------------|  |
|  |  - studentRoutes.js                     |  |
|  |  - studentController.js                 |  |
|  |  - errorHandler.js                      |  |
|  |                                         |  |
|  |  Handle HTTP Request / Response          |  |
|  +----------------------+------------------+  |
|                         |                     |
|                         v                     |
|  +-----------------------------------------+  |
|  |  BUSINESS LOGIC LAYER                   |  |
|  |-----------------------------------------|  |
|  |  - studentService.js                   |  |
|  |  - studentValidator.js                 |  |
|  |                                         |  |
|  |  Business Rules:                        |  |
|  |  • student_code = 10 digits             |  |
|  |  • valid email format                  |  |
|  |  • GPA between 0.0 – 4.0                |  |
|  |  • cannot delete active student         |  |
|  |  • withdrawn status is immutable        |  |
|  +----------------------+------------------+  |
|                         |                     |
|                         v                     |
|  +-----------------------------------------+  |
|  |  DATA ACCESS LAYER                     |  |
|  |-----------------------------------------|  |
|  |  - studentRepository.js                |  |
|  |  - connection.js                       |  |
|  |                                         |  |
|  |  CRUD Operations                       |  |
|  |  • findAll / findById                  |  |
|  |  • create / update / delete            |  |
|  |  • updateGPA / updateStatus            |  |
|  +----------------------+------------------+  |
+-------------------------|---------------------+
                          |
                          | SQL
                          v
              +-------------------------------+
              |        SQLITE DATABASE        |
              |         students.db           |
              |-------------------------------|
              |  students table               |
              |  - id                         |
              |  - student_code               |
              |  - first_name                 |
              |  - last_name                  |
              |  - email                      |
              |  - major                      |
              |  - gpa                        |
              |  - status                     |
              |  - created_at                |
              +-------------------------------+

