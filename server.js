var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect("mongodb://localhost/news-app", { useNewUrlParser: true });

require("./controllers/controller.js")(app);


// listen on port 3000
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

