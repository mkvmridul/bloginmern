const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
	user: {
		// type: mongoose.Schema.Types.ObjectId,
		type:Array,
		ref: 'users'
	},
	title:{
		type: String,
		required: true
	},

	body:{
		type: String,
		required: true
	},
	date:{
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('post',PostSchema);