const mongoosedb = require("mongoose")
mongoosedb.connect("mongodb://localhost:27017/GraduationDesign", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const Schema = mongoosedb.Schema;
const newsItemSchema = new Schema({
	newsTitle: { //新闻标题
		type: String,
		required: true
	},
	newsAuthor: {//新闻作者
		type: String,
		required: true
	},
	newsClicks:{ //浏览量
		type:Number,
		require:true,
		default:0
	},
	newsLikes:{ //点赞
		type:Number,
		require:true,
		default:0
	},
	newsPictures:{ //新闻图片
		type:String,
		default:'/public/images/newsDefault.png'
	},
	newsText:{
		type:String,
		require:true
	},
	parentId: { //父栏目ClassId
		type: Number,
		required: true
	},
	childrenId:{ //子栏目ClassId
		type: Number,
		required: true
	},
	isChecked:{
		type:Boolean,
		required: true,
		default:false
	},
	isBanner:{
		type:Boolean,
		required: true,
		default:false
	}
}, {
	//schema 进一步参数配置
	timestamps: {
		createdAt: 'create_time',
		updatedAt: 'update_time'
	},
})
const newsItem = mongoosedb.model("newsItem", newsItemSchema, 'newsItem');
// new newsItem({
//     newsTitle:'计算机与信息工程学院——身边的榜样（六）',
//     newsAuthor:'刘新生',
// 	newsPictures:'@/assets/images/1.png',
//     newsClicks:0,
// 	newsLikes:0,
// 	newsText:'黑河学院励志奖学金是由学校自身出资设立，奖励资助品学兼优的家庭经济困难学生的奖学金。其目的是为了激励我校的家庭经济困难学生勤奋学习、努力进取，在德、智、体、美等方面全面发展。2020年我院共有7名学生荣获2019-2020学年黑河学院励志奖学金，以下为我院黑河学院励志奖学金获得者（排名不分先后）。刘盈，女，中共党员，2017级通信工程2班学生，曾任学院第十九届学生会办公室副主任，现任班级团支书。',
// 	parentId:33,
// 	childrenId:34,
// 	isChecked:true,
// 	isBanner:false
// }).save()
module.exports = newsItem;
