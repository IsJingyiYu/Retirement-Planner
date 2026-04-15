Component({
  properties: {
    primaryText: {
      type: String,
      value: "确认"
    },
    secondaryText: {
      type: String,
      value: ""
    }
  },

  methods: {
    handlePrimary() {
      this.triggerEvent("primarytap");
    },

    handleSecondary() {
      this.triggerEvent("secondarytap");
    }
  }
});
