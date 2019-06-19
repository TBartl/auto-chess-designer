<template>
  <div id="app">
    <div class="header w-100 p-3">
      <div class="container d-flex justify-content-between align-items-center">
        <img src="./assets/logo.svg">
        <div>
          <a v-for="(route, index) in routes" :key="index" :href="'/' + route">{{route | capitalize}}</a>
        </div>
        <div>
          <a href="javascript:void(0)">Import</a>
          <a class="mr-0" href="javascript:void(0)">Export</a>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      routes: ["pieces", "classes", "races"]
    };
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style>
#app {
  background-color: #202841;
  font-family: "Tahoma", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
</style>

<style scoped>
.header {
  background: rgb(48, 54, 109);
  background: linear-gradient(
    90deg,
    rgba(48, 54, 109, 1) 0%,
    rgba(34, 44, 83, 1) 100%
  );
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 15px 40px rgba(0, 0, 0, 0.05);
}
.header img {
  height: 32px;
}
.header a {
  color: white;
  text-decoration: none;
  opacity: .6;
  font-size: 20px;
  margin: 0px 28px;
  transition: opacity .1s;
}
.header a:hover {
  opacity: 1;
}
</style>
