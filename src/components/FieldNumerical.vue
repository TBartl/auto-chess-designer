<template>
<div class="field">
  <span v-show="!focused">{{value}}</span>
  <input v-show="focused" v-model="value" @blur="onBlur" ref="fieldInput" @keyup.enter="onBlur" type="number">
  <span @click="onPencil" class="pencil">✎</span>
</div>
</template>


<script>
import FieldMixin from "@/mixins/FieldMixin";
export default {
  mixins: [FieldMixin]
};
</script>
