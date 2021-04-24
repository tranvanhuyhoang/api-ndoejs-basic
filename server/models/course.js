import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  avatarCourse: {
    type: String,
    required: true,
  },
  imageNewWords: {
    type: String,
    required: false,
  },
  imageGrammar: {
    type: String,
    required: false,
  },
  imageHomeWork: {
    type: String,
    required: false,
  },
});

export default mongoose.model('Course', courseSchema);