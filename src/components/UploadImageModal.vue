<template>
  <div class="p-3">
    <h4>Import Image</h4>
    <input type="file" @change="onFileChange" accept="image/*">
    <canvas class="d-none" width="256" height="256" ref="canvas"></canvas>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: ["piece"],
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var file = files[0];

      var reader = new FileReader();
      reader.onloadend = e => {
        this.scaleImageToStr(reader.result, 256, 256);
      };
      reader.readAsDataURL(file);
    },
    scaleImageToStr(image, width, height) {
      var canvasTmp = this.$refs.canvas;

      var context = canvasTmp.getContext("2d");

      var imageElement = new Image();
      imageElement.onload = () => {
        context.drawImage(imageElement, 0, 0, width, height);

        //Most browsers support an extra option for: toDataURL(mime type, quality) where quality = 0-1 double.
        //This is not available through this java library but might work with elemental version?
        var tempStr = canvasTmp.toDataURL("image/jpeg", .7);
        this.piece.image = tempStr;
        this.$emit("close");
      };
      imageElement.src = image;
    }
  }
};
</script>
