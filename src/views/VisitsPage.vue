<template>
  <div class="new">
    <router-link to="/addvisit" class="btn">ADD NEW USER</router-link>
  </div>
  <div class="visits">
    <ViewCard
      v-for="user in users"
      :key="user.id"
      :header="user.first_name"
      :extra="user.second_name"
      :route="user.user_type"
      :user_id="user.identification_number"
      :image_url="user.imageUrl"
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
    users() {
      return this.$store.state.users;
    },
    organization() {
      console.log(this.$store.state.authenticatedUser.organization_name);
      return this.$store.state.authenticatedUser.organization_name;
    },
  },
  created() {
    setRoute("/details");
    this.$store.dispatch("getUsers", this.organization);
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
