const anchorTemplates = [
  {
    id: "walk-downstairs",
    category: "movement",
    tags: ["walking", "outdoor", "low-pressure"],
    title: "下楼走20分钟",
    description: "不用准备太多，就从一次轻松散步开始。"
  },
  {
    id: "message-friend",
    category: "social",
    tags: ["social", "light-connection"],
    title: "给一个朋友发消息",
    description: "不需要长聊，只是简单问候一下。"
  },
  {
    id: "learn-small",
    category: "learning",
    tags: ["learning", "indoor", "quiet"],
    title: "学一个小东西",
    description: "看10分钟视频，或者读一篇你感兴趣的短内容。"
  },
  {
    id: "visit-park",
    category: "exploration",
    tags: ["outdoor", "nearby", "nature"],
    title: "去附近公园坐一会儿",
    description: "换个环境，让今天有一个轻微但真实的变化。"
  },
  {
    id: "tea-break",
    category: "calm",
    tags: ["quiet", "slow", "indoor"],
    title: "给自己泡杯茶并坐10分钟",
    description: "今天先不用追求效率，先把节奏找回来。"
  }
];

const localTemplates = [
  {
    id: "park-template",
    type: "park",
    title: "附近公园散步",
    description: "适合低门槛活动，随时可以开始。",
    weather: ["sunny", "cloudy"],
    tags: ["walking", "nature", "outdoor"]
  },
  {
    id: "museum-template",
    type: "exhibition",
    title: "小型展览或文化空间",
    description: "适合慢节奏浏览，也容易和家人朋友分享。",
    weather: ["sunny", "cloudy", "rainy"],
    tags: ["culture", "learning", "indoor"]
  },
  {
    id: "community-template",
    type: "community",
    title: "社区活动中心",
    description: "可以看看有没有手工、合唱、讲座或兴趣班。",
    weather: ["sunny", "cloudy", "rainy"],
    tags: ["social", "community", "learning"]
  }
];

function shuffle(list) {
  return list
    .map((item) => ({ item, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map((entry) => entry.item);
}

function scoreAnchor(template, profile, historyMap) {
  let score = 0;
  const interests = profile && profile.interests ? profile.interests : [];
  const preferences = profile && profile.activityPreferences ? profile.activityPreferences : [];
  const socialTendency = profile && profile.socialTendency ? profile.socialTendency : "balanced";

  interests.forEach((interest) => {
    if (template.tags.indexOf(interest) > -1) {
      score += 3;
    }
  });

  preferences.forEach((preference) => {
    if (template.tags.indexOf(preference) > -1) {
      score += 2;
    }
  });

  if (socialTendency === "low" && template.category === "social") {
    score -= 2;
  }

  if (socialTendency === "high" && template.category === "social") {
    score += 2;
  }

  score -= historyMap[template.category] || 0;
  return score;
}

function buildHistoryMap(history) {
  return history.reduce((accumulator, item) => {
    const nextAccumulator = accumulator;
    nextAccumulator[item.category] = (nextAccumulator[item.category] || 0) + 1;
    return nextAccumulator;
  }, {});
}

function getDailyAnchor(profile, history) {
  const safeHistory = history || [];
  const historyMap = buildHistoryMap(safeHistory.slice(-5));
  const ranked = shuffle(anchorTemplates).sort((a, b) => {
    return scoreAnchor(b, profile, historyMap) - scoreAnchor(a, profile, historyMap);
  });
  return ranked[0];
}

function getLocalSuggestions(profile, weatherTag) {
  const city = profile && profile.city ? profile.city : "你的城市";
  const interests = profile && profile.interests ? profile.interests : [];
  const activeWeather = weatherTag || "sunny";

  return localTemplates
    .filter((item) => item.weather.indexOf(activeWeather) > -1)
    .map((item, index) => {
      const interestMatch = item.tags.some((tag) => interests.indexOf(tag) > -1);
      return {
        id: item.id + "-" + index,
        title: city + " · " + item.title,
        type: item.type,
        description: item.description,
        reason: interestMatch ? "和你的兴趣更贴近" : "适合今天轻松出门",
        distance: (index + 1) + " km"
      };
    });
}

module.exports = {
  getDailyAnchor,
  getLocalSuggestions
};
