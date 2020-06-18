const 	express		= require('express'),
		router 		= express.Router(),
		Campground	= require("../models/campground"),
		Comment		= require("../models/comment"),
		middleware	= require("../middleware");

// show the list of campgrounds
router.get('/', (req, res) => {
	Campground.find({}, (err, allCampgrounds) => {
		if(err)
			console.log(err);
		else
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
	});
});

// add new campground, then show the list of campgrounds
router.post('/', middleware.isLoggedIn, (req, res) => {
	// get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	const price = String(parseFloat(req.body.price).toFixed(2));
	const author = {
		id: req.user._id,
		username: req.user.username
	};
	const newCampground = {name: name, image: image, description: desc, price: price, author: author};
	// create a new campground and save it to DB
	Campground.create(newCampground, (err, newlyCreated) => {
		if(err)
			console.log(err);
		else
			res.redirect('/campgrounds');
	});
});

// show the form to add a new campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

// show the specific campground
router.get('/:id', (req, res) => {
	// Find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err || !foundCampground) {
			req.flash("error", "Campground not found.");
			res.redirect("back");
		} else
			// Render show template with that specific campground
			res.render("campgrounds/show", {campground: foundCampground});
	});
});

// edit campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// update campground
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
	const name = req.body.campground.name;
	const image = req.body.campground.image;
	const desc = req.body.campground.description;
	const price = String(parseFloat(req.body.campground.price).toFixed(2));
	const campground = {name: name, image: image, description: desc, price: price};
	// find and update specific campground
	Campground.findByIdAndUpdate(req.params.id, campground, (err, updatedCampground) => {
		if(err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

// destroy campground
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err, removedCampground) => {
		if(err) {
			res.redirect('/campgrounds');
		} else {
			Comment.deleteMany({_id: {$in: removedCampground.comments}}, err => {
				if(err) {
					console.log(err);
				} else {
					res.redirect('/campgrounds');
				}
			});
		}
	});
});

module.exports = router;