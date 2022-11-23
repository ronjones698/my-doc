<template>
  <div class="new">
    <router-link to="/addvisit" class="btn">ADD NEW DOCTOR</router-link>
  </div>
  <div class="visits">
    <ViewCard />
    <ViewCard />
    <ViewCard />
    <ViewCard />
    <ViewCard />
    <ViewCard />
    <ViewCard />
  </div>
</template>

<script>
import ViewCard from "@/components/ViewCar.vue";
export default {
  components: {
    ViewCard,
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
