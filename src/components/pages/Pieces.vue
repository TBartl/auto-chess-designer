<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="panel p-3">
          <h3>Pieces</h3>
          <div class="inset-sub-panel mt-3 d-flex">
            <router-link :to="`/piece/${piece.name}`" class=" m-2 piece d-flex flex-column align-items-center" v-for="(piece, index) in schema.pieces" :key="index">
              <img :src="piece.image" :alt="piece.name">
              <p>{{piece.name}}</p>
            </router-link>
            <div class=" m-2 piece create-piece d-flex flex-column align-items-center">
              <img src="@/assets/add-new.svg" alt="Add new">
              <p>Create new</p>
            </div>
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
  transition: border .1s;
}
.piece p {  
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.6);
  transition: color .1s;
}
.piece:hover img {
  border: 2px solid hsla(0, 0%, 100%, 0.9);
}
.piece:hover p { 
  color: hsla(0, 0%, 100%, 0.9);
  text-decoration: none;
}

.create-piece img {
  opacity: .5;
  transition: opacity .1s;
}
.create-piece:hover img {
  opacity: 1;
}
</style>

