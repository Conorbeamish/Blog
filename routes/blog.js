var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware");

//Create
router.get("/blog", function(req, res){
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blog:allBlogs});
        }
    })
});

router.post("/blog", middleware.isLoggedIn, function(req, res){
    var title = req.body.title;
    var image1 = req.body.image1;
    var image2 = req.body.image2;
    var content = req.body.content;
    var author = req.user.username;
    var id = req.user._id;
    var date = req.body.date;
    var newBlog = {
        title: title,
        image1: image1,
        image2: image2,
        content: content,
        author: {
            id: id,
            username: author
        },
        date: date
    }
    Blog.create(newBlog, function(err, createdBlog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blog");
        }
    });
});

//New
router.get("/blog/new", middleware.isLoggedIn, function(req, res){
    res.render("new");
});

//Show
router.get("/blog/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//Edit
router.get("/blog/:id/edit", middleware.checkBlogAuthor, function(req, res){
    Blog.findById(req.params.id, function(err, currentBlog){
        res.render("edit", {blog: currentBlog});
    });
});

//Update
router.put("/blog/:id", middleware.checkBlogAuthor, function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blog");
        } else res.redirect("/blog/" + req.params.id);
    });
});

//Destroy
router.delete("/blog/:id", middleware.checkBlogAuthor, function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog");
        } else {
            res.redirect("/blog");
        }
    });
});

module.exports = router;