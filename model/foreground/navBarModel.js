const mongoosedb = require("mongoose")
mongoosedb.connect("mongodb://localhost:27017/GraduationDesign",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const Schema = mongoosedb.Schema;
const navBarItemSchema = new Schema({
    itemName:{
        type:String,
        required:true
    },
	itemUrl:{
		type:String,
		required:true
	},
	classId:{
		type:Number,
		required:true
	},
	parentId:{
		type:Number,
		required:true
	}
})
const navBarItem = mongoosedb.model("navBarItem",navBarItemSchema,'navBarItem');
// new navBarItem({
//     itemName:'就业信息',
//     itemUrl:'/employmentInformation',
//     classId:38,
//     parentId:37,
// }).save()
module.exports = navBarItem;