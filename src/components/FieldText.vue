<template>
<div class="field hover-reveal">
  <span v-show="!focused">{{value}}</span>
  <input v-show="focused" v-model="value" @blur="onBlur" ref="fieldInput" @keyup.enter="onBlur">
  <span @click="onPencil" class="pencil reveal">✎</span>
</div>
</template>


<script>
import FieldMixin from "@/mixins/FieldMixin";
export default {
  mixins: [FieldMixin]
};
</script>
