var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//Index
router.get("/", function(req, res){
    res.render("landing");
});


//Auth
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register")
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/blog");
            })
        }
    });
});

//login form
router.get("/login", function(req, res){
    res.render("login");
});
router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/blog",
        failureRedirect: "/login"
    }), function(req, res){      
});

//User logout
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/blog");
});

module.exports = router