const { v4:uuidv4, v4 } = require('uuid')

module.exports = app =>{

    app.get('/room', (req, res) =>{
        res.redirect(`/room/${uuidv4()}`)
    })

    app.get('/room/:room', (req, res) =>{
        res.render('../views/room', {roomID: req.params.room})
    })

}

