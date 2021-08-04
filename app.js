const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const server = require('http')
const session = require('express-session')
const methodOverride = require('method-override')
const cors = require('cors')
const app = express();
// const ejsLint = require('ejs-lint')
require('dotenv').config()

console.log(process.env.DB_HOST)
// view engine setup
app.use(session({secret:"projetoIntegrador", resave: true, saveUninitialized:true}))
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');
var a = 5
console.log(a++)
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'))
// app.use('/public', express.static('public'));
app.use(express.static('public'));


const indexRouter = require('./src/routes/index')(app);
const usersRouter = require('./src/routes/users')(app);
const categoriesRouter = require('./src/routes/category')(app);
const classRouter = require('./src/routes/class')(app);
const loginRouter = require('./src/routes/login')(app);
const room = require('./src/routes/room')(app)

// io.on('connection', socket =>{
//   socket.on('join-room', () =>{
//     console.log('Joined to the Room')
//   })
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});

module.exports = app;
