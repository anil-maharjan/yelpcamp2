// App Config
var express 		= require("express"),
	app				= express(),
	bodyParser 		= require("body-parser"),
	methodOverride  = require("method-override"),
	mongoose		= require("mongoose"),
	passport		= require("passport"),
	flash			= require("connect-flash"),
	LocalStrategy	= require("passport-local"),
	CulturalSites 	= require("./models/culturalsites"),
	User 			= require("./models/user"),
	Comment 		= require("./models/comment"),
	Schema			= mongoose.Schema;

// REQUIRING ROUTES
var indexRoutes 		= require("./routes/index"),
	culturalSitesRoute  = require("./routes/culturalSites"),
	commentRoute 		= require("./routes/comment");

mongoose.connect("mongodb://localhost:27017/culutural_sites", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "clone project",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser	= req.user;
	res.locals.error		= req.flash("error");
	res.locals.success		= req.flash("success");
	next();
});

// ROUTES

// USE ROUTE
app.use(indexRoutes);
app.use("/sites", culturalSitesRoute);
app.use("/sites/:id/comments", commentRoute);

// Servers running on port 3000
app.listen(3000, function(){
	console.log("Servers are up and running");
})