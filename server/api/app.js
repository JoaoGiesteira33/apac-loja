var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var secrets = require('docker-secret').secrets;
var cors = require('cors');
var cookieParser = require('cookie-parser');

// ROUTES:
var userRouter = require('./routes/user');
var productRouter = require('./routes/product');
var orderRouter = require('./routes/order');
var shipmentRouter = require('./routes/shipment');

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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());

// TODO - ALTERAR PARA OS NOMES DEFINIDOS ACIMA
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/shipment', shipmentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.jsonp(err);
});

module.exports = app;
