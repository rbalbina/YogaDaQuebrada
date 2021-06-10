
const userController = require('../controller/UserController')

module.exports = app =>{


app.post('/users/login', userController.getAllUsers);

app.post('/users/logout', userController.getAllUsers);

app.get('/users', userController.getAllUsers);

app.get('/users/:id', userController.getUserByID);

app.post('/register', userController.createUser);

app.get('/register', userController.register);

app.get('/login', userController.loginindex);

app.post('/login', userController.login);

app.delete('/users/:id', userController.removeUser);

}
