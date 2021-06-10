const { Class, User, Category, Timing, Enroll } = require('../models')
const UserController = require('./UserController')

module.exports = {

  getAllClasses: async (req, res) => {

    try {
      const allClasses = await Class.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [{
          model: Category,
          required: true,
          as: 'category',
          attributes: ['name']
        },
        {
          model: User,
          required: true,
          as: 'professor',
          attributes: ['name']
        },
        {
          model: Timing,
          required: true,
          as: 'timings',
          attributes: ['time']
        },
        {
          model: Enroll,
          // required: true,
          as: 'students',
          attributes: ['student_id']
        }
        ],
      })
      res.status(201).send(allClasses)
      console.log(allClasses)
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  },

  getClassByID: async (req, res) => {
    const _id = req.params.id
    try {
      const allClasses = await Class.findByPk(_id, {
        attributes: ["id", "date"],
        include: [{
          model: Category,
          required: true,
          as: 'category',
          attributes: ['name']
        },
        {
          model: User,
          required: true,
          as: 'professor',
          attributes: ['name']
        },
        {
          model: Timing,
          required: true,
          as: 'timings',
          attributes: ['time']
        }
        ],
      })
      res.status(201).send(allClasses)
      console.log(allClasses)
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  },

  getAllTimings: async (req, res) => {

    try {
      const allTimings = await Timing.findAll()
      res.status(201).send(allTimings)
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  },

  testTimins: async (req, res) => {
    let arrayTiming = []
    try {

      const timeOptions = req.body.time
      timeOptions.map(async time => {
        arrayTiming.push({
          time: time,
          class_id: req.body.class_id

        })

      })
      console.log(arrayTiming)
    }
    catch (e) {

      res.status(400).send(e)
      console.log(e)
    }

  },


  createClass: async (req, res) => {

    const classData = {
      date: req.body.date,
      professor_id: req.body.professor_id,
      category_id: req.body.category_id

    }
    try {


      const createClass = await Class.create(classData)
      let arrayTiming = []

      const timeOptions = req.body.time
      timeOptions.map(async time => {
        arrayTiming.push({
          time: time,
          class_id: createClass.id

        })
      })
      const createTimingsForClass = await Timing.bulkCreate(arrayTiming)
      res.status(201).send({ createClass, arrayTiming })
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }

  },

  EnrollStudent: async (req, res) => {

    const enrollData = {

      class_id: req.params.id,
      time_id: req.body.time_id,
      student_id: req.body.student_id

    }

console.log(enrollData)
    try{
      const getEnrollment = await Enroll.findAll({
        where:{
          class_id: enrollData.class_id,
          student_id: enrollData.student_id
        }
      })
      console.log(getEnrollment)
      getEnrollment.map(enroll =>{
        if(enroll.time_id == enrollData.time_id){
          throw new Error()
        }})
      // res.status(201).send(getEnrollment)
      // if(!getEnrollment){
        const studentEnrolled = await Enroll.create(enrollData)
        res.status(201).send(studentEnrolled)
      // }else{

      
      // console.log("Usuario Existe")
      // throw new Error()
      
      // }
      
    }
    catch(e){
      res.status(400).send("You are enrolled for this time: " + req.body.time_id + " already. Please choose another one.")
    }

    // try {

      
      
    //   res.status(201).send(studentEnrolled)
    // }
    // catch (e) {
    //   res.status(400).send(e)
    //   console.log(e)
    // }

  },

  removeClass: async (req, res, next) => {

    const _id = req.params.id

    try {

      const removeClass = await Class.destroy({
        where: {
          id: _id
        }
      })

      res.status(201).send("Class removed")
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  },
}