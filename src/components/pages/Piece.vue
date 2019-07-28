<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="panel p-3 d-flex flex-column align-items-center">
					<image-with-upload class="piece-image" :obj="piece" :model="'image'" />
          <field-text class="piece-title" :obj="piece" model="name"></field-text>
        </div>        
        <div class="panel p-3 my-3">
          <div class="d-flex align-items-center">
            <span class="field-label">Cost:</span>
            <field-text :obj="piece" model="cost"></field-text>
          </div>
        </div>
        <div class="panel p-3 my-3 d-flex flex-column">
          <h4 class="mb-1 d-inline-block">Stats</h4>
          
          <div class="d-flex align-items-center">
            <span class="field-label">Health:</span>
            <field-text :obj="piece.stats" model="health"></field-text>
          </div>
					
					<div class="d-flex align-items-center">
            <span class="field-label">Move Delay:</span>
            <field-text :obj="piece.stats" model="moveDelay"></field-text>
          </div>
          
          <div class="d-flex align-items-center">
            <span class="field-label">Attack Delay:</span>
            <field-text :obj="piece.stats" model="attackDelay"></field-text>
          </div>

					<div class="d-flex align-items-center">
            <span class="field-label">Base DMG:</span>
            <field-text :obj="piece.stats" model="baseDMG"></field-text>
          </div>

					<div class="d-flex align-items-center">
            <span class="field-label">Knock DMG:</span>
            <field-text :obj="piece.stats" model="knockDMG"></field-text>
          </div>

					<div class="d-flex align-items-center">
            <span class="field-label">Range:</span>
            <field-text :obj="piece.stats" model="range"></field-text>
          </div>

					<div class="d-flex align-items-center">
            <span class="field-label">Piercing:</span>
            <field-text :obj="piece.stats" model="piercing"></field-text>
          </div>
          

          <!-- <piece-stat-graph class="mt-3" :stats="piece.stats"></piece-stat-graph> -->
          <p v-if="isDefaultStats" class="default-stat-warning">! WARNING: DEFAULT STATS !</p>
        </div>
      </div>
      <div class="col-md-9">
        <div class="panel p-3">
          <div class="hover-reveal d-flex align-items-center">
            <h4>{{abilityLabel}}</h4>
            <span class="reveal" @click="onAddAbility">➕</span>
          </div>
          <div v-for="(ability, index) in piece.abilities" :key="index" class="mt-2 d-flex flex-row ">
            <!-- <div>
							<image-with-upload :obj="ability" :model="'image'" class="ability-image mr-2"/>
						</div> -->
						<div>
							<div class="hover-reveal">
								<field-text class="power-title d-inline-block" :obj="ability" model="name"></field-text>
								<span class="reveal delete" @click="deleteAbility(ability)">❌</span>
							</div>
							<field-text class="power-description" :obj="ability" model="description"></field-text>
							<div class="d-flex align-items-center">
								<span class="field-label" v-if="ability.cooldown">Cooldown:</span>
								<field-numerical :obj="ability" model="cooldown"></field-numerical>
							</div>
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
          <field-text class="notes w-100" :obj="piece" model="notes"></field-text>
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
import ImageWithUpload from "@/components/ImageWithUpload";
import CONSTANTS from "@/constants";
export default {
  components: {
    FieldText,
    FieldNumerical,
    FieldSelect,
    PieceStatGraph,
		PiecesDisplay,
		ImageWithUpload
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
      this.piece.abilities.push(JSON.parse(JSON.stringify(CONSTANTS.NEW_ABILITY)));
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
    }
  }
};
</script>

<style scoped>
/* TODO */
.piece-image {
  width: 100%;
  max-width: 256px;
  max-height: 256px;
}
.ability-image {
  width: 100%;
  max-width: 100px;
  max-height: 100px;
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

</style>
