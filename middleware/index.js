var middlewareObj = {};
var Blog = require("../models/blog");

middlewareObj.checkBlogAuthor = function(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, currentBlog){
            if(err){
                res.redirect("back")
            } else {
            if(currentBlog.author.id.equals(req.user._id)){
                next();
            } else {
                res.redirect("back");
            }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;