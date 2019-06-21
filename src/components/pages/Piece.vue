<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="panel p-3 d-flex flex-column align-items-center">
          <img class="piece-image mb-2" :src="piece.image" :alt="piece.name">
          <field-text class="piece-title" :obj="piece" model="name"></field-text>
        </div>        
        <div class="panel p-3 my-3">
          <div class="d-flex align-items-center">
            <span class="field-label">Cost:</span>
            <field-numerical :obj="piece" model="cost"></field-numerical>
          </div>
        </div>
        <div class="panel p-3 my-3 d-flex flex-column">
          <h4 class="mb-1">Stats</h4>
          
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

        </div>
      </div>
      <div class="col-md-9">
        <div class="panel p-3">
          <div class="hover-reveal d-flex align-items-center">
            <h4>{{abilityLabel}}</h4>
            <span class="reveal" @click="onAddAbility">➕</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import FieldText from "@/components/FieldText";
import FieldNumerical from "@/components/FieldNumerical";
import PieceStatGraph from "@/components/PieceStatGraph";
import CONSTANTS from "@/constants";
export default {
  components: { FieldText, FieldNumerical, PieceStatGraph },
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
      if (numAbilities == 0) return "No abilities";
      if (numAbilities > 1) return "Abilities";
      return "Ability";
    }
  },
  methods: {
    onAddAbility() {
      this.piece.abilities.push(CONSTANTS.DEFAULT_ABILITY);
    }
  }
};
</script>

<style scoped>
.piece-image {
  width: 100%;
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
</style>
