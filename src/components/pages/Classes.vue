<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="panel p-3">
          <h3>Classes</h3>
        </div>
      </div>
      <div class="col-md-6" v-for="(clas, index) in schema.classes" :key="index">
        <div class="panel mt-3 p-3">
          <div class="hover-reveal flex align-items-center">
            <field-text class="class-title" :obj="clas" model="name"></field-text>
            <span class="reveal delete" @click="deleteClass(clas)">❌</span>
          </div>
          
          <div class="hover-reveal d-flex align-items-center">
            <p class="bonus-text mt-2">Bonuses</p>
            <span class="reveal" @click="addBonus(clas)">➕</span>
          </div>
          
          
          <div class="hover-reveal flex align-items-center align-self-center" v-for="(bonus, index) in clas.bonuses" :key="index">
            <field-text class="bonus" :obj="clas.bonuses[index]" model="text"></field-text>
            <span class="reveal delete" @click="deleteBonus(clas, bonus)">❌</span>
          </div>

          <div class="inset-sub-panel mt-3 d-flex">
            TODO
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-2 offset-lg-5 col-md-4 offset-md-4">
        <div class="panel mt-3 p-3">
          <div class="select create d-flex flex-column align-items-center" @click="addClass">
            <img src="@/assets/add-new.svg" alt="Add new">
            <p>New class</p>
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
import CONSTANTS from "@/constants";
export default {
  components: { FieldText },
  computed: {
    ...mapState(["schema"])
  },
  methods: {
    addClass() {
      var copiedClass = JSON.parse(JSON.stringify(CONSTANTS.NEW_CLASS));
      copiedClass.id = generateUID();
      this.schema.classes.push(copiedClass);
    },
    deleteClass(clas) {
      this.schema.classes.splice(this.schema.classes.indexOf(clas), 1);
    },
    addBonus(clas) {
      clas.bonuses.push(JSON.parse(JSON.stringify(CONSTANTS.NEW_BONUS)));
    },
    deleteBonus(clas, bonus) {
      clas.bonuses.splice(clas.bonuses.indexOf(bonus), 1);
    }
  }
};
</script>


<style scoped>
.class-title {
  font-size: 22px;
}
.bonus-text {
  color: hsla(0, 0%, 100%, 0.6);
}
.delete {
  position: relative;
  right: -20px !important;
}
</style>
