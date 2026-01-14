// public/js/app.js
// Main Application Logic for Student Management System

// =======================
// GLOBAL STATE
// =======================
let currentStatusFilter = null; // null = all
let currentMajorFilter = null;
let studentsCache = [];

// =======================
// DOM ELEMENTS
// =======================
const studentListEl = document.getElementById('student-list');
const loadingEl = document.getElementById('loading');

// Statistics
const statActiveEl = document.getElementById('stat-active');
const statGraduatedEl = document.getElementById('stat-graduated');
const statSuspendedEl = document.getElementById('stat-suspended');
const statTotalEl = document.getElementById('stat-total');
const statGPAEl = document.getElementById('stat-gpa');

// Modals
const studentModal = document.getElementById('student-modal');
const gpaModal = document.getElementById('gpa-modal');
const statusModal = document.getElementById('status-modal');

// Forms
const studentForm = document.getElementById('student-form');
const gpaForm = document.getElementById('gpa-form');
const statusForm = document.getElementById('status-form');

// =======================
// INITIAL LOAD
// =======================
document.addEventListener('DOMContentLoaded', () => {
    bindUIEvents();
    loadStudents();
});

// =======================
// UI EVENT BINDING
// =======================
function bindUIEvents() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const status = btn.dataset.filter;
            currentStatusFilter = status === 'all' ? null : status;
            loadStudents();
        });
    });

    // Add button
    document.getElementById('add-btn')?.addEventListener('click', showAddModal);

    // Close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    document.getElementById('cancel-btn')?.addEventListener('click', closeAllModals);
    document.getElementById('gpa-cancel')?.addEventListener('click', closeAllModals);
    document.getElementById('status-cancel')?.addEventListener('click', closeAllModals);

    // Forms
    studentForm?.addEventListener('submit', handleStudentSubmit);
    gpaForm?.addEventListener('submit', handleGPASubmit);
    statusForm?.addEventListener('submit', handleStatusSubmit);
}

// =======================
// LOAD STUDENTS
// =======================
async function loadStudents() {
    try {
        showLoading(true);

        const data = await api.getAllStudents(
            currentMajorFilter,
            currentStatusFilter
        );

        studentsCache = data.students;
        renderStudents(studentsCache);
        updateStatistics(data.statistics);

    } catch (error) {
        alert('Error loading students: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// =======================
// RENDER UI
// =======================
function renderStudents(students) {
    if (!students || students.length === 0) {
        studentListEl.innerHTML = `<div class="no-students">🎓 No students found</div>`;
        return;
    }

    studentListEl.innerHTML = students.map(student => `
        <div class="student-card">
            <div class="student-header">
                <div>
                    <h3>${escapeHtml(student.first_name)} ${escapeHtml(student.last_name)}</h3>
                    <span class="student-code">🆔 ${student.student_code}</span>
                </div>
                <span class="status-badge status-${student.status}">
                    ${student.status.toUpperCase()}
                </span>
            </div>

            <div class="student-details">
                <div class="detail-row">
                    <span class="detail-label">📧 Email:</span>
                    <span class="detail-value">${escapeHtml(student.email)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📚 Major:</span>
                    <span class="detail-value">${student.major}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📊 GPA:</span>
                    <span class="gpa-badge ${getGPAClass(student.gpa)}">
                        ${student.gpa.toFixed(2)}
                    </span>
                </div>
            </div>

            <div class="actions">
                <button class="btn btn-info" onclick="openGPAModal(${student.id}, ${student.gpa})">
                    GPA
                </button>
                <button class="btn btn-warning" onclick="openStatusModal(${student.id}, '${student.status}')">
                    Status
                </button>
                <button class="btn btn-secondary" onclick="editStudent(${student.id})">
                    Edit
                </button>
                <button class="btn btn-danger" onclick="deleteStudent(${student.id}, '${student.status}')">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

// =======================
// STATISTICS
// =======================
function updateStatistics(stats) {
    statActiveEl.textContent = stats.active;
    statGraduatedEl.textContent = stats.graduated;
    statSuspendedEl.textContent = stats.suspended;
    statTotalEl.textContent = stats.total;
    statGPAEl.textContent = stats.averageGPA.toFixed(2);
}

// =======================
// MODALS
// =======================
function showAddModal() {
    studentForm.reset();
    document.getElementById('student-id').value = '';
    document.getElementById('modal-title').textContent = 'Add New Student';
    studentModal.style.display = 'flex';
}

function editStudent(id) {
    const student = studentsCache.find(s => s.id === id);
    if (!student) return;

    document.getElementById('modal-title').textContent = 'Edit Student';
    document.getElementById('student-id').value = student.id;
    document.getElementById('student_code').value = student.student_code;
    document.getElementById('first_name').value = student.first_name;
    document.getElementById('last_name').value = student.last_name;
    document.getElementById('email').value = student.email;
    document.getElementById('major').value = student.major;

    studentModal.style.display = 'flex';
}

function openGPAModal(id, gpa) {
    document.getElementById('gpa-student-id').value = id;
    document.getElementById('gpa').value = gpa.toFixed(2);
    gpaModal.style.display = 'flex';
}

function openStatusModal(id, status) {
    document.getElementById('status-student-id').value = id;
    document.getElementById('status').value = status;
    statusModal.style.display = 'flex';
}

function closeAllModals() {
    studentModal.style.display = 'none';
    gpaModal.style.display = 'none';
    statusModal.style.display = 'none';
}

// =======================
// FORM HANDLERS
// =======================
async function handleStudentSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('student-id').value;
    const payload = {
        student_code: document.getElementById('student_code').value,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        major: document.getElementById('major').value
    };

    try {
        if (id) {
            await api.updateStudent(id, payload);
            alert('Student updated successfully');
        } else {
            await api.createStudent(payload);
            alert('Student created successfully');
        }

        closeAllModals();
        loadStudents();

    } catch (error) {
        alert(error.message);
    }
}

async function handleGPASubmit(e) {
    e.preventDefault();

    const id = document.getElementById('gpa-student-id').value;
    const gpa = parseFloat(document.getElementById('gpa').value);

    try {
        await api.updateGPA(id, gpa);
        alert('GPA updated');
        closeAllModals();
        loadStudents();
    } catch (error) {
        alert(error.message);
    }
}

async function handleStatusSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('status-student-id').value;
    const status = document.getElementById('status').value;

    try {
        await api.updateStatus(id, status);
        alert('Status updated');
        closeAllModals();
        loadStudents();
    } catch (error) {
        alert(error.message);
    }
}

// =======================
// DELETE
// =======================
async function deleteStudent(id, status) {
    if (status === 'active') {
        alert('Cannot delete active student');
        return;
    }

    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
        await api.deleteStudent(id);
        alert('Student deleted');
        loadStudents();
    } catch (error) {
        alert(error.message);
    }
}

// =======================
// HELPERS
// =======================
function showLoading(show) {
    loadingEl.style.display = show ? 'block' : 'none';
    studentListEl.style.display = show ? 'none' : 'grid';
}

function getGPAClass(gpa) {
    if (gpa >= 3.5) return 'gpa-excellent';
    if (gpa >= 3.0) return 'gpa-good';
    if (gpa >= 2.0) return 'gpa-fair';
    return 'gpa-poor';
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}
