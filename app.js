const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken')  //jwt
const cors = require('cors')
const authorization = require("./middleware/authorization.js")
const bodyParser = require("body-parser");

//后台路由
const homeRouter = require('./routes/backstage/home.js');
const loginRouter = require('./routes/backstage/login.js');

//前台路由
const navItemRouter = require('./routes/foreground/navItems.js');
const newsItemRouter = require('./routes/foreground/newsItems.js')

const app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/images_temp',express.static(path.join(__dirname, 'images_temp')));

//跨域处理要在路由之前
const whiteList = ["http://localhost:8080","http://192.168.28.181:8080","http://192.168.0.108:8080","http://192.168.3.224:8080"];
const corsOptions = {
	origin:function(origin , callback){
		console.log(origin,'o');
		if(whiteList.indexOf(origin)!= -1){
			callback(null,true)
		}else{
			callback(new Error('禁止访问,跨域问题'))
		}
	}
}

app.use(cors(corsOptions));

//前台url
app.use('/navItem', navItemRouter);
app.use('/newsItem', newsItemRouter);



app.use('/home', homeRouter);
//权限验证
app.use(authorization());

//后台url
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
