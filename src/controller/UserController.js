const bcrypt = require('bcryptjs')
const transport = require('../mail/mail.js')
const emailMassages = require('../mail/messages.js')
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
            res.render('../views/profile', {user:getuser})
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
              res.redirect(`/users/${getuser.id}`)
              // res.status(201).send(getuser)
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