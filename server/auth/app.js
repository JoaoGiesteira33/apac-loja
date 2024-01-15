var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var axios = require('axios');
var mongoose = require('mongoose');

var secrets = require('docker-secret').secrets;

var passport = require('passport');
const { v4: uuidv4 } = require('uuid');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

// ROUTES:
// ??????

var db_url =
    'mongodb+srv://' +
    secrets.MONGO_USER +
    ':' +
    secrets.MONGO_PASSWORD +
    '@' +
    secrets.MONGO_CLUSTER +
    '.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_url, {
    dbName: secrets.MONGO_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('open', function () {
    console.log(
        'Conexão do Servidor de Autenticação ao MongoDB realizada com sucesso...'
    );
});
db.on('error', function () {
    console.log('Erro de conexão ao MongoDB...');
});

var authRouter = require('./routes/auth');

var app = express();

app.use(
    session({
        genid: (req) => {
            return uuidv4();
        },
        secret: secrets.AUTH_KEY,
        resave: false,
        saveUninitialized: true,
    })
);

// Configuração do passport
var Login = require('./models/login');
passport.use(new LocalStrategy(Login.authenticate()));
passport.serializeUser(function (l, done) {
    done(null, l.username);
});
passport.deserializeUser(async function (mail, done) {
    try {
        const l = await Login.findOne({ username: mail });
        done(null, l);
    } catch (err) {
        done(err, null);
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(cookieParser());

app.use('/', authRouter);

// catch 404 and forward to error handler
app.use('*', function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.jsonp({ error: err.message });

    console.log('Aconteceu um erro: ' + err);
});

module.exports = app;
