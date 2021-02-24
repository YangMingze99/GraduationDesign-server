const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken')  //jwt
const cors = require('cors')
const authorization = require("./middleware/authorization.js")


//后台路由
const homeRouter = require('./routes/home.js');
const loginRouter = require('./routes/login.js');

//前台路由
const navItemRouter = require('./routes/foreground/navItems.js');
const newsItemRouter = require('./routes/foreground/newsItems.js')

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//跨域处理要在路由之前
const whiteList = ["http://localhost:8080","http://192.168.31.98:8080","http://192.168.3.3:8080"];
const corsOptions = {
	origin:function(origin , callback){
		// console.log(origin,'o');
		if(whiteList.indexOf(origin)!= -1){
			callback(null,true)
		}else{
			callback(new Error('禁止访问'))
		}
	}
}
app.use(cors(corsOptions));
//前台url
app.use('/navItem', navItemRouter);
app.use('/newsItem', newsItemRouter);

app.use(authorization());

//后台url
app.use('/home', homeRouter);
app.use('/login', loginRouter);






// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
// //   res.render('error');
// });

module.exports = app;
