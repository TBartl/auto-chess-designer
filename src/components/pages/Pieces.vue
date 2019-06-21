<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="panel p-3">
          <h3>Pieces</h3>
          <div class="inset-sub-panel mt-3 d-flex">
            <div class=" m-2 piece position-relative" 
                v-for="(piece, index) in schema.pieces" :key="index">
              <router-link :to="`/piece/${piece.name}`" class="d-flex align-items-center flex-column">
                <img :src="piece.image" :alt="piece.name">
                <p>{{piece.name}}</p>
              </router-link>
              <div class="delete-piece" @click="deletePiece(piece)">❌</div>
            </div>
            <div v-if="canCreateNew" class=" m-2 piece create-piece d-flex flex-column align-items-center" @click="addPiece">
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
.piece {
  cursor: pointer;
}
.piece img {
  width: 100px;
  height: 100px;
  border: 2px solid hsla(0, 0%, 100%, 0.1);
  transition: border 0.1s;
}
.piece p {
  font-size: 16px;
  color: hsla(0, 0%, 100%, 0.6);
  transition: color 0.1s;
}
.piece:hover img {
  border: 2px solid hsla(0, 0%, 100%, 0.9);
}
.piece:hover p {
  color: hsla(0, 0%, 100%, 0.9);
  text-decoration: none;
}

.create-piece img {
  opacity: 0.5;
  transition: opacity 0.1s;
}
.create-piece:hover img {
  opacity: 1;
}
.delete-piece {
  position: absolute;
  right: 1px;
  top: 1px;

  opacity: 0;
  transition: opacity 0.1s;
}
.piece:hover .delete-piece {
  opacity: 0.6;
}
.delete-piece:hover {
  opacity: 1 !important;
}
</style>

