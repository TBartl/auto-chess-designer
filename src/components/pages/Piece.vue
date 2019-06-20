<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="panel p-3 d-flex flex-column align-items-center">
          <img class="piece-image mb-2" :src="piece.image" :alt="piece.name">
          <h3>{{piece.name}}</h3>
        </div>
        <div class="panel p-3 my-3 d-flex flex-column">
          <h5>Stats</h5>
        </div>
      </div>
      <div class="col-md-8">
        <div class="panel p-3">
          <p>Hey</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["schema"]),
    piece() {
      var name = this.$route.params.name;
      return this.schema.pieces.find(piece => piece.name == name);
    }
  }
};
</script>

<style scoped>
.piece-image {
  max-width: 150px;
  border-radius: 50%;
}
</style>
