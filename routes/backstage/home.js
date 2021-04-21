const express = require('express');
const jwt = require('jsonwebtoken');
const md5tool = require("../../tools/md5.js");
const randomtool = require("../../tools/random_number.js");
const usersModel = require('../../model/usersModel.js');
const userRoleModel = require('../../model/userRoleModel.js');
const newsItemModel = require('../../model/foreground/newsItemModel.js')
const multer = require("multer");
const path = require("path");
var fs = require("fs");
const router = express.Router();


const storage_temp = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './images_temp/');
	},
	filename: function(req, file, cb) {
		let extName = path.extname(file.originalname); //获取后缀名
		let baseName = path.parse(file.originalname).name; //获取文件名
		let random = randomtool.getRandomNumber();
		cb(null, baseName + '_' + md5tool.getMd5(baseName, random) + extName);
	}
})
const upload_temp = multer({
	storage: storage_temp
});

//处理预览图
router.post('/uploadImagePreview', upload_temp.single('usericon'), (req, res, next) => {
	res.end(req.file.filename)
})

//处理新闻内容图片预览图
router.post('/uploadImagePreviewForText', upload_temp.single('textPic'), (req, res, next) => {
	fs.rename('./images_temp/' + req.file.filename, './public/images/newTextPic/' + req.file.filename, (err) => {})
	res.end(req.file.filename)
})

//添加用户
router.post('/adduser', (req, res, next) => {
	//获取对应数据
	let username = req.body.data.username;
	let nickname = req.body.data.nickname;
	let gender = req.body.data.gender;
	let age = req.body.data.age;
	let avatar = '/public/images/usericon/' + req.body.data.imageUrl;
	let passwordsalt = randomtool.getRandomNumber();
	let password = md5tool.getMd5(req.body.data.password, passwordsalt);
	let introduce = req.body.data.introduce;
	usersModel.insertMany({
		username: username,
		nickname: nickname,
		gender: gender,
		age: age,
		avatar: avatar,
		passwordsalt: passwordsalt,
		password: password,
		introduce: introduce
	}, (error, result) => {
		//移动文件
		fs.rename('./images_temp/' + req.body.data.imageUrl, './public/images/usericon/' + req.body.data.imageUrl, (err) => {})
		res.json({
			code: 666,
			msg: 'addUser Success',
		})
	})
})

//获取全部用户信息
router.get('/getAllUsers', (req, res, next) => {
	usersModel.find((error, data) => {
		res.json({
			msg: 'success',
			data
		})
	})
})

//根据id查找用户
router.get('/getUserById', (req, res, next) => {
	const userId = req.query.id;
	usersModel.find({
		_id: userId
	}, (error, result) => {
		res.json({
			code: 666,
			data: result[0]
		})
	})
})

//根据id删除用户
router.post('/deleteUser', (req, res, next) => {
	const deleteItemId = req.body.id
	usersModel.deleteOne({
		_id: deleteItemId
	}, (error, result) => {
		if (!error) {
			res.json({
				code: 666,
				msg: 'success',
				result
			})
		}

	})
})

//编辑用户
router.post('/editUser', async (req, res, next) => {
	const {
		_id,
		username,
		nickname,
		gender,
		age,
		introduce
	} = req.body.formData;
	const newAvatar = req.body.formData.newAvatar ? req.body.formData.newAvatar : undefined;
	const avatar = req.body.formData.newAvatar ? '/public/images/usericon/' + req.body.formData.newAvatar : req.body.formData
		.avatar
	usersModel.updateMany({
		"_id": _id
	}, {
		$set: {
			"username": username,
			"nickname": nickname,
			"gender": gender,
			"age": age,
			"introduce": introduce,
			"avatar": avatar
		}
	}, (error, result) => {
		if (!error) {
			if (newAvatar) {
				fs.rename('./images_temp/' + newAvatar, './public/images/usericon/' + newAvatar, (err) => {})
			}
			res.json({
				code: 666,
				msg: 'success',
				result
			})
		}
	})
})

//修改密码
router.post('/editPassword', (req, res, next) => {
	const {
		password,
		userId
	} = req.body.formData
	const passwordsalt = randomtool.getRandomNumber();
	const newMd5Password = md5tool.getMd5(password, passwordsalt);
	usersModel.updateMany({
		"_id": userId
	}, {
		$set: {
			"passwordsalt": passwordsalt,
			"password": newMd5Password
		}
	}, (error, result) => {
		if (!error) {
			res.json({
				code: 666,
				msg: 'success',
				result
			})
		}
	})
})

//获取全部权限类别
router.get('/getAllUserRole', (req, res, next) => {
	userRoleModel.find((error, data) => {
		res.json({
			msg: 'success',
			data
		})
	})
})

//根据id更改权限
router.post('/editUserRoleById', (req, res, next) => {
	const id = req.body.userid;
	const newrole = req.body.newrole
	usersModel.update({
		"_id": id
	}, {
		$set: {
			"role": newrole
		}
	}, (error, result) => {
		if (!error) {
			res.json({
				code: 666,
				msg: 'success',
				result
			})
		}
	})
})

//根据权限id获取权限信息
router.get('/getRoleInfo', (req, res, next) => {
	const roleId_find = req.query.roleId;
	userRoleModel.findOne({
		"roleId": roleId_find
	}, (error, result) => {
		if (!error) {
			res.json({
				code: 666,
				msg: 'success',
				result
			})
		}
	})
})

//添加新闻
router.post("/addNewsItem", (req, res, next) => {
	// fs.rename('./images_temp/' + req.body.data.newsPictures, './public/images/newsPic/' + req.body.data.newsPictures, (err) => {
	// 	console.log(err);
	// })
	let fromData = req.body.data
	fs.rename('./images_temp/' + req.body.data.newsPictures, './public/images/newsPic/' + req.body.data.newsPictures, (
		err) => {

	})
	fromData.newsPictures = '/public/images/newsPic/' + fromData.newsPictures;
	newsItemModel.insertMany({ ...fromData
	}, (error, data) => {
		if (!error) {
			res.json({
				code: 666,
				msg: 'addNews Success',
			})
		}
	})
})

//修改新闻
router.post("/editNewsItem", (req, res, next) => {
	const newsId = req.body.newsId;
	const formData = req.body.data;
	const isNewPic = req.body.newPic;
	if (isNewPic) {
		fs.rename('./images_temp/' + req.body.data.newsPictures, './public/images/newsPic/' + req.body.data.newsPictures, (
			err) => {})
		formData.newsPictures = '/public/images/newsPic/' + formData.newsPictures;
	}
	newsItemModel.updateMany({
		"_id": newsId
	}, {
		$set: {
			...formData,
			update_time: new Date()
		}
	}, (error, data) => {
		if(!error){
			res.json({
				code: 666,
				msg: 'editNews Success'
			})
		}
	})
})


router.post("/deleteNewsItem",(req, res, next) => {
	const newsId = req.body.newsId;
	newsItemModel.remove({"_id":newsId},(error,data) => {
		if(!error){
			res.json({
				code: 666,
				msg: 'deleteNews Success'
			})
		}
	})
})

router.get('/getUnCheckedNewItem',(req, res, next) => {
	newsItemModel.find({isChecked:false},(error,data) => {
		if(!error){
			res.json({
				code: 666,
				data
			})
		}
	})
})

router.post('/commitNewsItem',(req, res, next) => {
	const newsId = req.body.newsId;
	newsItemModel.update({"_id":newsId},{
		$set: {
			isChecked:true
		}
	},(error,data) => {
		if(!error){
			res.json({
				code: 666,
				msg: 'commitNews Success'
			})
		}
	})
})
module.exports = router;
