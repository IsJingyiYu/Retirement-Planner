const request = require("../../utils/request");
const storage = require("../../utils/storage");

Page({
  data: {
    profile: null,
    reminderEnabled: false,
    cityText: "未设置",
    interestText: "未设置"
  },

  onShow() {
    const profile = getApp().globalData.userProfile || storage.getUserProfile();
    this.setData({
      profile,
      reminderEnabled: storage.getReminderPreference(),
      cityText: profile && profile.city ? profile.city : "未设置",
      interestText: profile && profile.interests && profile.interests.length
        ? profile.interests.join(" / ")
        : "未设置"
    });
  },

  handleReminderChange(event) {
    const enabled = event.detail.value;
    storage.setReminderPreference(enabled);
    getApp().globalData.reminderEnabled = enabled;

    request.sendReminder(enabled);

    this.setData({
      reminderEnabled: enabled
    });
  },

  goToSurvey() {
    wx.navigateTo({
      url: "/pages/survey/index"
    });
  }
});
