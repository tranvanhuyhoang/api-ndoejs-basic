// import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import mainRoutes from './server/routes/main.js';
import studentRouter from './server/routes/students';
import userRouter from './server/routes/users';
import {verify} from './server/auth/checkToken';
import { checkToken } from './server/controllers/users';

dotenv.config();

// set up dependencies
const app = express();
const __dirname = path.resolve();

//read file from static url
// app.use(express.static("public"));
app.use('/uploads', express.static("uploads"));

app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

var corsOptions = {
  origin: `http://localhost:${process.env.PORT}`
};

app.use(cors(corsOptions));

var uploadMulter = multer();
// app.use(uploadMulter.array()); 

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage });
// app.use(upload.array()); // for parsing multipart/form-data

// set up mongoose
try {
  await mongoose.connect(`mongodb://${process.env.DB_URL}`, { useNewUrlParser: true });
  console.log('Database connected');
} catch (error) {
  handleError(error);
  console.log('Error connecting to database');
}

// set up port number
const port = process.env.PORT;

// set up home route
app.get('/', (request, respond) => {
  // respond.status(200).json({
  //   message: 'Welcome to Project Support',
  // });
  respond.render("pages/dashboard");
});

app.listen(port, (request, respond) => {
  console.log(`Our server is live on ${port}. Yay!`);
});

// set up route
// app.use('/', verify, checkToken);
app.use('/api/', mainRoutes);
app.use('/student', studentRouter);
app.use('/user', userRouter);


