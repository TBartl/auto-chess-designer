<template>
  <div class="container">
    <div class="row">
      <div class="col-12 panel">
        <h3 class="my-2">Pieces</h3>
        <div class="inset-sub-panel my-3 d-flex">
          <div class=" m-2 piece d-flex flex-column align-items-center" v-for="(piece, index) in schema.pieces" :key="index">
            <img :src="piece.image" :alt="piece.name">
            <p>{{piece.name}}</p>
          </div>
          <div class=" m-2 piece d-flex flex-column align-items-center">
            <img src="@/assets/add-new.svg" alt="Add new">
            <p>Create new</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["schema"])
  }
};
</script>

<style scoped>
.piece {
  cursor: pointer;
}
.piece img {
  width: 90px;
  height: 90px;
  border: 2px solid hsla(0, 0%, 100%, 0.1);
}
.piece p {  
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.6);
}
.piece:hover img {
  border: 2px solid hsla(0, 0%, 100%, 0.9);
}
.piece:hover p { 
  color: hsla(0, 0%, 100%, 0.9);
}
</style>

