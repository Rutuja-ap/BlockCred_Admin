  const Student = require("../models/Student");

  // CREATE STUDENT
  const createStudent = async (req, res) => {
    try {
      const {
        studentId,
        name,
        email,
        course,
        department,
        year,
      } = req.body;

      if (
        !studentId ||
        !name ||
        !email ||
        !course ||
        !department ||
        !year
      ) {
        return res.status(400).json({
          message: "All student fields are required",
        });
      }

      const existingStudent = await Student.findOne({
        $or: [
          { studentId: studentId.trim() },
          { email: email.toLowerCase().trim() },
        ],
      });

      if (existingStudent) {
        return res.status(409).json({
          message: "Student ID or email already exists",
        });
      }

      const student = await Student.create({
        studentId: studentId.trim(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        course: course.trim(),
        department: department.trim(),
        year: year.trim(),
        password: await bcrypt.hash((req.body.password || studentId).trim(), 10),
      });

      res.status(201).json({
        message: "Student created successfully",
        student,
      });

    } catch (error) {
      console.error("Create student error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  };


  // GET ALL STUDENTS
  const getAllStudents = async (req, res) => {
    try {
      const students = await Student.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        count: students.length,
        students,
      });

    } catch (error) {
      console.error("Get students error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  };


  // GET STUDENT BY ID
  const getStudentById = async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);

      if (!student) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      res.status(200).json({
        student,
      });

    } catch (error) {
      console.error("Get student error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  };


  // UPDATE STUDENT
  const updateStudent = async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!student) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      res.status(200).json({
        message: "Student updated successfully",
        student,
      });

    } catch (error) {
      console.error("Update student error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  };


  // DELETE STUDENT
  const deleteStudent = async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(
        req.params.id
      );

      if (!student) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      res.status(200).json({
        message: "Student deleted successfully",
      });

    } catch (error) {
      console.error("Delete student error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  };

 

const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id)
      .select("-password");

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, department, year } = req.body;

    const student = await Student.findById(req.student.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    student.name = name || student.name;
    student.department = department || student.department;
    student.year = year || student.year;

    await student.save();

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
require("bcryptjs")





  module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
  };