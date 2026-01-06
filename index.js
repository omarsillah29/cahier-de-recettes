require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

// Connexion à la base de données
connectDB();

// Middlewares
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.send("API opérationnelle !");
});

// Routes Recettes
const recettesRoutes = require("./src/routes/Recette");
app.use("/recettes", recettesRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
