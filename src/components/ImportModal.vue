<template>
  <div class="p-3">
    <h4>Import Design File (.json)</h4>
    <input type="file" @change="onFileChange" accept="application/json">
  </div>
</template>

<script>
import Vue from "vue";
export default {
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var file = files[0];

      var reader = new FileReader();
      reader.onload = e => {
        this.$store.state.schema = JSON.parse(e.target.result);
        this.$emit("close");
      };
      reader.readAsText(file);
    }
  }
};
</script>
