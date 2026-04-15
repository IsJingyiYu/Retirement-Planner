const KEYS = {
  userProfile: "rp_user_profile",
  currentAnchor: "rp_current_anchor",
  anchorHistory: "rp_anchor_history",
  reminderEnabled: "rp_reminder_enabled"
};

function safeGet(key, fallback) {
  try {
    const value = wx.getStorageSync(key);
    return value === "" || value === undefined ? fallback : value;
  } catch (error) {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    wx.setStorageSync(key, value);
    return true;
  } catch (error) {
    return false;
  }
}

function getUserProfile() {
  return safeGet(KEYS.userProfile, null);
}

function setUserProfile(profile) {
  return safeSet(KEYS.userProfile, profile);
}

function getCurrentAnchor() {
  return safeGet(KEYS.currentAnchor, null);
}

function setCurrentAnchor(anchor) {
  return safeSet(KEYS.currentAnchor, anchor);
}

function getAnchorHistory() {
  return safeGet(KEYS.anchorHistory, []);
}

function setAnchorHistory(history) {
  return safeSet(KEYS.anchorHistory, history);
}

function getReminderPreference() {
  return safeGet(KEYS.reminderEnabled, false);
}

function setReminderPreference(enabled) {
  return safeSet(KEYS.reminderEnabled, enabled);
}

module.exports = {
  getUserProfile,
  setUserProfile,
  getCurrentAnchor,
  setCurrentAnchor,
  getAnchorHistory,
  setAnchorHistory,
  getReminderPreference,
  setReminderPreference
};
