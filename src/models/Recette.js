const mongoose = require("mongoose");

const recetteSchema = new mongoose.Schema({
  titre: String,
  ingredients: [String],
  etapes: [String],
  auteur: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recette", recetteSchema);
