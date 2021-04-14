const mongoosedb = require("mongoose")
mongoosedb.connect("mongodb://localhost:27017/GraduationDesign", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
//创建schema
const Schema = mongoosedb.Schema;
const userRoleSchema = new Schema({
		modelName: {
			type: String,
			required: true
		},
		modelID: {
			type: Number,
			required: true
		},
		roleId: {
			type: Number,
			required: true
		}
}, {
	versionKey: false
})
//collections   users->user   ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
const userRole = mongoosedb.model("userRole", userRoleSchema, 'userRole');
// new userRole({
//     roleId:8,
// 	modelID:37,
// 	modelName:'招生就业',
// }).save()
module.exports = userRole;
