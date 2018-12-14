// SCHEMA SETUP	
var mongoose = require("mongoose"),
	Schema 	 = mongoose.Schema;

var culturalSchema = new Schema({
	title: String,
	image: String,
	description: String,
	comments: [{
				type: Schema.Types.ObjectId,
				ref:  "Comment"
	}],
	author: {
		id: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
})

module.exports = mongoose.model("CulturalSites", culturalSchema);