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
      res.render('all_classes', { allClasses: allClasses, user: req.session.user })
    }
    catch (e) {
      console.log(e)
      res.status(400).send(e)
    }
  },

  getClassByID: async (req, res) => {
    const _id = req.params.classid
    try {
      // const getuser = await UserService.findById(req)
      // console.log(getuser)
      const classData = await ClassService.findById(_id)
      res.render('landing', { classData: classData, user: req.session.user })
      // res.status(201).send(allClasses)
      console.log(classData)
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  },

  getRoomID: async (req, res) => {
    const classId = req.params.classid
    const { id } = req.params
    const user = req.session.user
    const classParams = {
      class_id: req.params.classid,
      student_id: req.params.id
    }
    console.log("CLASSID: " + classId)
    console.log("ID: " + id)
    try {

      if (user.userType == 'Aluno') {
        const getClassData = await EnrollService.EnrolledData(classParams)
        console.log(getClassData)
        const classRoomLink = `${getClassData.class_id}/${getClassData.room_link}`
        console.log(classRoomLink)
        res.render('class', { classId: classId, classlink: classRoomLink, user: req.session.user })
      } else {
        res.render('classTeacher', { classId: classId, user: req.session.user })
      }

      // res.status(201).send(allClasses)
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  },


  newClass: async (req, res) => {
    const weekbody = req.body.week_days
    const time = `${req.body.time}h${req.body.minutos}-${req.body.AMPM}`
    console.log("REQUEST: "+ Array.isArray(weekbody))

    let weekDays
    if (Array.isArray(weekbody)) {
      weekDays = weekbody.reduce((string, diasSemana) => {
        return `${string}, ${diasSemana}`
      })
    }else{
      weekDays = weekbody
    }

    // console.log("STRING: " + weekDays)
    try {

      const classData = {
        week_days: weekDays,
        time: time,
        professor_id: req.params.id,
        category: req.body.category

      }

      const yogaClass = await Class.create(classData)
      

      res.render('newClassMessage', { user: req.session.user })
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }

  },

  newClassIndex: async (req, res) => {

    try {

      res.render('newclass', { user: req.session.user })
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
      res.render('enrollMessage', { user: req.session.user })

    }
    catch (e) {
      res.status(400).send(e)
    }

  },

  Enroll: async (req, res) => {
    const classid = req.params.classid

    try {

      res.render('enroll', { user: req.session.user, classid: classid })

    }
    catch (e) {
      res.status(400).send(e)
    }

  },

  myClasses: async (req, res) => {
    const userid = req.params.id
    console.log(req.params)

    try {


      const user = req.session.user
      console.log("USER DATA" +user.userType)

      if (user.userType == 'Aluno') {

        const myClasses = await EnrollService.findClassByUser(userid)
        console.log("My classes are: " + myClasses)

        if (myClasses.length == 0) {
          res.render('myClassesMessage', { user: req.session.user })
        } else {
          console.log("ENROLLED: " + myClasses)
          // res.send(myClasses)
          res.render('landing', { classData: myClasses, user: req.session.user })

        }
      } else {

        const myClasses = await ClassService.findClassByUserId(userid)

        if (myClasses.length == 0) {
          res.render('myClassesMessageTeacher', { user: req.session.user })
        } else {
          console.log(myClasses)
          // res.send(myClasses)
          res.render('landingTeacher', { classData: myClasses, user: req.session.user })

        }
      }




    }
    catch (e) {
      res.status(400).send(e)
    }

  },


  removeClasses: async (req, res) => {


    try {


      const user = req.session.user
      const { classid } = req.params
      const { id } = req.params



      if (user.userType == 'Aluno') {


        const removeClass = await EnrollService.removeClass(classid)
        res.render('removeClassMessage', { user: id })


      } else {

        const removeClass = await ClassService.removeClass(classid)
        res.render('removeClassMessage', { user: id })

      }



    }
    catch (e) {
      res.status(400).send(e)
    }

  },

}