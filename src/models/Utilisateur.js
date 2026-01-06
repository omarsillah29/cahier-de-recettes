const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema({
  nom: String,
  email: { type: String, unique: true },
  mot_de_passe: String,
});

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
