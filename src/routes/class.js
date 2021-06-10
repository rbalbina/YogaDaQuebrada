
const classController = require('../controller/ClassController')

module.exports = app =>{


// app.get('/class', classController.getAllClasses);
app.get('/class', classController.getAllClasses);

app.get('/class/:id', classController.getClassByID);

app.post('/class/:id', classController.EnrollStudent);

app.post('/timings', classController.testTimins);

// app.get('/class/:id', classController.get);

app.post('/class', classController.createClass);

// app.delete('/class/:id', classController.removeClass);

}
