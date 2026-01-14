# Student Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** นาย วรวิทย์ สุวรรณ  
- **Student ID:** 67543210064-1  
- **Course:** ENGSE207 Software Architecture  

---

## 🏗️ Architecture Style
**Layered Architecture (3-Tier)**  
ประกอบด้วย Presentation Layer, Business Logic Layer และ Data Access Layer

---

## 📂 Project Structure

```text
midterm-individual67543210064-1/
├── src/
│   ├── presentation/              # Presentation Layer (HTTP / UI Interaction)
│   │   ├── routes/                # กำหนด API routes
│   │   │   └── studentRoutes.js
│   │   ├── controllers/           # รับ request / ส่ง response
│   │   │   └── studentController.js
│   │   └── middlewares/           # จัดการ error กลาง
│   │       └── errorHandler.js
│   │
│   ├── business/                  # Business Logic Layer
│   │   ├── services/              # กฎทางธุรกิจของระบบ
│   │   │   └── studentService.js
│   │   └── validators/            # ตรวจสอบความถูกต้องของข้อมูล
│   │       └── studentValidator.js
│   │
│   └── data/                      # Data Access Layer
│       ├── repositories/          # ติดต่อฐานข้อมูล (CRUD)
│       │   └── studentRepository.js
│       └── database/              # การเชื่อมต่อฐานข้อมูล
│           └── connection.js
│
├── public/                        # Frontend UI
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── api.js
│       └── app.js
│
├── server.js                      # Entry point ของระบบ
├── package.json
├── students.db                    # SQLite database
└── README.md
🎯 Refactoring Summary
ปัญหาของ Monolithic (เดิม)
โค้ดทั้งหมดรวมอยู่ในไฟล์เดียว (server.js) ทำให้ไฟล์มีขนาดใหญ่และซับซ้อน

Business Logic, Validation, Database Query และ HTTP Handling ปะปนกัน

แก้ไขโค้ดส่วนหนึ่งมีความเสี่ยงกระทบส่วนอื่น

ทำงานร่วมกันเป็นทีมได้ยาก เพราะหลายคนต้องแก้ไฟล์เดียวกัน

ทดสอบและบำรุงรักษาระบบในระยะยาวทำได้ยาก

วิธีแก้ไขด้วย Layered Architecture
แยกโค้ดออกเป็น 3 Layer ตามหน้าที่ความรับผิดชอบ

Presentation Layer: จัดการ HTTP request/response และ routing

Business Layer: จัดการกฎทางธุรกิจและ validation

Data Layer: ติดต่อและจัดการฐานข้อมูล

ใช้ Service และ Repository เพื่อแยก Business Logic ออกจาก Database

ใช้ Middleware สำหรับจัดการ error แบบรวมศูนย์

โครงสร้างโค้ดชัดเจน สามารถพัฒนาและแก้ไขเป็นส่วน ๆ ได้

ประโยชน์ที่ได้รับ
โค้ดอ่านง่าย เป็นระเบียบ และเข้าใจได้เร็ว

ลดผลกระทบของการแก้ไขโค้ด (Low Coupling)

เพิ่มความสามารถในการบำรุงรักษาและขยายระบบในอนาคต

รองรับการทำงานร่วมกันเป็นทีมได้ดีขึ้น

ง่ายต่อการทดสอบและ debug แต่ละ layer แยกจากกัน

🚀 How to Run
bash
Copy code
# 1. Clone repository
git clone [your-repo-url]

# 2. Install dependencies
npm install

# 3. Run server
npm start
เปิด Browser: http://localhost:3000

<img width="1980" height="1087" alt="Screenshot 2569-01-14 at 11 29 02" src="https://github.com/user-attachments/assets/8c558136-6af4-4a24-9713-3b2703c8db14" />

📝 API Endpoints
GET /api/students
ดึงข้อมูลนักศึกษาทั้งหมด (รองรับ query major, status)

GET /api/students/:id
ดึงข้อมูลนักศึกษาตามรหัส (ID)

POST /api/students
เพิ่มข้อมูลนักศึกษาใหม่

PUT /api/students/:id
แก้ไขข้อมูลนักศึกษา

PATCH /api/students/:id/gpa
อัปเดตค่า GPA ของนักศึกษา

PATCH /api/students/:id/status
เปลี่ยนสถานะนักศึกษา (active, graduated, suspended, withdrawn)

DELETE /api/students/:id
ลบข้อมูลนักศึกษา (ไม่สามารถลบนักศึกษาที่มีสถานะ active)
