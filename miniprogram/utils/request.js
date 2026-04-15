const storage = require("./storage");
const recommendation = require("./recommendation");

function cloudAvailable() {
  return typeof wx !== "undefined" && wx.cloud && typeof wx.cloud.callFunction === "function";
}

function callCloudFunction(name, data) {
  if (!cloudAvailable()) {
    return Promise.reject(new Error("Cloud function unavailable"));
  }

  return wx.cloud.callFunction({
    name,
    data: data || {}
  });
}

function initUser() {
  if (cloudAvailable()) {
    return callCloudFunction("initUser");
  }

  return Promise.resolve({
    result: {
      profile: storage.getUserProfile(),
      reminderEnabled: storage.getReminderPreference()
    }
  });
}

function saveSurvey(profile) {
  if (cloudAvailable()) {
    return callCloudFunction("saveSurvey", profile);
  }

  storage.setUserProfile(profile);
  return Promise.resolve({
    result: {
      success: true,
      profile
    }
  });
}

function getDailyAnchor(profile) {
  if (cloudAvailable()) {
    return callCloudFunction("getDailyAnchor", { profile });
  }

  const history = storage.getAnchorHistory();
  const anchor = recommendation.getDailyAnchor(profile, history);
  storage.setCurrentAnchor(anchor);

  return Promise.resolve({
    result: anchor
  });
}

function getLocalRecommendations(profile, weatherTag) {
  if (cloudAvailable()) {
    return callCloudFunction("getLocalRecommendations", {
      profile,
      weatherTag
    });
  }

  return Promise.resolve({
    result: recommendation.getLocalSuggestions(profile, weatherTag)
  });
}

function sendReminder(enabled) {
  if (cloudAvailable()) {
    return callCloudFunction("sendReminder", { enabled });
  }

  storage.setReminderPreference(enabled);
  return Promise.resolve({
    result: {
      success: true,
      enabled
    }
  });
}

module.exports = {
  initUser,
  saveSurvey,
  getDailyAnchor,
  getLocalRecommendations,
  sendReminder
};
