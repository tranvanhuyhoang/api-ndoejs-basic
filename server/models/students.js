import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const courseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  avatar: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
  fee: {
    type: String,
    required: false,
  },
});

export default mongoose.model('Student', courseSchema);