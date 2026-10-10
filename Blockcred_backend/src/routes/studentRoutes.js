
const express = require("express");
const router = express.Router();

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const {
  registerStudent,
  loginStudent,
  updateStudentProfile,
  changeStudentPassword,
} = require("../controllers/studentAuthController");

const protectAdmin = require("../middleware/authMiddleware");
const { protectStudent } = require("../middleware/authMiddleware");

// PUBLIC: Student registration and login
router.post("/register", registerStudent);
router.post("/login", loginStudent);

// STUDENT: Own profile and password
// Keep these before "/:id" routes.
router.put("/profile", protectStudent, updateStudentProfile);
router.put("/change-password", protectStudent, changeStudentPassword);

// ADMIN: Existing student management APIs
router.use(protectAdmin);

router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
