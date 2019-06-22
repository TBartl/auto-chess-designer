<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="panel p-3">
          <h3>Pieces</h3>
          <pieces-display class="mt-2" :has-actions="true" :pieces="schema.pieces"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PiecesDisplay from "@/components/PiecesDisplay";
export default {
  components: { PiecesDisplay },
  computed: {
    ...mapState(["schema"])
  }
};
</script>

