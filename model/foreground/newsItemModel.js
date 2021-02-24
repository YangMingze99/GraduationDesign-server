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
		default:'/images/newsDefault.png'
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
//     newsTitle:'加强线上教学平台应用培训，提升教师线上线下教学能力',
//     newsAuthor:'刘新生',
//     newsClicks:0,
// 	newsLikes:0,
// 	newsText:'为提升专任教师线上线下“混合式”教学模式的应用技能，提升课堂教学质量，建设好校级一流课程、课程思政课程和优秀课程，并为进一步冲击省级一流金课奠定坚实的基础，计算机与信息工程学院与体育学院一起，于2020年11月4日下午3：30，邀请智慧树平台黑龙江片区耿经理在探知楼A409进行平台应用技能培训。 耿经理首先从2019年全国金课评审标准与结果情况入手，给大家讲清了各类金课建设要注意的问题，接着就智慧树平台在各类金课建设过程中的支撑点一一给大家进行演示与训练，最后耿经理逐一回答大家的提问。经过本次培训，部分专任教师对金课建设标准、智慧树平台有了更加深入的认识，个别教师建设智慧树平台线上线下课程的意愿强烈，学院、智慧树平台均表示要大力支持教师进行课程优化改革，提升线上线下“混合式”教学质量。',
// 	parentId:8,
// 	childrenId:9,
// 	isChecked:true,
// 	isBanner:false
// }).save()
module.exports = newsItem;
