const jwt = require("jsonwebtoken");
//白名单
const whiteList = ['/login/checklogin']

let authorization = function(){
    return function(req,res,next){
        const Bearer = req.headers.authorization;
        if(Bearer){
            const token  = Bearer.substr(7);
            jwt.verify(token,'SNSD',function(error,decode){
                if(error){
                    //发生错误可能是过期
                    return res.status(401).json(error);
                }
                next();
            })
        }else{
             // console.log(req.url);
            if(whiteList.includes(req.url)){
                next();
            }else{
                return res.status(401).json({
                    error:'授权错误，重新登陆'
                })
            }
        }
    }
}
module.exports=authorization