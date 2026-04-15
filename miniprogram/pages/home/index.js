const request = require("../../utils/request");
const storage = require("../../utils/storage");

Page({
  data: {
    profile: null,
    anchor: null,
    recommendations: []
  },

  onShow() {
    const app = getApp();
    const profile = app.globalData.userProfile || storage.getUserProfile();

    if (!profile) {
      wx.reLaunch({
        url: "/pages/onboarding/index"
      });
      return;
    }

    this.setData({
      profile
    });

    this.loadDailyAnchor(profile);
    this.loadRecommendations(profile);
  },

  loadDailyAnchor(profile) {
    request.getDailyAnchor(profile).then((response) => {
      const anchor = response.result;
      getApp().globalData.currentAnchor = anchor;
      this.setData({ anchor });
    });
  },

  loadRecommendations(profile) {
    request.getLocalRecommendations(profile, "sunny").then((response) => {
      this.setData({
        recommendations: response.result.slice(0, 2)
      });
    });
  },

  goToToday() {
    wx.navigateTo({
      url: "/pages/today/index"
    });
  },

  goToLocal() {
    wx.navigateTo({
      url: "/pages/local/index"
    });
  },

  goToProfile() {
    wx.navigateTo({
      url: "/pages/profile/index"
    });
  },

  goToSurvey() {
    wx.navigateTo({
      url: "/pages/survey/index"
    });
  },

  handleAnchorComplete() {
    wx.navigateTo({
      url: "/pages/today/index"
    });
  },

  handleAnchorSwap() {
    if (this.data.profile) {
      this.loadDailyAnchor(this.data.profile);
    }
  }
});
