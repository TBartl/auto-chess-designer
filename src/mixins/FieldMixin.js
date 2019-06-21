import Vue from "vue";
export default {
  props: ["obj", "model", "type"],
  data() {
    return {
      focused: false
    };
  },
  computed: {
    value: {
      cached: false,
      get() {
        return this.obj[this.model];
      },
      set(val) {
        Vue.set(this.obj, this.model, val);
      }
    }
  },
  methods: {
    onPencil() {
      this.focused = true;
      this.$nextTick(() => {
        this.$refs.fieldInput.focus();
      });
    },
    onBlur() {
      this.focused = false;
    }
  }
};
