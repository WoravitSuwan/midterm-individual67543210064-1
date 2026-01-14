const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(
    path.join(__dirname, '../../../students.db'),
    (err) => {
        if (!err) {
            db.run(`
                CREATE TABLE IF NOT EXISTS students (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_code TEXT UNIQUE,
                    first_name TEXT,
                    last_name TEXT,
                    email TEXT UNIQUE,
                    major TEXT,
                    gpa REAL DEFAULT 0,
                    status TEXT DEFAULT 'active',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);
        }
    }
);

module.exports = db;
