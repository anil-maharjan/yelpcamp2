var express = require("express"),
	router	= express.Router(),
	CulturalSites = require("../models/culturalsites");

// CULTURAL SITES ROUTE 
router.get("/", function(req, res){
	CulturalSites.find({}, function(err, foundSites){
		if(err){
			console.log(err);
		} else {
			res.render("culutural_sites/index", {Sites: foundSites});
		}
	})
})

// NEW SITE ROUTE
router.get("/new", function(req, res){
	res.render("culutural_sites/newSites");
})

// ADD A NEW SITE ROUTE
router.post("/", function(req, res){
	CulturalSites.create(req.body.site, function(err, newSite){
		if(err){
			console.log(err);
		} else {
			res.redirect("/sites");
		}
	})
})

// INDIVIDUAL SITES ROUTE
router.get("/:id", function(req, res){
	CulturalSites.findById(req.params.id).populate("comments").exec(function(err, foundSite){
		if(err){
			console.log(err);
		} else {
			res.render("culutural_sites/foundSite", {site: foundSite});
		}
	})
})

// EDIT ROUTE
router.get("/:id/edit", function(req, res){
CulturalSites.findById(req.params.id, function(err, foundSite){
	if(err){
		console.log(err);
	} else {
		res.render("culutural_sites/edit", {site: foundSite});
	}
})
})

// UPDATE CULTURAL SITES ROUTE
router.put("/:id", function(req, res){
	CulturalSites.findOneAndUpdate({_id: req.params.id}, req.body.site, function(err, updatedSite){
		if(err){
			console.log(err);
		} else {
			res.redirect("/sites/"+req.params.id);
		}
	})
})

// DELETE CULTURAL SITES
router.delete("/:id", function(req, res){
	CulturalSites.findOneAndDelete({_id: req.params.id}, function(err){
		if(err){
			res.redirect("/sites");
		} else {
			res.redirect("/sites");
		}
	})
})

module.exports = router;