<template>
<div>
  <svg class="w-100" :viewBox="'0 0 ' + (radius * 2 +  padding * 2 + ' ').repeat(2)">
    <g class="w-100">
      <polygon :points="polygonPoints"></polygon>
      <circle :cx="''+center" :cy="''+center" :r="''+radius*1/3"></circle>
      <circle :cx="''+center" :cy="''+center" :r="''+radius*2/3"></circle>
      <circle :cx="''+center" :cy="''+center" :r="''+radius"></circle>
      <text v-for="(stat, index) in displayStats" :key="index" 
        :x="''+stat.x" :y="''+stat.y" text-anchor="middle">{{stat.label}}</text>
    </g>
  </svg>
</div>
</template>

<script>
import CONSTANTS from "@/constants";
export default {
  props: ["stats"],
  data() {
    return {
      radius: 50,
      padding: 15
    };
  },
  computed: {
    center() {
      return this.radius + this.padding;
    },
    displayStats() {
      return CONSTANTS.statOrder.map((stat, index) => {
        var x = 0;
        var y = -this.radius;
        var angle = Math.PI * 2 / CONSTANTS.statOrder.length * index;
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var tx = x * cos - y * sin + this.center;
        var ty = x * sin + y * cos + this.center;
        var label = stat.replace(/([A-Z])/g, " $1");
        label = label.charAt(0).toUpperCase() + label.slice(1);
        return {
          x: tx,
          y: ty,
          label
        };
      });
    },
    polygonPoints() {
      return this.displayStats.map(stat => {
        return stat.x + "," + stat.y;
      });
    }
  }
};
</script>

<style scoped>
polygon {
  fill: #3485c7;
  opacity: 0.75;
}

circle {
  fill: transparent;
  stroke: #999;
}

text {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 10px;
  fill: rgb(216, 216, 216);
}

label {
  display: inline-block;
  margin-left: 10px;
  width: 20px;
}

#raw {
  position: absolute;
  top: 0;
  left: 300px;
}
</style>
