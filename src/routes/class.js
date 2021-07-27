
const classController = require('../controller/ClassController')

module.exports = app =>{

app.get('/:id/classes', classController.getAllClasses);

app.get('/:id/myclasses', classController.myEnrolledClasses);

app.get('/:id/:classid', classController.getRoomID);

app.get('/:id/:classid/enroll', classController.Enroll);

app.post('/:id/:classid/enroll', classController.EnrollStudent);

app.post('/timings', classController.testTimins);

app.get('/:id/classes/newclass', classController.newClassIndex);

app.post('/:id/classes/newclass', classController.newClass);

app.get('/:id/:classid/room', (req, res) =>{
    const userId = '0021254'
    res.redirect(`/room/${uuidv4()}`)
})

app.get('/:id/:classid/room/:id', (req, res) =>{
    res.render('../views/room', {roomID: req.params.room})
})


}
