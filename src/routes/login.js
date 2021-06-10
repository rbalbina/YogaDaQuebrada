const userController = require('../controller/UserController')

module.exports = app =>{

app.post('/form', (req, res) =>{
    res.redirect('/form/join')
    console.log(req.body)
});

app.get('/form', (req, res) =>{
    res.render('../views/form')
    console.log(req.body)
});

app.get('/form/join', (req, res) =>{
    const {name} = req.body
    console.log(req.body)
    req.query.name === name
    res.send('name:' + req.query.name)
})

// app.post('/login', categoryController.createCategory);

// app.delete('/logout', categoryController.removeCategory);

}