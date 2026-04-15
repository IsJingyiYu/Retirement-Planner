Component({
  properties: {
    anchor: {
      type: Object,
      value: null
    }
  },

  methods: {
    handleComplete() {
      this.triggerEvent("complete");
    },

    handleSwap() {
      this.triggerEvent("swap");
    }
  }
});
