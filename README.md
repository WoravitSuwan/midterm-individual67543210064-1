# Student Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** นาย วรวิทย์ สุวรรณ
- **Student ID:** 67543210064-1
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier)

## 📂 Project Structure
Presentation Layer
ทำหน้าที่จัดการ HTTP request/response, routing และ middleware
ประกอบด้วย routes, controllers และ error handling

Business Logic Layer
ทำหน้าที่จัดการกฎทางธุรกิจ (Business Rules) และ validation ของข้อมูล
ประกอบด้วย services และ validators

Data Access Layer
ทำหน้าที่ติดต่อและจัดการฐานข้อมูล
ใช้ Repository pattern เพื่อแยกการเข้าถึงข้อมูลออกจาก business logic

นอกจากนี้ยังมีส่วนของ public สำหรับ Frontend UI และ server.js เป็น entry point ของระบบ

## 🎯 Refactoring Summary

### ปัญหาของ Monolithic (เดิม):
- โค้ดทั้งหมดถูกรวมอยู่ในไฟล์เดียว ทำให้ไฟล์มีขนาดใหญ่และซับซ้อน Business Logic, Validation, Database Query และ HTTP Handling ปะปนกัน

- การแก้ไขโค้ดส่วนหนึ่งมีความเสี่ยงกระทบส่วนอื่นของระบบ

- การทำงานร่วมกันเป็นทีมทำได้ยาก เพราะต้องแก้ไขไฟล์เดียวกัน

- การทดสอบและบำรุงรักษาระบบในระยะยาวทำได้ยาก

### วิธีแก้ไขด้วย Layered Architecture:
- แยกโค้ดออกเป็น Presentation Layer, Business Logic Layer และ Data Access Layer ให้แต่ละ layer มีหน้าที่ความรับผิดชอบที่ชัดเจน

- ใช้ Service เพื่อรวม business logic ไว้ในจุดเดียว

- ใช้ Repository เพื่อแยกการเข้าถึงฐานข้อมูลออกจาก business logic

- ใช้ Middleware สำหรับจัดการ error แบบรวมศูนย์

### ประโยชน์ที่ได้รับ:
- โค้ดอ่านง่าย เป็นระเบียบ และเข้าใจโครงสร้างได้รวดเร็ว

- ลดการพึ่งพาซึ่งกันและกันของแต่ละส่วน (Low Coupling)

- ง่ายต่อการแก้ไข บำรุงรักษา และขยายระบบในอนาคต

- รองรับการทำงานร่วมกันเป็นทีมได้ดีขึ้น

- สามารถทดสอบและ debug แต่ละ layer แยกจากกันได้

## 🚀 How to Run

\`\`\`bash
# 1. Clone repository
git clone [your-repo-url]

# 2. Install dependencies
npm install

# 3. Run server
npm start
<img width="1980" height="1087" alt="Screenshot 2569-01-14 at 11 29 02" src="https://github.com/user-attachments/assets/f8fa11c7-e79a-4267-8183-d7c0e9cbfa9a" />

# 4. Test API
# Open browser: http://localhost:3000
\`\`\`

## 📝 API Endpoints
- GET /api/students
<img width="1757" height="913" alt="Screenshot 2569-01-14 at 11 22 11" src="https://github.com/user-attachments/assets/7f48f525-0fe3-4ed7-bfdf-a4c8a5da61cf" />

<img width="1757" height="913" alt="Screenshot 2569-01-14 at 11 26 39" src="https://github.com/user-attachments/assets/c0af82ca-c922-447b-9732-27decbc4c5f4" />

<img width="1757" height="913" alt="Screenshot 2569-01-14 at 11 28 53" src="https://github.com/user-attachments/assets/9dd1c954-e28f-464e-88ac-8826012650d1" />

<img width="1757" height="913" alt="Screenshot 2569-01-14 at 11 19 20" src="https://github.com/user-attachments/assets/e809fd86-30c9-4ab1-aff8-c06240f1e2e1" />

<img width="1757" height="913" alt="Screenshot 2569-01-14 at 11 20 41" src="https://github.com/user-attachments/assets/0bb2f57e-7e94-429a-aec4-f58bed6c1902" />

- GET /api/students/:id

- POST /api/students

- PUT /api/students/:id

- PATCH /api/students/:id/gpa

- PATCH /api/students/:id/status

- DELETE /api/students/:id
