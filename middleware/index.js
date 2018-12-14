var middleware = {},
	CulturalSites = require("../models/culturalsites"),
	Comment = require("../models/comment");

// To check if user is logged in or not
middleware.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

//To Check Campground Ownership
middleware.checkSitesOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		CulturalSites.findById(req.params.id, function(err, foundSite){
			if(err){
				req.flash("error", "Cultural Site not found")
				res.redirect("back");
			} else{
				if(req.user._id.equals(foundSite.author.id)){
					next();
				}else {
					req.flash("error", "You donot have permission to do that");
					res.redirect("back");
				}
			}
		})
	}else {
		req.flash("error", "You need to be logged in to that");
		res.redirect("/login");

	}
}


module.exports = middleware;