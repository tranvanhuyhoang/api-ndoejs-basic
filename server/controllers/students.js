import mongoose from 'mongoose';
import Student from '../models/students';


// create new student
export async function addStudent (req, res) {
    const student = new Student({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      phone: req.body.phone,
      course: req.body.course,
      class: req.body.class,
      time: req.body.time,
      fee: req.body.fee,
      avatar: req.files['avatar'][0].path,
    });
      
  return student
    .save()
    .then((newStudent) => {
      return res.status(201).json({
        success: true,
        message: 'Thêm sinh viên thành công',
        Student: newStudent,
      });
    })
    .catch((error) => {
        console.log(error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra, vui lòng thử lại',
        error: error.message,
      });
    });
}

// Get all student
export function getAllStudents( req, res){
  Student.find()
    .select('_id name phone course class time fee avatar')
    .then((allStudents) => {
      return res.status(200).json({
        success: true,
        message: 'success',
        Student: allStudents,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
}

// get single student
export function getSingleStudent(req, res) {
  const id = req.params.studentId;
  Student.findById(id)
    .then((singleStudent) => {
      res.status(200).json({
        success: true,
        message: `success`,
        Student: singleStudent,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This course does not exist',
        error: err.message,
      });
   });
}

// update student
export function updateStudent(req, res) {
  const id = req.params.studentId;
  const updateObject = req.body;
  Student.update({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin thành công',
        updateStudent: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}

// delete a student
export function deleteStudent(req, res) {
  const id = req.params.studentId;
  Student.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(200).json({
      success: true,
      message: 'Xóa thành công',
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
}
