const express = require('express');
const router = express.Router();
const navBarModel = require('../../model/foreground/navBarModel.js');

router.get('/getParentsItem', function(req, res, next) {
	navBarModel.find({
		parentId: 0
	}, (error, result) => {
		res.json({
			code: 200,
			data: result
		})
	});
})

router.get('/getChildItem',function(req,res,next){
	navBarModel.find({
		parentId: req.query.parentId
	}, (error, result) => {
		res.json({
			code: 200,
			data: result
		})
	});
})

router.get('/getParentIDByName',function(req,res,next){
	navBarModel.find({
		itemName: req.query.name
	},{classId: 1}, (error, result) => {
		res.json({
			code: 200,
			data: result
		})
	});
})

router.get('/getUrlMessageByClassId',function(req,res,next){
	navBarModel.find({
		classId:req.query.classId
	},{itemName:1,itemUrl:1},(error,result)=>{
		res.json({
			code: 200,
			data: result
		})
	})
})
module.exports = router;