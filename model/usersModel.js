const mongoosedb = require("mongoose")
mongoosedb.connect("mongodb://localhost:27017/GraduationDesign",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
//创建schema
const Schema = mongoosedb.Schema;
const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    passwordsalt:{
        type:String,
        required:true
    },
    nickname:String,
    gender:{
        type:Number,
        enum:[0,1]
    },
    age:{
        type:Number,
        min:0,
        max:120
    },
    avatar:{
        type:String,
        default:'/uploads/images/default.png'
    },
    introduce:String,
    last_modelfied_time:{
        type:Date,
        default:Date.now
    },
},{
    //schema 进一步参数配置
    timestamps:{
        createdAt:'create_time',
        updatedAt:'update_time'
    },
    // __v  不需要的话可以 versionKey:false
})
//collections   users->user   ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
const user = mongoosedb.model("user",userSchema,'user');
// new user({
//     username:'admin',
//     password:'admin',
//     nickname:'TaeYeon',
//     gender:0,
//     age:21,
//     introduce:'This is Taeyeon speaking',
// }).save()
module.exports = user;