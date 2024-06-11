// backend/controllers/courseController.js
const Course = require('../models/course-schema');

const createCourse = async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).send('Access Denied');
    const { name, description, start, end } = req.body;
    if (!name || !description || !start || !end) {
        return res.status(400).send('All fields are required');
    }
    const course = new Course({ ...req.body, teacherId: req.user.user_id });
    try {
        await course.save();
        res.status(201).send(course);
    } catch (err) {
        res.status(400).send('Error creating course');
    }
};


  const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(400).send('Error fetching courses');
    }
};
const getCoursesByTeacher = async (req, res) => {
    try {
        const courses = await Course.find({ teacherId: req.user.user_id });
        res.json(courses);
    } catch (err) {
        res.status(400).send('Error fetching courses');
    }
};
const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(deletedCourse);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
const updateCourse = async (req, res) => {
    const courseId = req.params.id;
    const { name, description, start, end } = req.body;
    try {
      if (!name || !description || !start || !end) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      course.name = name;
      course.description = description;
      course.start = start;
      course.end = end;
      const updatedCourse = await course.save();
      res.status(200).json(updatedCourse);
    } catch (err) {
      console.error('Error updating course:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports =  {
    createCourse ,
    getCourses , 
    getCoursesByTeacher ,
    deleteCourse ,
    updateCourse
}
