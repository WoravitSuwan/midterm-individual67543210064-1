const studentService = require('../../business/services/studentService');

class StudentController {

    async getAllStudents(req, res, next) {
        try {
            const { major, status } = req.query;
            const result = await studentService.getAllStudents(major, status);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getStudentById(req, res, next) {
        try {
            const student = await studentService.getStudentById(req.params.id);
            res.json(student);
        } catch (error) {
            next(error);
        }
    }

    async createStudent(req, res, next) {
        try {
            const student = await studentService.createStudent(req.body);
            res.status(201).json(student);
        } catch (error) {
            next(error);
        }
    }

    async updateStudent(req, res, next) {
        try {
            const student = await studentService.updateStudent(req.params.id, req.body);
            res.json(student);
        } catch (error) {
            next(error);
        }
    }

    async updateGPA(req, res, next) {
        try {
            const student = await studentService.updateGPA(req.params.id, req.body.gpa);
            res.json(student);
        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req, res, next) {
        try {
            const student = await studentService.updateStatus(req.params.id, req.body.status);
            res.json(student);
        } catch (error) {
            next(error);
        }
    }

    async deleteStudent(req, res, next) {
        try {
            const result = await studentService.deleteStudent(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new StudentController();
