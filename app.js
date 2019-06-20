var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.use("/assets", express.static(__dirname + "/assets"));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/blog", function(req, res){
    var blog = [
        {}
    ]
    res.render("blog");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("server working");
});