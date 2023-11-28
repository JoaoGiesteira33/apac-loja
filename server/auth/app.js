var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose')
var secrets = require('docker-secret').secrets;

// ROUTES:
// ??????

var db_url = "mongodb+srv://"+secrets.mongo_user+":"+secrets.mongo_password+"@"+secrets.mongo_cluster+".mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_url, {dbName: secrets.mongo_db_name , useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('open', function(){console.log("Conexão do Servidor de Autenticação ao MongoDB realizada com sucesso...")});
db.on('error', function(){console.log("Erro de conexão ao MongoDB...")});


//var usersRouter = require('./routes/users');

var app = express();


// Configuração do passport
//var User = require('./models/user')
//passport.use(new LocalStrategy(User.authenticate()))
//passport.serializeUser(User.serializeUser())
//passport.deserializeUser(User.deserializeUser())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/user', usersRouter);

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
