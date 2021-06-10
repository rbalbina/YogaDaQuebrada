const {Category} = require('../models')

module.exports = {

    getAllCategories: async (req, res, next) => {

      try{
          const allCategories = await Category.findAll()
          res.status(201).send(allCategories)
      }
      catch (e){
          res.status(400).send(e)
          console.log(e)
      } 
      },

   
    createCategory: async (req, res) => {

        const newCategoryData = {...req.body}
               
        
        try{
            const saveCategory = await Category.create(newCategoryData)
            res.status(201).send(saveCategory)
        }
        catch (e){
            res.status(400).send(e)
            console.log(e)
        }   
      
      },

      removeCategory: async (req, res, next) => {

        const _id = req.params.id

        try{

            const removeCategory = await Category.destroy({
                where: {
                  id: _id
                }
              })

            res.status(201).send("Category removed")
        }
        catch (e){
            res.status(400).send(e)
            console.log(e)
        } 
        },
}