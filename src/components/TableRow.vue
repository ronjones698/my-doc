<template>
  <div @click="popUp(visit_id)" class="header">
    <h3>{{ patient_name }}</h3>
    <h3>{{ hospital_name }}</h3>
    <h3>{{ cost }}</h3>
    <h3>{{ insurer }}</h3>
    <h3>{{ visit_date }}</h3>
    <h3 class="status">{{ status }}</h3>
  </div>
</template>
<script>
export default {
  props: {
    patient_name: {
      type: String,
    },
    hospital_name: {
      type: String,
    },
    insurer: {
      type: String,
    },

    visit_date: {
      type: String,
    },
    visit_id: {
      type: String,
    },
    status: {
      type: String,
    },
    cost: {
      type: Number,
    },
  },
  methods: {
    popUp(url) {
      console.log(url);
      this.$store.dispatch("getVisit", url);
      this.$store.dispatch("getPopUp", url);
    },
  },
};
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 2px;
  padding: 5px 1px;
  border-bottom: 1px solid #2f855a;
  width: 100%;
  cursor: pointer;
}
h3 {
  font-size: 14px;
  width: 15%;
  font-weight: 600;
  opacity: 0.7;
}
.status {
  color: #2f855a;
}
</style>
