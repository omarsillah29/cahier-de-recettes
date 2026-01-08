const Recipe = require("../models/Recette");
const Comment = require("../models/Comment");
exports.addComment = async (req, res) => {
  const { recipeId } = req.params;
  const { author, content } = req.body;
  if (!content)
    return res.status(400).json({ error: "Le contenu est requis." });

  const comment = new Comment({ recipeId, author, content });
  await comment.save();
  res.status(201).json(comment);
};

exports.getComments = async (req, res) => {
  const { recipeId } = req.params;
  try {
    const comments = await Comment.find({ recipeId });
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commentaires." });
  }
};

exports.getFilteredRecipes = async (req, res) => {
  const { ingredient, author } = req.query;
  const query = {};
  if (ingredient) query.ingredients = { $regex: ingredient, $options: "i" };
  if (author) query.author = { $regex: author, $options: "i" };

  const recipes = await Recipe.find(query);
  res.json(recipes);
};
