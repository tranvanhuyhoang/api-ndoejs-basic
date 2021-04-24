import mongoose from 'mongoose';
import Students from '../models/students';


// create new student
export async function addStudent (req, res) {
    const student = new Students({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      avatarCourse: req.files['avatarCourse'][0].path,
      imageNewWords: req.files['imageNewWords'][0].path,
      imageGrammar: req.files['imageGrammar'][0].path,
      imageHomeWork: req.files['imageHomeWork'][0].path,
    });
      
  return student
    .save()
    .then((newCourse) => {
      return res.status(201).json({
        success: true,
        message: 'Thêm sinh viên thành công',
        Course: newCourse,
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
// export function getAllCourse( req, res){
//   Course.find()
//     .select('_id title description avatarCourse imageNewWords imageGrammar imageHomeWork')
//     .then((allCourse) => {
//       return res.status(200).json({
//         success: true,
//         message: 'A list of all course',
//         Course: allCourse,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: 'Server error. Please try again.',
//         error: err.message,
//       });
//     });
// }

// get single student
// export function getSingleCourse(req, res) {
//   const id = req.params.courseId;
//   Course.findById(id)
//     .then((singleCourse) => {
//       res.status(200).json({
//         success: true,
//         message: `More on ${singleCourse.title}`,
//         Course: singleCourse,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: 'This course does not exist',
//         error: err.message,
//       });
//    });
// }

// update student
// export function updateCourse(req, res) {
//   const id = req.params.courseId;
//   const updateObject = req.body;
//   Course.update({ _id:id }, { $set:updateObject })
//     .exec()
//     .then(() => {
//       res.status(200).json({
//         success: true,
//         message: 'Course is updated',
//         updateCourse: updateObject,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: 'Server error. Please try again.'
//       });
//     });
// }

// delete a student
// export function deleteCourse(req, res) {
//   const id = req.params.courseId;
//   Course.findByIdAndRemove(id)
//     .exec()
//     .then(()=> res.status(204).json({
//       success: true,
//       message: 'Delete success',
//     }))
//     .catch((err) => res.status(500).json({
//       success: false,
//     }));
// }
