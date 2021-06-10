
const categoryController = require('../controller/CategoryController')

module.exports = app =>{

app.get('/categories', categoryController.getAllCategories);

app.post('/categories', categoryController.createCategory);

app.delete('/categories/:id', categoryController.removeCategory);

}