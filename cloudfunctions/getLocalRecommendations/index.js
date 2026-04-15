const locations = require("../../database/locations.json");

exports.main = async (event) => {
  const city = event && event.profile && event.profile.city ? event.profile.city : "你的城市";

  return locations
    .filter((item) => item.city === city || item.city === "通用")
    .slice(0, 5);
};
