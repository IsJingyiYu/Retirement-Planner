const request = require("../../utils/request");
const storage = require("../../utils/storage");

function buildHistoryEntry(anchor, status) {
  return {
    id: anchor.id,
    title: anchor.title,
    category: anchor.category,
    status,
    date: new Date().toISOString()
  };
}

Page({
  data: {
    profile: null,
    anchor: null,
    completed: false
  },

  onShow() {
    const app = getApp();
    const profile = app.globalData.userProfile || storage.getUserProfile();
    const anchor = app.globalData.currentAnchor || storage.getCurrentAnchor();

    this.setData({
      profile,
      anchor,
      completed: false
    });

    if (!anchor && profile) {
      this.refreshAnchor();
    }
  },

  refreshAnchor() {
    if (!this.data.profile) {
      return;
    }

    request.getDailyAnchor(this.data.profile).then((response) => {
      const anchor = response.result;
      storage.setCurrentAnchor(anchor);
      getApp().globalData.currentAnchor = anchor;
      this.setData({ anchor, completed: false });
    });
  },

  handleComplete() {
    const anchor = this.data.anchor;
    if (!anchor) {
      return;
    }

    const history = storage.getAnchorHistory();
    history.push(buildHistoryEntry(anchor, "completed"));
    storage.setAnchorHistory(history);

    this.setData({
      completed: true
    });

    wx.showToast({
      title: "今天已经开始了",
      icon: "success"
    });
  },

  handleSwap() {
    const anchor = this.data.anchor;
    if (anchor) {
      const history = storage.getAnchorHistory();
      history.push(buildHistoryEntry(anchor, "swapped"));
      storage.setAnchorHistory(history);
    }

    this.refreshAnchor();
  },

  goToProfile() {
    wx.navigateTo({
      url: "/pages/profile/index"
    });
  }
});
