
const transport = require('../mail/mail.js')
const emailMassages = require('../mail/messages.js')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const UserService = require('../services/user.services');
const { username } = require('../config/database.js');
const bcrypt = require('bcryptjs')

module.exports = {

  getAllUsers: async (req, res, next) => {

    try {
      const { count: total, rows: users } = await UserService.findAll(req)
      let totalPages = Math.round(total / 6)
      if (!totalPages - 1 >= 0.5) {
        totalPages++
      }
      console.log("Number of users: " + total)
      console.log("Total pages: " + totalPages)
      // res.status(201).json(users)
      res.status(201).send(users)
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  },

  getUserByID: async (req, res, next) => {

    try {
      const getuser = await UserService.findById(req)
      res.status(200).send(getuser)
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }
  },

  createUser: async (req, res) => {
    const newUserData = { ...req.body }

    try {
      const saveUser = await UserService.create(newUserData)
      const message = await transport.sendMail(emailMassages.newUser(req.body.name, req.body.email));
      res.render('loginMessage', {user: saveUser})
      // res.status(201).send(saveUser)
    }
    catch (e) {
      res.status(400).send(e)
      console.log(e)
    }

  },

  removeUser: async (req, res, next) => {

    const _id = req.params.id
    try {

      const removeUser = await UserService.remove(_id)

      res.status(201).send("User removed" + removeUser)
    }
    catch (e) {
      res.status(400).send(e)
    }
  },

  login: async (req, res, next) => {

    const userData = {...req.body}
    console.log(userData)

    try {
      const user = await UserService.login(userData)
      console.log(user)
      const token = await jwt.sign({ id: user.id, role: user.userType }, 'secret', { expiresIn: '7 days' })
      req.session.user = user
      res.redirect(`/${user.id}/myclasses`)

    }
    catch (e) {

      res.render('loginErrorMessage', {error:e.message})

      console.log(e)
    }
  },

  loginindex: async (req, res, next) => {

    res.render('../views/login')
  },

  register: async (req, res, next) => {

    res.render('../views/register')
  }
}