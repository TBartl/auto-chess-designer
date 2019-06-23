<template>
  <div class="p-3">
    <h4>Import Image</h4>
    <input class="mt-2" type="file" @change="onFileChange" accept="image/*">
    <p class="hint">Or, paste directly from your clipboard.</p>
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
      reader.onloadend = this.onImageLoad;
      reader.readAsDataURL(file);
    },
    onImageLoad(event) {
      return this.scaleImageToStr(event.target.result, 256, 256);
    },
    scaleImageToStr(image, width, height) {
      var canvasTmp = this.$refs.canvas;

      var context = canvasTmp.getContext("2d");

      var imageElement = new Image();
      imageElement.onload = () => {
        context.drawImage(imageElement, 0, 0, width, height);

        //Most browsers support an extra option for: toDataURL(mime type, quality) where quality = 0-1 double.
        //This is not available through this java library but might work with elemental version?
        var tempStr = canvasTmp.toDataURL("image/jpeg", 0.7);
        this.piece.image = tempStr;
        this.$emit("close");
      };
      imageElement.src = image;
    },
    onPaste() {
      // use event.originalEvent.clipboard for newer chrome versions
      var items = (event.clipboardData || event.originalEvent.clipboardData)
        .items;
      // find pasted image among pasted items
      var blob = null;
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") == 0) {
          blob = items[i].getAsFile();
        }
      }
      // load image if there is a pasted image
      if (blob == null) return;
      var reader = new FileReader();
      reader.onloadend = this.onImageLoad;
      reader.readAsDataURL(blob);
    }
  },
  mounted() {
    document.addEventListener("paste", this.onPaste);
  },
  beforeDestroy() {
    document.removeEventListener("paste", this.onPaste);
  }
};
</script>

<style scoped>
.hint {
  color: hsla(0, 0%, 100%, 0.5);
}
</style>
