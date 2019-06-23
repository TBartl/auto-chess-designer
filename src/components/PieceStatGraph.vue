<template>
<div>
  <svg class="w-100" :viewBox="'0 0 ' + (radius * 2 +  padding * 2 + ' ').repeat(2)">
    <g class="w-100">
      <polygon :points="polygonPoints"></polygon>
      <circle :cx="''+center" :cy="''+center" :r="''+radius/2"></circle>
      <circle :cx="''+center" :cy="''+center" :r="''+radius"></circle>
      <line v-for="(stat, index) in displayStats" :key="'line'+index" 
        :x1="''+center"
        :y1="''+center"
        :x2="''+stat.xMax"
        :y2="''+stat.yMax"
        stroke="#999"
      />
      <text v-for="(stat, index) in displayStats" :key="index" 
        :x="''+stat.xMax" :y="''+stat.yMax" text-anchor="middle">{{stat.label}}</text>
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
      return CONSTANTS.STAT_ORDER.map((stat, index) => {
        var statRange = CONSTANTS.STAT_RANGES[stat];
        var percent = Math.max(0,(this.stats[stat] - statRange.min) / (statRange.max - statRange.min));

        var angle = Math.PI * 2 / CONSTANTS.STAT_ORDER.length * index;
        var x = Math.sin(angle);
        var y =  -Math.cos(angle);

        var label = stat.replace(/([A-Z])/g, " $1");
        label = label.charAt(0).toUpperCase() + label.slice(1);
        return {
          xVal: x * percent * this.radius + this.center,
          yVal: y * percent * this.radius + this.center,
          xMax: x * this.radius + this.center,
          yMax: y * this.radius + this.center,
          label
        };
      });
    },
    polygonPoints() {
      return this.displayStats.map(stat => {
        return stat.xVal + "," + stat.yVal;
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
