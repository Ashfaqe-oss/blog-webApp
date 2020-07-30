//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContact = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContact = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContact = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Admin-Ashfaqe:v0noXyDfSuPoVymq@cluster0.4cxwc.mongodb.net/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = {
    title: String,
    content: String
};

const Post = new mongoose.model("Post", postSchema);


const post1 = new Post({
    title: "About Our Blogs",
    content: "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
});


app.get("/", function(req, res) {

    Post.find({}, function(err, posts) {
        res.render("home", {
            homeSC: homeStartingContact,
            posts: posts
        });

    });
});


app.get("/about", function(req, res) {
    res.render("about", { abContact: aboutContact });
});

app.get("/contact", function(req, res) {
    res.render("contact", { cC: contactContact });
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

app.post("/", function(req, res) {
    const post = new Post({
        title: req.body.blogTitle,
        content: req.body.blogBody
    });

    post.save(function(err) {
        if (!err) {
            res.redirect("/");
        }
    });

});


app.get("/posts/:postId", function(req, res) {
    //const typed = _.lowerCase(req.params.postName);
    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId }, function(err, post) {
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });

    //Post.forEach(function(post) {
    //const stored = _.lowerCase(post.title);

    //if (stored === typed) {
    // console.log("Match Found!!!");

    //}
    //});
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function() {
    console.log("server is up and running on port 3000");
});