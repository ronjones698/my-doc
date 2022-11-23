<template>
  <div class="new">
    <router-link to="/addhospital" class="btn">ADD NEW HOSPITAL</router-link>
  </div>
  <div class="visits">
    <ViewCard
      v-for="hospital in hospitals"
      :key="hospital.id"
      :header="hospital.hospital_name"
      route="Hospital"
      :user_id="hospital.hospital_id"
    />
  </div>
</template>

<script>
import ViewCard from "@/components/ViewCar.vue";
import { setRoute } from "@/components/state";
export default {
  components: {
    ViewCard,
  },
  computed: {
    hospitals() {
      return this.$store.state.hospitals;
    },
  },
  created() {
    this.on_load_handler();
  },
  methods: {
    on_load_handler() {
      setRoute("/hospitaldetails");
      this.$store.dispatch("getHospitals");
    },
  },
};
</script>

<style scoped>
.visits {
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.new {
  padding: 10px;
  display: flex;
  align-items: flex-end;
}
</style>
