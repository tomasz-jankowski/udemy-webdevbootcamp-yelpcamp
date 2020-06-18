// Configuration
const express			= require('express'),
	  app				= express(),
	  bodyParser		= require('body-parser'),
	  mongoose			= require('mongoose'),
	  passport			= require('passport'),
	  LocalStrategy		= require('passport-local'),
	  methodOverride	= require('method-override'),
	  flash				= require('connect-flash'),
	  Campground		= require("./models/campground"),
	  Comment			= require("./models/comment"),
	  User				= require("./models/user"),
	  seedDB			= require("./seeds");
	  
// Import routes
const	commentRoutes		= require("./routes/comments"),
	 	campgroundRoutes	= require("./routes/campgrounds"),
	  	authRoutes			= require("./routes/index");

// Database connect
mongoose.connect('mongodb+srv://login:pass@database?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR: ', err.message);
});

// Serve public folder and parse the json responses
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
// Allow to use PUT and DELETE form methods
app.use(methodOverride("_method"));
// Use flash messages
app.use(flash());
// Set default view engine to ejs
app.set("view engine", "ejs");

// Seed the database with data
// seedDB();

// Passport configuration
app.use(require('express-session')({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Use routes
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", authRoutes);

// Start the server on HTTP port
app.listen(80, () => {
	console.log("Server started!");
});