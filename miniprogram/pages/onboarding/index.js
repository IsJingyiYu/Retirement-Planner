const storage = require("../../utils/storage");

Page({
  handleStart() {
    wx.navigateTo({
      url: "/pages/survey/index"
    });
  },

  handleDemo() {
    const profile = {
      city: "上海",
      interests: ["walking", "culture", "learning"],
      activityPreferences: ["nearby", "outdoor", "quiet"],
      socialTendency: "balanced"
    };

    storage.setUserProfile(profile);
    storage.setReminderPreference(true);

    const app = getApp();
    app.globalData.userProfile = profile;
    app.globalData.reminderEnabled = true;

    wx.reLaunch({
      url: "/pages/home/index"
    });
  }
});
