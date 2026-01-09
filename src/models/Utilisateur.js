const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const utilisateurSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  motdepasse: { type: String, required: true },
});

utilisateurSchema.pre("save", function (next) {
  if (!this.isModified("motdepasse")) return next();
  const user = this;
  require("bcrypt").hash(user.motdepasse, 10, function (err, hash) {
    if (err) return next(err);
    user.motdepasse = hash;
    next();
  });
});

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
