const db = require('../database/connection');

class StudentRepository {

    findAll(major, status) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM students';
            let params = [];
            let cond = [];

            if (major) { cond.push('major=?'); params.push(major); }
            if (status) { cond.push('status=?'); params.push(status); }

            if (cond.length) sql += ' WHERE ' + cond.join(' AND ');

            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM students WHERE id=?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    create(data) {
        const { student_code, first_name, last_name, email, major } = data;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO students 
                 (student_code, first_name, last_name, email, major)
                 VALUES (?,?,?,?,?)`,
                [student_code, first_name, last_name, email, major],
                function (err) {
                    if (err) reject(err);
                    else {
                        db.get('SELECT * FROM students WHERE id=?', [this.lastID],
                            (_, row) => resolve(row));
                    }
                }
            );
        });
    }

    update(id, data) {
        const { student_code, first_name, last_name, email, major } = data;
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE students SET student_code=?, first_name=?, last_name=?, email=?, major=? WHERE id=?`,
                [student_code, first_name, last_name, email, major, id],
                (err) => {
                    if (err) reject(err);
                    else {
                        db.get('SELECT * FROM students WHERE id=?', [id],
                            (_, row) => resolve(row));
                    }
                }
            );
        });
    }

    updateGPA(id, gpa) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE students SET gpa=? WHERE id=?', [gpa, id], () => {
                db.get('SELECT * FROM students WHERE id=?', [id],
                    (_, row) => resolve(row));
            });
        });
    }

    updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE students SET status=? WHERE id=?', [status, id], () => {
                db.get('SELECT * FROM students WHERE id=?', [id],
                    (_, row) => resolve(row));
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM students WHERE id=?', [id], (err) => {
                if (err) reject(err);
                else resolve({ message: 'Student deleted successfully' });
            });
        });
    }
}

module.exports = new StudentRepository();
