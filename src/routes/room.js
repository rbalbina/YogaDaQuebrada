const { v4:uuidv4, v4 } = require('uuid')

module.exports = app =>{

    app.get('/room', (req, res) =>{
        const userId = '0021254'
        res.redirect(`/room/${uuidv4()}/${userId}`)
    })

    app.get('/room/:room/:id', (req, res) =>{
        res.render('../views/room', {roomID: req.params.room})
    })

}

