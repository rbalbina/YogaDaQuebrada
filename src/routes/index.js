// const express = require('express');
// const router = express.Router();


module.exports = app =>{
/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('../views/index', { title: 'Express' });
});

}
