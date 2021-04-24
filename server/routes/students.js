import express from 'express';
import {   } from '../controllers/students';
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
router.post(
  '/student', 
  upload.fields([
    {name: 'avatarCourse'}, 
    {name: 'imageNewWords'}, 
    {name: 'imageGrammar'}, 
    {name: 'imageHomeWork'}]), 
  createCourse
);


export default router;