const 	express		= require('express'),
		router 		= express.Router({mergeParams: true}),
		Campground	= require("../models/campground"),
		Comment		= require("../models/comment"),
		middleware	= require("../middleware");
	
// show the form to add comment
router.get('/new', middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err || !campground) {
			req.flash("error", "Campground not found.");
			res.redirect("back");
		} else
			res.render("comments/new", {campground: campground});
	});
});

// add new comment
router.post('/', middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			req.flash("error", "Something went wrong.");
			console.log(err);
		}
		else {
			Comment.create(req.body.comment, (err, comment) => {
				if(err)
					console.log(err)
				else {
					// add authors username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save the comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Comment successfully created.");
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

// edit comment
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err || !foundCampground) {
			req.flash("error", "Campground not found.");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if(err) {
				res.redirect("back");
			} else {
				res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
			}
		});
	});
});

// update comment
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// delete comment
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, err => {
		if(err) {
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted.");
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

module.exports = router;