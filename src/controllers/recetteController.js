const Recette = require("../models/Recette");

exports.ajouter = async (req, res, next) => {
  try {
    const recette = new Recette(req.body);
    await recette.save();
    res.status(201).json(recette);
  } catch (err) {
    next(err);
  }
};

exports.lireToutes = async (req, res, next) => {
  try {
    const recettes = await Recette.find();
    res.json(recettes);
  } catch (err) {
    next(err);
  }
};

exports.lireParId = async (req, res, next) => {
  try {
    const recette = await Recette.findById(req.params.id);
    res.json(recette);
  } catch (err) {
    next(err);
  }
};
exports.modifier = async (req, res, next) => {
  try {
    const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(recette);
  } catch (err) {
    next(err);
  }
};
exports.supprimer = async (req, res, next) => {
  try {
    await Recette.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
