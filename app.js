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
// import authRouter from './server/routes/auth';
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

var corsOptions = {
  origin: `http://localhost:${process.env.PORT}`
};

app.use(cors(corsOptions));

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

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
  respond.render("abc");
});

app.listen(port, (request, respond) => {
  console.log(`Our server is live on ${port}. Yay!`);
});

// set up route
// app.use('/', verify, checkToken);
app.use('/api/', mainRoutes);
// app.use('/auth', authRouter);
app.use('/user', userRouter);


//upload images
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
});

//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
  const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(files)
});

app.post('/uploadphoto', upload.single('picture'), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString('base64');
  // Define a JSONobject for the image attributes for saving to database

  var finalImg = {
    contentType: req.file.mimetype,
    image:  new Buffer(encode_image, 'base64')
  };

  db.collection('quotes').insertOne(finalImg, (err, result) => {
    console.log(result)

    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/photos', (req, res) => {
  db.collection('mycollection').find().toArray((err, result) => {
  const imgArray= result.map(element => element._id);
  console.log(imgArray);
   
  if (err) return console.log(err)
    res.send(imgArray)
  })
});

app.get('/photo/:id', (req, res) => {
  var filename = req.params.id;
   
  db.collection('mycollection').findOne({'_id': ObjectId(filename) }, (err, result) => {
    if (err) return console.log(err)
    
    res.contentType('image/jpeg');
    res.send(result.image.buffer)
  })
})


