var mongoose = require("mongoose");
mongoose.set("usenews-app", true);

var Schema = mongoose.Schema;

var newsSchema = new Schema({
    Headline: {
        type: String,
        required: true,
    },
    URL: {
        type: String,
        required: true,
    },

    Summary: {
        type: String,
        required: true
    },

    Comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

var News = mongoose.model("News", newsSchema);

module.exports = News;