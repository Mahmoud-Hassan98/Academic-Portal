const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    teacherId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true 
    }
}, { timestamps: true });

const Course = mongoose.model('Courses', userSchema);
module.exports = Course;