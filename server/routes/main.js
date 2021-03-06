import express from 'express';
import { createCourse, getAllCourse, getSingleCourse, updateCourse, deleteCourse  } from '../controllers/course';
import multer from 'multer';

//api upload/course/new-words
//api upload/course/gramma
//api upload/course/exercises

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}

const upload = multer({
  storage: storage, 
  limit:{
  fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter,
});

const router = express.Router();
const middlewareLogs = function (req, res, next) {
    console.log('logs')
    next()
}
const middlewareUploadImages = [upload.fields([
  {name: 'avatarCourse'}, 
  {name: 'imageNewWords'}, 
  {name: 'imageGrammar'}, 
  {name: 'imageHomeWork'}]), middlewareLogs]
//manage course
router.post(
  '/courses', 
  middlewareUploadImages, 
  createCourse
);
router.get('/courses', getAllCourse);
router.get('/courses/:courseId', getSingleCourse);
router.patch('/courses/:courseId', upload.fields([
  {name: 'avatarCourse'}, 
  {name: 'imageNewWords'}, 
  {name: 'imageGrammar'}, 
  {name: 'imageHomeWork'}]), 
  updateCourse);
router.delete('/courses/:courseId', deleteCourse);

export default router;