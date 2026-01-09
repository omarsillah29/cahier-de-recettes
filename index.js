require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const app = express();

// Connexion à la base de données
connectDB();

// Middlewares
app.use(express.json());

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Cahier de Recettes",
      version: "1.0.0",
      description: "Documentation de l’API de partage de recettes",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.js"], // Chemin vers tes fichiers de routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route de test
app.get("/", (req, res) => {
  res.send("API opérationnelle !");
});

// Routes Utilisateurs
const utilisateurRoutes = require("./src/routes/Utilisateur");
app.use("/utilisateurs", utilisateurRoutes);

// Routes Recettes
const recettesRoutes = require("./src/routes/Recette");
app.use("/recettes", recettesRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

app.use(require("./src/middlewares/errorHandler"));
