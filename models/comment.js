var mongoose = require("mongoose");
mongoose.set("usenews-app", true);

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    _newsId: {
        type: Schema.Types.ObjectId,
        ref: "News",
    }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;