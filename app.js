require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const conectDB = require('./config/db');
const app = express();

//RUTAS
app
.use("/" , require('./routes/index.routes'))
.use('/api/auth',require('./routes/auth.routes')) 
.use('/api/users',require('./routes/users.routes')) 
.use('/api/projects',require('./routes/project.routes')) 
.use('/api/task',require('./routes/task.routes'))


conectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    ok : false ,
    msg : err.message
  });
 
});



module.exports = app;
