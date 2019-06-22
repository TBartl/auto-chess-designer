<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="panel p-3">
          <h3>Pieces</h3>
          <div class="inset-sub-panel mt-3 d-flex">
            <div class=" m-2 select position-relative hover-reveal" 
                v-for="(piece, index) in schema.pieces" :key="index">
              <router-link :to="`/piece/${piece.name}`" class="d-flex align-items-center flex-column">
                <img :src="piece.image" :alt="piece.name">
                <p>{{piece.name}}</p>
              </router-link>
              <div class="delete-piece reveal" @click="deletePiece(piece)">❌</div>
            </div>
            <div v-if="canCreateNew" class=" m-2 select create d-flex flex-column align-items-center" @click="addPiece">
              <img src="@/assets/add-new.svg" alt="Add new">
              <p>New piece</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { generateUID } from "@/utils";
import CONSTANTS from "@/constants";
export default {
  computed: {
    ...mapState(["schema"]),
    canCreateNew() {
      return !this.schema.pieces.find(
        piece => piece.name == CONSTANTS.NEW_PIECE.name
      );
    }
  },
  methods: {
    addPiece() {
      var copiedPiece = JSON.parse(JSON.stringify(CONSTANTS.NEW_PIECE));
      copiedPiece.id = generateUID();
      this.schema.pieces.push(copiedPiece);
    },
    deletePiece(piece) {
      this.schema.pieces.splice(this.schema.pieces.indexOf(piece), 1);
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
</style>

