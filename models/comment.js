	// SCHEMA SETUP
var mongoose = require("mongoose"),
	Schema 	 = mongoose.Schema;

var commentSchema = new Schema({
	author: String,
	comment: String
});

module.exports = mongoose.model("Comment", commentSchema);