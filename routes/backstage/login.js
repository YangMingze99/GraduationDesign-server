const express = require('express');
const router = express.Router();
const usersModel = require('../../model/usersModel.js');
const jwt = require('jsonwebtoken');
const md5Tool = require('../../tools/md5.js')



router.post('/checklogin', function(req, res, next) {
    const formData = req.body;
    usersModel.find({username:formData.username},{username:1,password:1,passwordsalt:1},(error,result)=>{
        //  console.log(result,'res');
        if(result.length){
            if(md5Tool.getMd5(formData.password,result[0].passwordsalt)==result[0].password){
                const token = jwt.sign({
			    //私有荷载
			    username:result[0].username,
                },'SNSD',{expiresIn:60*60*60});

                res.json({
                    data:201,
                    msg:'登陆成功！',
                    token
                })
            }else{
                res.status(415).json({
                    error,
                    data:415,
                    msg:'密码错误'
                })
            }
        }else{
            res.status(416).json({
                error,
                data:416,
                msg:'用户名不存在或输入错误'
            })
        }
	})
});
//注销
router.post('/logout',(req,res,next)=>{
	res.json({
		data:202,
		msg:'注销登陆成功'
	})
})

router.get('/getUserInfo',(req,res,next)=>{
	const token = req.query.token;
	// console.log( req.query);
	jwt.verify(token,'SNSD',(error,decode)=>{
		if(error){
			return res.status(401).json(error);
		}
		// console.log(decode,'getUserInfo');
		//通过存储的用户名找
		const username = decode.username;
		usersModel.find({username},(error,data)=>{
			// console.log(data,'find');
			res.json({
				msg:'success',
				data
			})
		})
	})
})

module.exports = router;
