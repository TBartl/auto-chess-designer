<template>
<div class="field hover-reveal">
  <span v-show="!focused">{{displayValue}}</span>
  <!-- <input v-model="value" @blur="onBlur" @keyup.enter="onBlur"> -->
  <select v-show="focused" v-model="value" ref="fieldSelect" >
    <option :value="undefined">Unset</option>
    <option v-for="option in options" :key=option.id :value="option.id">
      {{ option.name }}
    </option>
  </select>
  <span @click="onPencil" class="pencil reveal" ref="pencil">✎</span>
</div>
</template>


<script>
import FieldMixin from "@/mixins/FieldMixin";
import { mapState } from "vuex";
export default {
  mixins: [FieldMixin],
  props: ["options"],
  computed: {
    ...mapState(["schema"]),
    displayValue() {
      if (!this.value) return "Unset";
      var option = this.options.find(option => option.id == this.value);
      if (!option) return "Unset";
      return option.name;
    }
  },
  mounted() {
    document.addEventListener("click", this.onClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
  },
  methods: {
    onClick(event) {
      if (event.target == this.$refs.pencil) return;
      if (event.target == this.$refs.fieldSelect) return;
      this.focused = false;
    }
  },
  watch: {
    value() {
      this.focused = false;
    }
  }
};
</script>
