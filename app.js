const compression = require("compression");
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const helmet = require("helmet");
const logger = require('morgan');
const mongoose = require("mongoose");
const path = require('path');

const indexRouter = require('./routes/index');
const catalogRouter = require('./routes/catalog');

const dev_uri = require("./public/javascripts/connection")
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || dev_uri;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'", "'res.cloudinary.com'"],
      "script-src-attr": ["'self'", "'unsafe-inline'", "'show-menu'", "'close-menu'", "'submitLoader'"],
      "img-src": ["'self'", "*.cloudinary.com"]
    },
  }),
);
app.use(logger('dev'));

app.use('/', indexRouter);
app.use('/catalog', catalogRouter);

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
