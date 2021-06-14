const bcrypt = require('bcryptjs')
const transport = require('../mail/mail.js')
const emailMassages = require('../mail/messages.js')
const jwt = require('jsonwebtoken')
const {User} = require('../models')

module.exports = {

    getAllUsers: async (req, res, next) => {

        try{
          const allUsers = await User.findAll()
          res.status(201).send(allUsers)
      }
      catch (e){
          res.status(400).send(e)
          console.log(e)
      } 
      },

    getUserByID: async (req, res, next) => {
        const _id = req.params.id
          try{
            const getuser = await User.findByPk(_id)
            // const token = await user.generateAuthToken()
            //const message = await transport.sendMail(emailMassages.newUser(req.body.name, req.body.email));
            // res.render('../views/profile', {user:getuser})
            res.status(200).send({getuser, header:req.headers.authorization})
        }
        catch (e){
            res.status(400).send(e)
            console.log(e)
        } 
        },
    
    createUser: async (req, res) => {

        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUserData = {...req.body}
        newUserData.password = hash
        
        
        try{
            const saveUser = await User.create(newUserData)
            const message = await transport.sendMail(emailMassages.newUser(req.body.name, req.body.email));
            res.redirect('/login')
            // res.status(201).send(saveUser)
        }
        catch (e){
            res.status(400).send(e)
            console.log(e)
        }   
      
      },

      removeUser: async (req, res, next) => {

        const _id = req.params.id
          try{

            const removeUser = await User.destroy({
                where: {
                  id: _id
                }
              })

            res.status(201).send("User removed")
        }
        catch (e){
            res.status(400).send(e)
            console.log(e)
        } 
        },

        login: async (req, res, next) => {
          
            try{
              const getuser = await User.findOne({where: { email: req.body.email}})
              if(Object.keys(getuser).length === 0){
                throw new Error("User not Registered")
              }
              console.log(getuser)
              const token = await jwt.sign({id: getuser.id, role: getuser.userType}, 'secret')
              console.log(token)
              req.headers['Authorization'] = "Bearer " + token
              req.user = {id: getuser.id, name: getuser.name, userType: getuser.userType}
              // res.redirect(`/users/${getuser.id}`)
              document.cookie = token
              res.status(201).json({getuser, token, headers: req.headers, request: req.user})
              
          }
          catch (e){
              res.status(400).send(e)
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