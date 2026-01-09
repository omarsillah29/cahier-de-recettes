const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recette",
    required: true,
  },
  author: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Comment", commentSchema);
