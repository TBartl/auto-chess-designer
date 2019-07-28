<template>
  <div class="position-relative image-container mb-2" @click="uploadImage">
    <div
      class="upload-image w-100 h-100 align-items-center flex-column position-absolute justify-content-center"
    >
      <h2>📁</h2>
      <h5>Upload</h5>
    </div>
    <img class="w-100" :src="obj[model]" />
  </div>
</template>

<script>
import UploadImageModal from "@/components/UploadImageModal";
export default {
  props: ["obj", "model"],
  methods: {
    uploadImage() {
      this.$modal.show(
        UploadImageModal,
        { obj: this.obj, model: this.model },
        { height: "auto" }
      );
    }
  }
};
</script>


<style scoped>
.upload-image {
  display: none;
  background: hsla(0, 0%, 0%, 0.75);
}
.image-container:hover {
  cursor: pointer;
}
.image-container:hover .upload-image {
  display: flex;
}
.image-container:hover .upload-image {
  display: flex;
}
</style>
