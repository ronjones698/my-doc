<template>
  <ClaimHeader />
  <Claim
    v-for="visit in all_visits"
    :key="visit.visit_id"
    :insurer="visit.insurer_name"
    :visit_date="visit.created_at"
    :description="visit.description"
    :patient_name="visit.paitient_name"
    :visit_id="visit.visit_id"
    :purpose="visit.puporse"
  />
</template>
<script>
import Claim from "@/components/VisitDiv.vue";
import ClaimHeader from "@/components/VisitHeader.vue";

export default {
  components: {
    Claim,
    ClaimHeader,
  },
  computed: {
    organization_name() {
      console.log("org:", this.$store.state.authenticatedUser);
      return this.$store.state.authenticatedUser.organization_name;
    },
    all_visits() {
      if (this.$store.state.authenticatedUser.user_type == "Doctor") {
        return this.$store.state.visits.filter(
          (visit) =>
            visit.status == "pending" ||
            visit.status == "approved" ||
            visit.status == "rejected"
        );
      }
      return this.$store.state.visits;
    },
  },
  created() {
    this.$store.dispatch("getVisits", this.organization_name);
  },
};
</script>
<style scoped>
.User {
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  margin: 20px;
  padding: 10px;
  width: 97.5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.greeting {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 10px;
}
h1 {
  font-size: 18px;
  font-weight: bold;
}
p {
  color: grey;
  font-size: 18px;
}
</style>
<style>
.btn {
  background-color: #2f855a;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  cursor: pointer;
  width: 200px;
  margin: 20px 5px;
}
</style>
