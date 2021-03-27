const express = require('express');
const jwt = require('jsonwebtoken');
const md5tool = require("../../tools/md5.js");
const randomtool = require("../../tools/random_number.js");
const usersModel = require('../../model/usersModel.js');
const multer = require("multer");
const path = require("path");
var fs=require("fs"); 
const router = express.Router();


const storage_temp = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images_temp/');
    },
    filename: function (req, file, cb) {
        let extName = path.extname(file.originalname);  //获取后缀名
        let baseName = path.parse(file.originalname).name;  //获取文件名
        let random = randomtool.getRandomNumber();
        cb(null, baseName + '_' + md5tool.getMd5(baseName, random) + extName);
    }
})
const upload_temp = multer({ storage: storage_temp });

//处理预览图
router.post('/uploadImagePreview',upload_temp.single('usericon'),(req,res,next)=>{
	res.end(req.file.filename)
})

//添加用户
router.post('/adduser', (req,res,next) => {
	//获取对应数据
	let username = req.body.data.username;
	let nickname = req.body.data.nickname;
	let gender = req.body.data.gender;
	let age = req.body.data.age;
	let avatar = '/public/images/usericon/'+req.body.data.imageUrl;
	let passwordsalt = randomtool.getRandomNumber();
	let password = md5tool.getMd5(req.body.data.password,passwordsalt);
	let introduce = req.body.data.introduce;
	usersModel.insertMany({
		username:username,
		nickname:nickname,
		gender:gender,
		age:age,
		avatar:avatar,
		passwordsalt:passwordsalt,
		password:password,
		introduce:introduce
	},(error,result)=>{
		console.log(result)
		//移动文件
		fs.rename('./images_temp/'+req.body.data.imageUrl,'./public/images/usericon/'+req.body.data.imageUrl,(err)=>{})
	})
})

module.exports = router;
