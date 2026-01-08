const express = require("express");
const router = express.Router();
const controller = require("../controllers/recetteController");
const commentController = require("../controllers/commentController");
const Recette = require("../models/Recette");

// Routes CRUD
router.post("/", controller.ajouter);
router.get("/", controller.lireToutes);
router.get("/:id", controller.lireParId);
router.put("/:id", controller.modifier);
router.delete("/:id", controller.supprimer);

// Ajouter un commentaire
router.post("/recipes/:recipeId/comments", commentController.addComment);

// Route filtrée avec tri
router.get("/recipes", async (req, res) => {
  try {
    const sort = req.query.sort;
    let sortOption = {};

    if (sort === "date") sortOption = { date: -1 }; // ou { createdAt: -1 } selon le modèle
    if (sort === "popularity") sortOption = { likes: -1 };

    const recipes = await Recette.find().sort(sortOption);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
