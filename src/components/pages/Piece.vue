<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="panel p-3 d-flex flex-column align-items-center">
          <div class="position-relative piece-image-container mb-2" @click="uploadImage">
            <div class="upload-image w-100 h-100 align-items-center flex-column position-absolute justify-content-center">
              <h2>📁</h2>
              <h5>Upload</h5>
            </div>
            <img class="piece-image" :src="piece.image" :alt="piece.name">
          </div>
          <field-text class="piece-title" :obj="piece" model="name"></field-text>
        </div>        
        <div class="panel p-3 my-3">
          <div class="d-flex align-items-center">
            <span class="field-label">Cost:</span>
            <field-numerical :obj="piece" model="cost"></field-numerical>
          </div>
        </div>
        <div class="panel p-3 my-3 d-flex flex-column">
          <h4 class="mb-1 d-inline-block">Stats</h4>
          
          <div class="d-flex align-items-center">
            <span class="field-label">Health:</span>
            <field-numerical :obj="piece.stats" model="health"></field-numerical>
          </div>
          
          <div class="d-flex align-items-center">
            <span class="field-label">Armor:</span>
            <field-numerical :obj="piece.stats" model="armor"></field-numerical>
          </div>
          
          <div class="d-flex align-items-center">
            <span class="field-label">Resist:</span>
            <field-numerical :obj="piece.stats" model="resist"></field-numerical>
          </div>
          
          <div class="d-flex align-items-center">
            <span class="field-label">Damage:</span>
            <field-numerical :obj="piece.stats" model="damage"></field-numerical>
          </div>
          
          <div class="d-flex align-items-center">
            <span class="field-label">Attack Speed:</span>
            <field-numerical :obj="piece.stats" model="attackSpeed"></field-numerical>
          </div>

          <div class="d-flex align-items-center">
            <span class="field-label">Range:</span>
            <field-numerical :obj="piece.stats" model="range"></field-numerical>
          </div>

          <piece-stat-graph class="mt-3" :stats="piece.stats"></piece-stat-graph>
          <p v-if="isDefaultStats" class="default-stat-warning">! WARNING: DEFAULT STATS !</p>
        </div>
      </div>
      <div class="col-md-9">
        <div class="panel p-3">
          <div class="hover-reveal d-flex align-items-center">
            <h4>{{abilityLabel}}</h4>
            <span class="reveal" @click="onAddAbility">➕</span>
          </div>
          <div v-for="(ability, index) in piece.abilities" :key="index" class="mt-2">
            
            <div class="hover-reveal">
              <field-text class="power-title d-inline-block" :obj="ability" model="name"></field-text>
              <span class="reveal delete" @click="deleteAbility(ability)">❌</span>
            </div>
            <field-text class="power-description" :obj="ability" model="description"></field-text>
            <div class="d-flex align-items-center">
              <span class="field-label">Cooldown:</span>
              <field-numerical :obj="ability" model="cooldown"></field-numerical>
            </div>
          </div>
        </div>

        <div class="panel p-3 mt-3">
          <div class="hover-reveal d-flex align-items-center">
            <h4>{{synergyLabel}}</h4>
            <span class="reveal" @click="onAddSynergy">➕</span>
          </div>
          <div v-for="(synergyID, index) in piece.synergies" :key="index" class="mt-2">
            <div class="hover-reveal">
              <field-select class="power-title d-inline" :options="schema.synergies" :obj="piece.synergies" :model="index"></field-select>
              <span class="reveal delete" @click="deleteSynergy(synergyID)">❌</span>
            </div>
            <p v-for="(bonus, index) in getBonuses(synergyID)" :key="index" class="bonus">
              {{bonus.text}}
            </p>
            <div v-if="synergyID && getSynergyPieces(synergyID).length" >
              <p class="related-text mt-1">Related</p>
              <pieces-display :pieces="getSynergyPieces(synergyID)"/>
            </div>
            <hr class="mb-1 mt-3" v-if="index != piece.synergies.length - 1"/>
          </div>
        </div>

        <div class="panel p-3 mt-3">
          <h4>Notes</h4>
          <field-text class="notes" :obj="piece" model="notes"></field-text>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import FieldText from "@/components/FieldText";
import FieldNumerical from "@/components/FieldNumerical";
import FieldSelect from "@/components/FieldSelect";
import PieceStatGraph from "@/components/PieceStatGraph";
import PiecesDisplay from "@/components/PiecesDisplay";
import UploadImageModal from "@/components/UploadImageModal";
import CONSTANTS from "@/constants";
export default {
  components: {
    FieldText,
    FieldNumerical,
    FieldSelect,
    PieceStatGraph,
    PiecesDisplay
  },
  data() {
    var name = this.$route.params.name;
    var piece = this.$store.state.schema.pieces.find(
      piece => piece.name == name
    );
    return {
      id: piece.id
    };
  },
  computed: {
    ...mapState(["schema"]),
    piece() {
      return this.schema.pieces.find(piece => piece.id == this.id);
    },
    abilityLabel() {
      var numAbilities = this.piece.abilities.length;
      if (numAbilities == 0) return "No ability";
      if (numAbilities == 1) return "Ability";
      return "Abilities";
    },
    synergyLabel() {
      var numSynergies = this.piece.synergies.length;
      if (numSynergies == 0) return "No synergies";
      if (numSynergies == 1) return "Synergy";
      return "Synergies";
    },
    isDefaultStats() {
      return (
        JSON.stringify(this.piece.stats) ==
        JSON.stringify(CONSTANTS.NEW_PIECE.stats)
      );
    }
  },
  methods: {
    onAddAbility() {
      this.piece.abilities.push(CONSTANTS.NEW_ABILITY);
    },
    onAddSynergy() {
      this.piece.synergies.push(undefined);
    },
    getBonuses(id) {
      var synergy = this.schema.synergies.find(c => c.id == id);
      if (!synergy) return [];
      return synergy.bonuses;
    },
    deleteAbility(ability) {
      this.piece.abilities.splice(this.piece.abilities.indexOf(ability), 1);
    },
    deleteSynergy(synergy) {
      this.piece.synergies.splice(this.piece.synergies.indexOf(synergy), 1);
    },
    getSynergyPieces(synergyID) {
      return this.schema.pieces
        .filter(piece => piece.synergies.includes(synergyID))
        .filter(piece => piece.id != this.id);
    },
    uploadImage() {
      this.$modal.show(
        UploadImageModal,
        { piece: this.piece },
        { height: "auto" }
      );
    }
  }
};
</script>

<style scoped>
.piece-image {
  width: 100%;
  max-width: 256px;
  max-height: 256px;
  border-radius: 50%;
}
.piece-title {
  font-size: 24px;
}
.field-label {
  margin-right: 8px;
  color: hsla(0, 0%, 100%, 0.5);
}

.power {
  font-size: 24px;
}

.power-title {
  font-weight: bold;
  display: block;
}
.power-description {
  color: hsla(0, 0%, 100%, 0.7);
  display: block;
}

.delete {
  position: relative;
  right: -20px !important;
}

.related-text {
  color: hsla(0, 0%, 100%, 0.4);
  font-size: 16px;
  font-weight: bold;
}

hr {
  border: none;
  height: 3px;
  background-color: hsla(0, 0%, 0%, 0.15);
}

.notes {
  margin-top: 6px;
  color: hsla(0, 0%, 100%, 0.7);
}

.default-stat-warning {
  color: hsla(0, 75%, 50%, 0.6);
  text-align: center;
  font-size: 12px;
}

.upload-image {
  display: none;
  background: hsla(0, 0%, 0%, 0.75);
  border-radius: 100%;
}
.piece-image-container:hover {
  cursor: pointer;
}
.piece-image-container:hover .upload-image {
  display: flex;
}
.piece-image-container:hover .upload-image {
  display: flex;
}
</style>
