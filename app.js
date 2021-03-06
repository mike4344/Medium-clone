const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sessionSecret } = require('./config')
const {restoreUser } = require('./auth')


const indexRouter = require('./routes/index');
const signUpRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const storyRouter = require('./routes/stories')
const userRouter = require('./routes/users');
const storyLikeRouter = require('./routes/storylikes');
const commentsRouter = require('./routes/comments');
const commentLikeRouter = require('./routes/commentLikes');

const app = express();

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: sessionSecret,
    store,
    saveUninitialized: true,
    resave: false,
  })
  );
  app.use(restoreUser);

  // create Session table if it doesn't already exist
store.sync();

app.use('/static', express.static(path.join()))

app.use(indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/stories', storyRouter);
app.use('/users', userRouter);
app.use(storyLikeRouter);
app.use(commentsRouter);
app.use(commentLikeRouter);

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
  res.render('error');
});

module.exports = app;
