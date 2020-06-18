// include models
const   Campground  = require("../models/campground"),
        Comment     = require("../models/comment");

// declare an object
const middlewareObj = {};

// add methods of object
middlewareObj.checkCampgroundOwnership = (req, res, next) => {
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, foundCampground) => {
			if(err || !foundCampground) {
				req.flash("error", "Campground not found.");
				res.redirect("back");
			} else {
				// Does user own the campground?
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You have to be logged in to do that.");
		res.redirect("back");
	}	
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if(err || !foundComment) {
				req.flash("error", "Comment not found.");
				res.redirect("back");
			} else {
				// Does user own the campground?
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You have to be logged in to do that.");
		res.redirect("back");
	}	
}

middlewareObj.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You have to be logged in to do that.");
	res.redirect('/login');
}

// export object so it can be visible in app.js
module.exports = middlewareObj;