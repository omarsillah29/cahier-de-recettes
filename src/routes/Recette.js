const express = require("express");
const router = express.Router();
const controller = require("../controllers/recetteController");

router.get("/", (req, res) => {
  res.json({ message: "Liste des recettes" });
});

router.post("/", controller.ajouter);
router.get("/", controller.lireToutes);
router.get("/:id", controller.lireParId);
router.put("/:id", controller.modifier);
router.delete("/:id", controller.supprimer);

module.exports = router;
