var createError =   require('http-errors');
var express =       require('express');
var cors =          require('cors');
var path =          require('path');
var cookieParser =  require('cookie-parser');
var logger =        require('morgan');

var indexRouter =         require('./routes/index');
var materiasRouter =      require('./routes/materias');
var proposicoesRouter =   require('./routes/proposicoes');
var parlamentaresRouter = require('./routes/parlamentares');
var temasRouter =         require('./routes/temas');
var tramitacaoRouter =    require('./routes/tramitacao');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',              indexRouter);
app.use('/materias',      materiasRouter);
app.use('/proposicoes',   proposicoesRouter);
app.use('/parlamentares', parlamentaresRouter);
app.use('/temas',         temasRouter);
app.use('/tramitacao',    tramitacaoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message =  err.message;
  res.locals.error =    req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;