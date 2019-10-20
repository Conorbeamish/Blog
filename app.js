var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    methodOverride = require("method-override");

var blogRoutes = require("./routes/blog"),
    authRoutes = require("./routes/auth");

//Connecting to Database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/blog", {useNewUrlParser: true});
mongoose.connection.once("open", function(){
    console.log("Connected to database");
}).on("error", function(error){
    console.log("Conection error", error)
});

mongoose.set('useFindAndModify', false);

//Serves static files
app.use("/assets", express.static(__dirname + "/assets"));

//Enables POST and req.body requests
app.use(bodyParser.urlencoded({extended: true}));

//Change View engine 
app.set("view engine", "ejs");

//Allows PUT DELETE requests
app.use(methodOverride("_method"));

//Passport config
app.use(require("express-session")({
    secret: "hefus038ur8394ur20hfjej09342klfs",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Passes current user into all pages MUST BE AFTER PASSPORT CONIG
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Routes
app.use(authRoutes);
app.use(blogRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("server working");
});