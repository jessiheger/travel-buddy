const mongoose = require('mongoose');

const postSchema = new mongoose.Schema ({
	firstName: 				{type: String, required: true}
  	,city:           		{type: String, required: true}
  	,activityType: 			{type: String, required: true}
  	,activityDescription: 	{type: String, required: true}
  	,methodOfContact: 		{type: String, required: true}
  	,language: 				{type: String, required: true}
  	,ageRange: 				String
  	,startDate: 			String
  	,endDate: 				String
  	,comments: 				[commentSchema]
});

const commentSchema = new mongoose.Schema ({
	body: 	{type: String, required: true}
	,date: 	{type : Date, default: Date.now}
});

module.exports = mongoose.model('Post', postSchema);