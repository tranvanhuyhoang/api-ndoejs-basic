import mongoose from 'mongoose';
import Course from '../models/course';


// create new cause
export async function createCourse (req, res) {
    const course = new Course({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      avatarCourse: req.files['avatarCourse'][0].path,
      imageNewWords: req.files['imageNewWords'][0].path,
      imageGrammar: req.files['imageGrammar'][0].path,
      imageHomeWork: req.files['imageHomeWork'][0].path,
    });
    
  // try {
  //   const course = new Course({
  //     _id: mongoose.Types.ObjectId(),
  //     title: req.body.title,
  //     description: req.body.description,
  //   });

  //   // if(res.status(201)){
  //   //   console.log("truezzzz")
  //   // }
  //   // res.status(201).json({
  //   //   success: true,
  //   //   message: 'New cause created successfully',
  //   //   Course: newCourse,
  //   // });
  // } catch (error) {
  //   console.log("error nha ")
  // }
  
  return course
    .save()
    .then((newCourse) => {
      return res.status(201).json({
        success: true,
        message: 'New cause created successfully',
        Course: newCourse,
      });
    })
    .catch((error) => {
        console.log(error);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}

// Get all course
export function getAllCourse( req, res){
  Course.find()
    .select('_id title description avatarCourse imageNewWords imageGrammar imageHomeWork')
    .then((allCourse) => {
      return res.status(200).json({
        success: true,
        message: 'A list of all course',
        Course: allCourse,
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

// get single course
export function getSingleCourse(req, res) {
  const id = req.params.courseId;
  Course.findById(id)
    .then((singleCourse) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleCourse.title}`,
        Course: singleCourse,
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

// update course
export function updateCourse(req, res) {
  const id = req.params.courseId;
  const updateObject = req.body;
  Course.update({ _id:id }, { $set:updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Course is updated',
        updateCourse: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}

// delete a course
export function deleteCourse(req, res) {
  const id = req.params.courseId;
  Course.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
      success: true,
      message: 'Delete success',
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
}
