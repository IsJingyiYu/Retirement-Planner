const templates = require("../../database/anchor_templates.json");

exports.main = async () => {
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
};
