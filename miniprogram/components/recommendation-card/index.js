Component({
  properties: {
    item: {
      type: Object,
      value: null
    }
  },

  methods: {
    handleTap() {
      this.triggerEvent("tapcard", this.properties.item);
    }
  }
});
