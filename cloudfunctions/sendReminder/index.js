exports.main = async (event) => {
  return {
    success: true,
    enabled: !!(event && event.enabled),
    message: event && event.enabled ? "Reminder scheduled" : "Reminder disabled"
  };
};
