const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const publicStudent = (s) => ({
  id: s._id,
  studentId: s.studentId,
  name: s.name,
  email: s.email,
  phone: s.phone || "",
  department: s.department,
  institution: s.institution || "",
  course: s.course,
  year: s.year,
  role: "student",
});

// POST /api/students/register
// The university admin has already added the student (studentId + email).
// Registration lets that student set a password and claim the record.


const registerStudent = async (req, res) => {
  try {
    const { name, studentId, email, password, phone, institution, department, course, year } = req.body;

    if (!name || !studentId || !email || !password) {
      return res.status(400).json({
        message: "Name, Student ID, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedStudentId = String(studentId).trim();

    const existing = await Student.findOne({
      $or: [
        { email: normalizedEmail },
        { studentId: normalizedStudentId },
      ],
    });

    if (existing) {
      return res.status(409).json({
        message: "Email or Student ID already exists. Please log in or use different details.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

const student = await Student.create({
  name: String(name).trim(),
  studentId: normalizedStudentId,
  email: normalizedEmail,
  password: hashedPassword,
  phone: phone ? String(phone).trim() : "",
  institution: institution ? String(institution).trim() : "",
  department: department || "",
  course: String(course || "").trim(),
  year: String(year || "").trim(),
});

    return res.status(201).json({
      message: "Student account created successfully.",
      student: publicStudent(student),
    });
  } 
catch (error) {
  console.error("Student register error:", error);

  if (error.code === 11000) {
    return res.status(409).json({
      message: "Email or Student ID already exists.",
    });
  }

  return res.status(500).json({
    message: error.message || "Unable to create student account.",
  });
}

};


// POST /api/students/login
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const student = await Student.findOne({
      email: String(email).toLowerCase().trim(),
    }).select("+password");

    if (!student || !student.password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const ok = await bcrypt.compare(password, student.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: student._id, email: student.email, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      student: publicStudent(student),
    });
  } catch (error) {
    console.error("Student login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/students/profile   (student token)
// studentId is NOT changeable: certificates are linked to it.
const updateStudentProfile = async (req, res) => {
  try {
    const { name, phone, department, institution } = req.body;

    const student = await Student.findById(req.student.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    if (name && name.trim()) student.name = name.trim();
    if (phone !== undefined) student.phone = String(phone).trim();
    if (department && department.trim()) student.department = department.trim();
    if (institution !== undefined) student.institution = String(institution).trim();

    await student.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      student: publicStudent(student),
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/students/change-password   (student token)
const changeStudentPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters.",
      });
    }

    const student = await Student.findById(req.student.id).select("+password");
    if (!student || !student.password) {
      return res.status(404).json({ message: "Student not found." });
    }

    const ok = await bcrypt.compare(currentPassword, student.password);
    if (!ok) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    student.password = await bcrypt.hash(newPassword, 10);
    await student.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  updateStudentProfile,
  changeStudentPassword,
};