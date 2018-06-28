const mongoose = require('mongoose');
const Post = require('./models/post');

mongoose.connect('mongodb://localhost/travelBuddy');

const post_list = [
  {
    firstName: 				'Simon'
  	,city:           		'reykjavik'
  	,activityType: 			['Outdoors', 'Foodie', 'Music']
  	,activityDescription: 	'I like to do outdoorsy things while eating foods and playing music.'
  	,methodOfContact: 		'my@email.com'
  	,language: 				'Yiddish'
  	,ageRange: 				'55+'
  	,startDate: 			'2018-09-01'
  	,endDate: 				'2018-09-11'
  },
  {
    firstName: 				'Joe'
  	,city:           		'reykjavik'
  	,activityType: 			['Outdoors']
  	,activityDescription: 	'Let\'s go backpacking!'
  	,methodOfContact: 		'joe@email.com'
  	,language: 				'English'
  	,ageRange: 				'21-35'
  	,startDate: 			'2018-09-15'
  	,endDate: 				'2018-09-28'
  },
  {
    firstName: 				'Cathleen'
  	,city:           		'reykjavik'
  	,activityType: 			['Nightlife', 'Foodie', 'Music']
  	,activityDescription: 	'I like to check out cool bars and music venues.'
  	,methodOfContact: 		'cat@email.com'
  	,language: 				'English'
  	,ageRange: 				'21-35'
  	,startDate: 			'2018-10-05'
  	,endDate: 				'2018-10-27'
  },
];

// remove all records that match {} -- which means remove ALL records
Post.remove({}, function(err, posts){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all posts');

    // create new records based on the array todos_list
    Post.create(post_list, function(err, posts){
      if (err) { return console.log('err', err); }
      console.log("created", posts.length, "posts");
      process.exit();
    });
  }
});