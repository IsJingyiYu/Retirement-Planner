const request = require("../../utils/request");
const storage = require("../../utils/storage");

Page({
  data: {
    profile: null,
    recommendations: []
  },

  onShow() {
    const profile = getApp().globalData.userProfile || storage.getUserProfile();
    if (!profile) {
      wx.reLaunch({
        url: "/pages/onboarding/index"
      });
      return;
    }

    this.setData({ profile });

    request.getLocalRecommendations(profile, "sunny").then((response) => {
      this.setData({
        recommendations: response.result
      });
    });
  },

  handleCardTap(event) {
    const item = event.detail;
    wx.showToast({
      title: item.title,
      icon: "none"
    });
  }
});
