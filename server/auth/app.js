var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

const { v4: uuidv4 } = require('uuid')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var mongoose = require('mongoose')

var db_url = "mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@"+process.env.MONGO_CLUSTER+".mongodb.net/?retryWrites=true&w=majority";
console.log(db_url)
mongoose.connect(db_url, {dbName: process.env.MONGO_DB_NAME , useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('open', function(){console.log("Conexão do Servidor de Autenticação ao MongoDB realizada com sucesso...")});
db.on('error', function(){console.log("Erro de conexão ao MongoDB...")});


//var usersRouter = require('./routes/users');

var app = express();

app.use(session({
  genid: req => {
    return uuidv4()},
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

// Configuração do passport
//var User = require('./models/user')
//passport.use(new LocalStrategy(User.authenticate()))
//passport.serializeUser(User.serializeUser())
//passport.deserializeUser(User.deserializeUser())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(passport.initialize());
//app.use(passport.session());

//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use('*', function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.jsonp({error: err.message});
});

module.exports = app;
