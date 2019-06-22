<template>
<div class="inset-sub-panel d-flex flex-wrap">
  <div class=" m-2 select position-relative hover-reveal" 
      v-for="(piece, index) in pieces" :key="index">
    <router-link :to="`/piece/${piece.name}`" class="d-flex align-items-center flex-column">
      <img :src="piece.image" :alt="piece.name">
      <p>{{piece.name}}</p>
    </router-link>
    <div v-if="hasActions" class="delete-piece reveal" @click="deletePiece(piece)">❌</div>
  </div>
  <div v-if="canCreateNew && hasActions" class=" m-2 select create d-flex flex-column align-items-center" @click="addPiece">
    <img src="@/assets/add-new.svg" alt="Add new">
    <p>New Piece</p>
  </div>
</div>
</template>

<script>
import { generateUID } from "@/utils";
import CONSTANTS from "@/constants";
export default {
  props: ["hasActions", "pieces"],
  computed: {
    canCreateNew() {
      return !this.pieces.find(
        piece => piece.name == CONSTANTS.NEW_PIECE.name
      );
    }
  },
  methods: {
    addPiece() {
      var copiedPiece = JSON.parse(JSON.stringify(CONSTANTS.NEW_PIECE));
      copiedPiece.id = generateUID();
      this.pieces.push(copiedPiece);
    },
    deletePiece(piece) {
      this.pieces.splice(this.pieces.indexOf(piece), 1);
    }
  }
};
</script>

<style scoped>
.delete-piece {
  position: absolute;
  right: 1px;
  top: 1px;
}
.inset-sub-panel {
  background-color: #252c50;
  box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.1),
    inset 0 15px 40px rgba(0, 0, 0, 0.05);
}
</style>
