const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses-controller');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.get('/get-courses',coursesController.getCourses);
router.get('/get-teacher-courses',coursesController.getCoursesByTeacher);
router.delete('/delete-course/:id',coursesController.deleteCourse);
router.post('/create-course', coursesController.createCourse);
router.put('/update-course/:id', coursesController.updateCourse);
module.exports = router;
