import express from 'express';
import { addStudent, getAllStudents, getSingleStudent, updateStudent, deleteStudent } from '../controllers/students';
import multer from 'multer';

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

//manage student

router.get('/', getAllStudents);
router.get('/:studentId', getSingleStudent);
router.delete('/:studentId', deleteStudent);
router.post(
  '/', 
  upload.fields([{name: 'avatar'}]), 
  addStudent
);
router.patch('/:studentId', upload.fields([{name: 'avatar'}]), updateStudent);


export default router;