
const classController = require('../controller/ClassController')

module.exports = app =>{

app.get('/:id/classes', classController.getAllClasses);

app.get('/:id/myclasses', classController.myClasses);

app.delete('/:id/:classid/remove', classController.removeClasses);

app.get('/:id/:classid', classController.getRoomID);

app.get('/:id/:classid/enroll', classController.Enroll);

app.post('/:id/:classid/enroll', classController.EnrollStudent);

app.get('/:id/classes/newclass', classController.newClassIndex);

app.post('/:id/classes/newclass', classController.newClass);


}
