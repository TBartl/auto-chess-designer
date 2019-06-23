<template>
<div class="inset-sub-panel d-flex flex-wrap">
  <div class=" m-2 select position-relative hover-reveal" 
      v-for="(piece, index) in sortedPieces" :key="index">
    <router-link :to="`/piece/${piece.name}`" class="d-flex align-items-center flex-column">
      <div class="position-relative">
        <span class="synergies">{{getSynergyIcons(piece)}}</span>
        <img :src="piece.image" :alt="piece.name" :style="getImageStyle(piece)">
      </div>
      <p class="piece-name">{{piece.name}}</p>
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
import { mapState } from "vuex";
export default {
  props: ["hasActions", "pieces"],
  computed: {
    ...mapState(["schema"]),
    canCreateNew() {
      return !this.pieces.find(piece => piece.name == CONSTANTS.NEW_PIECE.name);
    },
    sortedPieces() {
      return this.pieces.sort((a, b) => {
        if (a.name == CONSTANTS.NEW_PIECE.name) return 1;
        if (b.name == CONSTANTS.NEW_PIECE.name) return -1;
        var costDiff = a.cost - b.cost;
        if (costDiff != 0) return costDiff;
        return a.name.localeCompare(b.name);
      });
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
    },
    getImageStyle(piece) {
      var borderColor = CONSTANTS.COST_COLORS["" + piece.cost];
      if (!borderColor) return {};
      return {
        border: "5px solid " + borderColor
      };
    },
    getSynergyIcons(piece) {
      // Get the real synergies from the ids stored in the piece
      var realSynergies = piece.synergies.map(synergyID => {
        return this.schema.synergies.find(synergy => synergy.id == synergyID);
      });

      // Remove undefined synergies
      realSynergies = realSynergies.filter(synergy => synergy);

      // Sort in the order that the synergies are listed on the synergy page
      var sortedSynergies = realSynergies.sort((a, b) => {
        var aIndex = this.schema.synergies.indexOf(a);
        var bIndex = this.schema.synergies.indexOf(b);
        return aIndex - bIndex;
      });

      // Get the first character from all the synergies 
      var icons = sortedSynergies.map(synergy => synergy.name.substring(0, 2));
      return icons.join("");
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
.synergies {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 4px;
  color: white !important;
  text-align: center;
  font-size: 14px;
}
.piece-name {
  max-width: 100px;
  text-align: center;
}
</style>
