const Recette = require("../models/Recette");

exports.ajouter = async (req, res) => {
  const recette = new Recette(req.body);
  await recette.save();
  res.status(201).json(recette);
};

exports.lireToutes = async (req, res) => {
  const recettes = await Recette.find();
  res.json(recettes);
};

exports.lireParId = async (req, res) => {
  const recette = await Recette.findById(req.params.id);
  res.json(recette);
};

exports.modifier = async (req, res) => {
  const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(recette);
};

exports.supprimer = async (req, res) => {
  await Recette.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
