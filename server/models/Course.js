const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name: {
      type: String,
      required:true,
      maxlength: 100,
    },
    prompt: {
      type: String,
      required: [true, 'Please provide course prompt'],
    },
    description: String,
    modules: [
      {
        title: {
        type: String,
        required: true
        },
      content: {
          type: String,
          required: true
        }
      }
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Course', CourseSchema)
