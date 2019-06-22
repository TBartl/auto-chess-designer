<template>
  <div id="app">
    <div class="header w-100 p-3">
      <div class="container d-flex justify-content-between align-items-center">
        <img src="./assets/logo.svg">
        <div>
          <router-link v-for="(route, index) in routes" :key="index" :to="'/' + route">{{route | capitalize}}</router-link>
        </div>
        <div class="d-none d-md-block">
          <a @click="onImport()" href="javascript:void(0)">Import</a>
          <a @click="onExport()" class="mr-0" href="javascript:void(0)">Export</a>
        </div>
      </div>
    </div>
    <router-view class="mt-4"></router-view>
    <modals-container></modals-container>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import { mapState } from "vuex";
import ImportModal from "@/components/ImportModal";
export default {
  name: "app",
  data() {
    return {
      routes: ["pieces", "synergies"]
    };
  },
  computed: {
    ...mapState(["schema"])
  },
  methods: {
    onExport() {
      var blob = new Blob([JSON.stringify(this.schema)], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, "test.json");
    },
    onImport() {
      this.$modal.show(ImportModal, {}, { height: "auto" });
    }
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
  opacity: 0.6;
  font-size: 20px;
  margin: 0px 28px;
  transition: opacity 0.1s;
}
.header a:hover {
  opacity: 1;
}
</style>
