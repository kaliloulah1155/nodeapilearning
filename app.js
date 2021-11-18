const express = require('express');
const morgan = require('morgan');
const AppError=require('./utils/appError');
const globalErrorHandler=require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const app = express();

//Set security HTTP Headers : place at the top of middleware 
app.use(helmet());
// 1) GLOBAL MIDDLEWARES
//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same API
const limiter=rateLimit({
  max:100,
  windowMs:60*60*1000,
  message:'Too many requests from this IP, please try again in an hour!'
});

app.use('/api',limiter); //permit to limit api request in the application

//Body parser, reading data from body into req.body
app.use(express.json({limit:'10kb'}));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Serving static files
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });
//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


//never call at the top of the route everyday on the bottom
app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this servers 🤓 !`,404));
});

app.use(globalErrorHandler);

module.exports = app;