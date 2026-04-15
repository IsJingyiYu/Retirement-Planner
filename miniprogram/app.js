const storage = require("./utils/storage");

App({
  globalData: {
    userProfile: null,
    currentAnchor: null,
    anchorHistory: [],
    reminderEnabled: false
  },

  onLaunch() {
    this.globalData.userProfile = storage.getUserProfile();
    this.globalData.currentAnchor = storage.getCurrentAnchor();
    this.globalData.anchorHistory = storage.getAnchorHistory();
    this.globalData.reminderEnabled = storage.getReminderPreference();
  }
});
