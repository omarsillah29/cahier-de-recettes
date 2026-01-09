const Utilisateur = require("../models/Utilisateur");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Inscription
exports.register = async (req, res) => {
  const { email, motdepasse } = req.body;
  try {
    const utilisateur = new Utilisateur({ email, motdepasse });
    await utilisateur.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (err) {
    console.error("Erreur détaillée :", err);
    res.status(400).json({ error: "Erreur lors de l'inscription." });
  }
};
exports.register = async (req, res) => {
  const { email, motdepasse } = req.body;
  try {
    const utilisateur = new Utilisateur({ email, motdepasse });
    await utilisateur.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (err) {
    console.error("Erreur détaillée :", err); // <-- Ajoute cette ligne
    res.status(400).json({ error: "Erreur lors de l'inscription." });
  }
};

// Connexion
exports.login = async (req, res) => {
  const { email, motdepasse } = req.body;
  try {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur)
      return res.status(401).json({ error: "Utilisateur non trouvé." });

   const valid = await bcrypt.compare(motdepasse, utilisateur.motdepasse);
    if (!valid)
  return res.status(401).json({ error: "Mot de passe incorrect." });

    const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la connexion." });
  }
};
