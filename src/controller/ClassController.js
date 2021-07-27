const { Class, User, Category, Timing, Enroll } = require('../models')
const cookieParser = require('cookie-parser');
const UserService = require('../services/user.services')
const ClassService = require('../services/class.services')
const EnrollService = require('../services/enroll.services')

module.exports = {

  getAllClasses: async (req, res) => {

    try {
      // const getuser = await UserService.findById(req)

      const allClasses = await ClassService.findAll()
      console.log(allClasses)
      // res.status(201).send(allClasses)
      res.render('all_classes', {allClasses:allClasses, user:req.session.user})
    }
    catch (e) {
      res.status(400).send(e)
    }
  },

  getClassByID: async (req, res) => {
    const _id = req.params.classid
    try {
      // const getuser = await UserService.findById(req)
      // console.log(getuser)
      const classData = await ClassService.findById(classid)
      res.render('landing', {classData: classData, user:req.session.user})
      // res.status(201).send(allClasses)
      console.log(classData)
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  },

  getRoomID: async (req, res) => {
    // const _id = req.params.id
    try {
      // const getuser = await UserService.findById(req)
      // console.log(getuser)
      // const allClasses = await ClassService.findById(_id)
      res.render('class',{user:req.session.user})
      // res.status(201).send(allClasses)
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  },

  getAllTimings: async (req, res) => {

    try {
      const allTimings = await ClassService.findAllTiming()
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


  newClass: async (req, res) => {
    const weekbody = req.body.date
    let weekDays
    if(weekbody.length >1){
      weekDays = weekbody[0]
      for(i=1; i<weekbody.length; i++){
        weekDays = `${weekDays}, ${weekbody[i]}`
      }
    }else{
      weekDays = weekbody
    }

    console.log("STRING: " +weekDays)
    try {
  
        const classData = {
          date: weekDays,
          professor_id: req.params.id,
          category_id: req.body.category
    
        }

        const yogaClass = await Class.create(classData)
        const timing = `${req.body.time}h${req.body.minutos}-${req.body.AMPM}`

        const timeOptions = {
          time: timing,
          class_id: yogaClass.id
        }
        // const createTimingsForClass = await Timing.create(timeOptions)

      // const createClass = await Class.create(classData)

      // let arrayTiming = []

      // const timeOptions = timeOptions.map(async time => {
      //   arrayTiming.push({
      //     time: timing,
      //     class_id: createClass.id

      //   })
      // })
      // const createTimingsForClass = await Timing.bulkCreate(arrayTiming)
      // res.status(201).send({body: req.body, params: req.params})
      res.render('newClassMessage', {user: req.session.user})
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }

  },

  newClassIndex: async (req, res) => {

    try {

      res.render('newclass', { user:req.session.user})
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }

  },

  EnrollStudent: async (req, res) => {

    const enrollData = {

      class_id: req.params.classid,
      student_id: req.session.user.id

    }

    try {
      // const getEnrollment = await EnrollService.findAll(enrollData)

      const studentEnrolled = await EnrollService.create(enrollData)
      res.render('enrollMessage', {user:req.session.user})

    }
    catch (e) {
      res.status(400).send(e)
    }

  },

  Enroll: async (req, res) => {
    const classid = req.params.classid

    try {

      res.render('enroll', {user: req.session.user, classid:classid})

    }
    catch (e) {
      res.status(400).send(e)
    }

  },

  myEnrolledClasses: async (req, res) => {
    const userid = req.params.id
    console.log(userid)

    try {
      
      const myClasses = await EnrollService.findClassByUser(userid)

      
      console.log("My classes are: "+myClasses)
      const user = req.session.user
      if(user.userType =='Aluno'){

        if (myClasses.length == 0){
          res.render('myClassesMessage', {user:req.session.user})
        }else{
          console.log("ENROLLED: " + myClasses.length)
          res.send(myClasses)
          // res.render('landing', {classData: myClasses, user:req.session.user})
          
        }
      }else{
        if (myClasses.length == 0){
          res.render('myClassesMessage', {user:req.session.user})
        }else{
          console.log(myClasses)
          res.send(myClasses)
          // res.render('landingTeacher', {classData: myClasses, user:req.session.user})
          
        }
      }
  

      

    }
    catch (e) {
      res.status(400).send(e)
    }

  },

  removeClass: async (req, res, next) => {

    const _id = req.params.id

    try {

      const removeClass = await ClassService.remove(_id)

      res.status(201).send("Class removed")
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  },
}