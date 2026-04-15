const request = require("../../utils/request");
const storage = require("../../utils/storage");

Page({
  data: {
    city: "",
    interestsOptions: [
      { value: "walking", label: "散步", checked: false },
      { value: "nature", label: "自然", checked: false },
      { value: "culture", label: "文化展览", checked: false },
      { value: "learning", label: "学习新东西", checked: false },
      { value: "community", label: "社区活动", checked: false }
    ],
    preferenceOptions: [
      { value: "outdoor", label: "户外", checked: false },
      { value: "indoor", label: "室内", checked: false },
      { value: "nearby", label: "离家近", checked: false },
      { value: "quiet", label: "安静一点", checked: false },
      { value: "social", label: "带一点社交", checked: false }
    ],
    interests: [],
    activityPreferences: [],
    socialTendency: "balanced"
  },

  handleCityInput(event) {
    this.setData({
      city: event.detail.value
    });
  },

  handleInterestChange(event) {
    const values = event.detail.value;
    this.setData({
      interests: values,
      interestsOptions: this.data.interestsOptions.map((item) => {
        return Object.assign({}, item, {
          checked: values.indexOf(item.value) > -1
        });
      })
    });
  },

  handlePreferenceChange(event) {
    const values = event.detail.value;
    this.setData({
      activityPreferences: values,
      preferenceOptions: this.data.preferenceOptions.map((item) => {
        return Object.assign({}, item, {
          checked: values.indexOf(item.value) > -1
        });
      })
    });
  },

  handleSocialChange(event) {
    this.setData({
      socialTendency: event.detail.value
    });
  },

  handleSubmit() {
    const profile = {
      city: this.data.city.trim(),
      interests: this.data.interests,
      activityPreferences: this.data.activityPreferences,
      socialTendency: this.data.socialTendency
    };

    if (!profile.city) {
      wx.showToast({
        title: "请先填写城市",
        icon: "none"
      });
      return;
    }

    if (!profile.interests.length) {
      wx.showToast({
        title: "至少选择一个兴趣",
        icon: "none"
      });
      return;
    }

    storage.setUserProfile(profile);

    request
      .saveSurvey(profile)
      .catch(() => null)
      .then(() => {
        const app = getApp();
        app.globalData.userProfile = profile;

        wx.reLaunch({
          url: "/pages/home/index"
        });
      });
  }
});
