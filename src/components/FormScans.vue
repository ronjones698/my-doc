<template>
  <div class="card">
    <h1>Claim Form Scans</h1>
    <div class="images">
      <img
        @click="popUp(form.imageUrl)"
        v-for="form in form_scans"
        :key="form.id"
        :src="form.imageUrl"
      />
    </div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";

export default {
  computed: {
    visit_id() {
      return this.$store.state.visit.visit_id;
    },
    form_scans() {
      return this.$store.state.forms;
    },
  },
  created() {
    const route = useRoute();
    if (route.params.visit_id) {
      this.$store.dispatch("getFormScans", route.params.visit_id);
    } else {
      this.$store.dispatch("getFormScans", this.visit_id);
    }
  },
  methods: {
    popUp(url) {
      this.$store.dispatch("getPopUp", url);
    },
  },
};
</script>
<style scoped>
.card {
  width: 98%;
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  margin: 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.3s ease;
}
h1 {
  font-size: 20px;
  margin: 10px;
  font-weight: 600;
  align-self: flex-start;
}
.images > img {
  width: 14%;
  height: 7%;
  margin-left: 20px;
  cursor: pointer;
}
.images > img:hover {
  transform: scale(1.2);
}
.images {
  display: flex;
  margin: 10px;
  transition: 500ms ease-in-out;
}
</style>
