const { Class, User, Category, Enroll } = require('../models')
const { v4: uuidv4, v4 } = require('uuid')

module.exports = app => {

    app.get('/:id/:classid/room', (req, res) => {
        res.redirect(`room/${uuidv4()}`)
    })

    app.get('/:id/:classid/room/:roomid/', async (req, res) => {
        
        const user = req.session.user
        try {
            const { classid } = req.params
            req.session.user.classid = classid
            console.log("Current URL: " + req.path)
            console.log("ClassID: " + classid)
            const regex = /.*(room.+)/gm;
            const str = req.path
            const classRoomId = regex.exec(str)[1]
            const room_link = await Enroll.update({ room_link: classRoomId }, { where: { class_id: classid } })
            console.log(room_link)
            if (room_link) {
                res.render('room', { roomID: req.params.room, user: user })
            } else {
                res.render('linkClassMessage')
            }

        }
        catch (e) {
            console.log(e)
        }

    })

    app.get('/leaveroom', async (req, res) => {
        const user = req.session.user
        try {

            if (user.userType == 'Aluno') {
                res.redirect(`/${user.id}/myclasses`)
            } else {
                const removeRoom_link = await Enroll.update({ room_link: null }, { where: { class_id: user.classid } })
                console.log(removeRoom_link)
                res.redirect(`/${user.id}/myclasses`)
            }

        }
        catch (e) {
            console.log(e)
        }

    })

}

