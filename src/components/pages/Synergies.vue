<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="panel p-3">
          <h3>Synergies</h3>
        </div>
      </div>
      <div class="col-md-6" v-for="(synergy, index) in schema.synergies" :key="index">
        <div class="panel mt-3 p-3 position-relative">
          <div v-if="checkShowArrow(synergy, 'left')" @click="moveSynergy(synergy, 'left')" class="arrow left" >⬅</div>
          <div v-if="checkShowArrow(synergy, 'right')" @click="moveSynergy(synergy, 'right')" class="arrow right" >➡</div>
          <div class="hover-reveal flex align-items-center">
            <field-text class="synergy-title" :obj="synergy" model="name"></field-text>
            <span class="reveal delete" @click="deleteSynergy(synergy)">❌</span>
          </div>
          
          <div class="hover-reveal d-flex align-items-center">
            <p class="bonus-text mt-2">{{getBonusesText(synergy)}}</p>
            <span class="reveal" @click="addBonus(synergy)">➕</span>
          </div>
          
          
          <div class="hover-reveal flex align-items-center align-self-center" v-for="(bonus, index) in synergy.bonuses" :key="index">
            <field-text class="bonus" :obj="synergy.bonuses[index]" model="text"></field-text>
            <span class="reveal delete" @click="deleteBonus(synergy, bonus)">❌</span>
          </div>
          <pieces-display class="mt-2" :pieces="getSynergyPieces(synergy)"/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-2 offset-lg-5 col-md-4 offset-md-4">
        <div class="panel mt-3 p-3">
          <div class="select create d-flex flex-column align-items-center" @click="addSynergy">
            <img src="@/assets/add-new.svg" alt="Add new">
            <p>New synergy</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { generateUID } from "@/utils";
import FieldText from "@/components/FieldText";
import PiecesDisplay from "@/components/PiecesDisplay";
import CONSTANTS from "@/constants";
export default {
  components: { FieldText, PiecesDisplay },
  computed: {
    ...mapState(["schema"])
  },
  methods: {
    addSynergy() {
      var copiedSynergy = JSON.parse(JSON.stringify(CONSTANTS.NEW_SYNERGY));
      copiedSynergy.id = generateUID();
      this.schema.synergies.push(copiedSynergy);
    },
    deleteSynergy(synergy) {
      this.schema.synergies.splice(this.schema.synergies.indexOf(synergy), 1);
    },
    addBonus(synergy) {
      synergy.bonuses.push(JSON.parse(JSON.stringify(CONSTANTS.NEW_BONUS)));
    },
    deleteBonus(synergy, bonus) {
      synergy.bonuses.splice(synergy.bonuses.indexOf(bonus), 1);
    },
    getSynergyPieces(synergy) {
      return this.schema.pieces.filter(piece =>
        piece.synergies.includes(synergy.id)
      );
    },
    checkShowArrow(synergy, dir) {
      var index = this.schema.synergies.indexOf(synergy);
      if (dir == "left") {
        return index != 0;
      } else {
        return index != this.schema.synergies.length - 1;
      }
    },
    moveSynergy(synergy, dir) {
      var from = this.schema.synergies.indexOf(synergy);
      var to = dir == "left" ? from - 1 : from + 1;
      this.schema.synergies.splice(
        to,
        0,
        this.schema.synergies.splice(from, 1)[0]
      );
    },
    getBonusesText(synergy) {
      if (synergy.bonuses.length == 0) return "No bonuses";
      if (synergy.bonuses.length == 1) return "Bonus";
      return "Bonuses";
    }
  }
};
</script>


<style scoped>
.synergy-title {
  font-size: 22px;
}
.bonus-text {
  color: hsla(0, 0%, 100%, 0.6);
}
.delete {
  position: relative;
  right: -20px !important;
}
.arrow {
  position: absolute;
  top: -2px;
  opacity: 0.05;
  transition: opacity 0.15s;
}
.arrow.left {
  left: 5px;
}
.arrow.right {
  right: 5px;
}
.arrow:hover {
  cursor: pointer;
  opacity: 1;
}
</style>
