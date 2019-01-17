var axios = require("axios");
var cheerio = require("cheerio");
var models = require("../models");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        console.log("scraper");
        // First, we grab the body of the html with axios
        axios.get("https://www.nytimes.com/section/technology").then(function (response) {
            console.log("got something back");
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
            $(".css-1dq8tca").each(function (i, element) {
                // Save an empty result object
                var result = {
                    Headline: $(this).html(),
                    URL: "test",
                    Summary: "test2"
                };
                models.News.create(result).then(function (data) {
                    // console.log("it worked", data);
                })
                // console.log($(this).html())

            });

            console.log($(".css-1dq8tca").html());

            // Send a message to the client
            res.send("Scrape Complete");
        });
    });

    app.get("/singleArticle/:id", function (req, res) {
        models.News.findOne({ _id: req.params.id }).then(function (data) {
            // console.log("this is the article we found", data);
            res.json(data);
        })
    });

    app.post("/savenote/:id", function (req, res) {
        console.log(req.params, req.body);
        var thingtosave = {
            title: req.body.title,
            body: req.body.body,
            _newsId: req.params.id
        }
        models.Comment.create(thingtosave).then(function (data) {
            models.News.findOneAndUpdate({ _id: req.params.id }, { Comment: data._id }).then(function (data) {
                console.log("just updated news", data);
            })
            console.log("we just made this", data);
        })
    });

    app.get("/allArticles", function (req, res) {
        console.log("articles scraped");
        models.News.find({}).then(function (data) {
            // console.log("it worked", data);
            res.json(data);
        })
    })

};
