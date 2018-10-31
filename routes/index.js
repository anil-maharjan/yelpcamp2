var express = require("express"),
	router  = express.Router(),
	passport = require("passport"),
	User    = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res){
	res.render("landing");
})

// signup route
router.get("/signup", function(req, res){
	res.render("signup");
})

// register new user
router.post("/signup", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/signup");
		} 			
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to yelpcamp" + user.username)
			res.redirect("/sites");
		})
	})	
})

// login route
router.get("/login", function(req, res){
	res.render("user/login");
})

// handle login logic
router.post("/login", passport.authenticate('local', 
	{
		successRedirect: "/sites",
		failureRedirect: "/login"
	}), function(req, res){	
})


// logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("/sites");
})

module.exports = router;