const express = require('express')
const {
    getCourse,
    getAllCourses,
    generateCourse,
    learnMore,
    deleteCourse,
} = require('../controllers/course')
const router = express.Router()

router.route('/').get(getAllCourses).post(generateCourse)
router.route('/:id').get(getCourse).patch(learnMore).delete(deleteCourse)

module.exports=router