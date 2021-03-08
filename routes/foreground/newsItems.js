const express = require('express');
const router = express.Router();
const newsItemModel = require('../../model/foreground/newsItemModel.js');

router.get('/getNewsItem',function(req,res,next){
	// console.log(req.query)
	newsItemModel.find({
		childrenId:req.query.childId
	},{_id:1,newsTitle:1,newsText:1,newsPictures:1,update_time:1},(error,result)=>{
		res.json({
			code:200,
			data:result
		})
	}).sort({ update_time:-1 })
})

router.get('/getNewsItemByParentId',function(req,res,next){
	// console.log(req.query)
	newsItemModel.find({
		parentId:req.query.parentId
	},{_id:1,newsTitle:1,newsText:1,newsPictures:1,update_time:1},(error,result)=>{
		res.json({
			code:200,
			data:result
		})
	}).sort({ update_time:-1 })
})

router.get('/getSwiperBannerNews',function(req,res,next){
	newsItemModel.find({
		isBanner:true
	},{_id:1,newsTitle:1,newsPictures:1,parentId:1,childrenId:1},(error,result)=>{
		res.json({
			code:200,
			data:result
		})
	}).sort({ update_time:-1 })
})

router.get('/getNewsDetail',function(req,res,next){
	newsItemModel.find({
		_id:req.query.newsId
	},(error,result)=>{
		res.json({
			code:200,
			data:result
		})
	})
})
module.exports = router;