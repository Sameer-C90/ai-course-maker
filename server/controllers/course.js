const Course = require('../models/Course')
const { GoogleGenAI } = require("@google/genai")
const prompt = require('../prompts/generate.json').content
const more = require('../prompts/learnmore.json').content

const genAI = new GoogleGenAI({apiKey:process.env.API_KEY})

const generateCourse = async (req,res) => {
    req.body.createdBy = req.user.userId
    const response = await genAI.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt+req.body.prompt,
        config: {
            responseMimeType: "application/json"
        }
    })

    const data = JSON.parse(response.text)
    const result = await Course.create({...req.body, ...data})
    console.log(result)
    res.status(201).json({result})
}

const learnMore = async (req,res)=>{
    const {
        user: { userId },
        params: { id: courseId },
    } = req
    const course = await Course.findOne({
        _id: courseId,
        createdBy: userId,
    })
    const prev_data = {
        name:course.name,
        key_prompt:course.prompt,
        description:course.description,
        modules:course.modules,
    }
    const response = await genAI.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: more+JSON.stringify(prev_data),
        config: {
            responseMimeType: "application/json"
        }
    })
    const data = JSON.parse(response.text)
    const result = await Course.findOneAndUpdate(
        { _id: courseId, createdBy: userId },
        {
            $push: {
            modules: {
                $each: data.modules
            }
            }
        },
        { new: true, runValidators: true }
    )
    res.status(200).json({result})
}

const getCourse = async (req,res)=>{
    const {
        user: { userId },
        params: { id: courseId },
    } = req

    const course = await Course.findOne({
        _id: courseId,
        createdBy: userId,
    })
    if (!course) {
        throw new Error(`No course with id ${courseId}`)
    }
    res.status(200).json({ course })
}

const getAllCourses = async (req,res)=>{
    const courses = await Course.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(200).json({ courses, count: courses.length })
}

const deleteCourse = async (req,res)=>{
    const {
        user: { userId },
        params: { id: courseId },
    } = req

    const course = await Course.findByIdAndDelete({
        _id: courseId,
        createdBy: userId,
    })
    if (!course) {
        throw new Error(`No course with id ${courseId}`)
    }
    res.status(200).send()
}

module.exports = {
    generateCourse,
    learnMore,
    getCourse,
    getAllCourses,
    deleteCourse,
}