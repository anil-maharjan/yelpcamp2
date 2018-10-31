var express = require("express"),
	router	= express.Router({mergeParams: true}),
	CulturalSites = require("../models/culturalsites"),
	Comment = require("../models/comment");

// COMMENT ROUTE
router.get("/", function(req, res){
	CulturalSites.findById(req.params.id, function(err, foundSite){
		if(err){
			console.log(err);
		} else {
			res.render("comments/newComment", {culturalSite: foundSite});	
		}
	})
})

// ADD A NEW COMMENT ROUTE
router.post("/", function(req, res){
	CulturalSites.findById(req.params.id, function(err, foundSite){
		if(err){
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, newComment){
				if(err){
					console.log(err);
				} else {
					foundSite.comments.push(newComment);
					foundSite.save();
					res.redirect("/sites/"+ req.params.id);
				}
			})
		}
	})
})

// EDIT COMMENT ROUTE
router.get("/:comment_id/edit", function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			console.log(err);
		} else {
			res.render("comments/edit",{culturalSite_id: req.params.id, comment: foundComment});
		}
	})
})

// UPDATE COMMENT ROUTE
router.put("/:comment_id", function(req, res){
	Comment.findOneAndUpdate({_id: req.params.comment_id}, req.body.comment, function(err, foundComment){
		if(err){
			console.log(err);
		} else {
			res.redirect("/sites/"+req.params.id);	
		}
	})
})

// DELETE COMMENT ROUTE
router.delete("/:comment_id", function(req, res){
	Comment.findOneAndDelete({_id: req.params.comment_id}, function(err){
		if(err){
			res.redirect("/sites");
		} else {
			res.redirect("/sites/"+req.params.id);
		}
	})
})

module.exports = router;