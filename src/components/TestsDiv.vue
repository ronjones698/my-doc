<template>
  <div class="card">
    <div class="details">
      <h1>Tets Conducted</h1>
      <div class="prescriptions">
        <ViewCard />
        <ViewCard />
        <ViewCard />
        <ViewCard />
        <ViewCard />
        <ViewCard />
        <ViewCard />
      </div>
    </div>
  </div>
</template>

<script>
import ViewCard from "./ViewCar.vue";
export default {
  components: {
    ViewCard,
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
  align-items: center;
  transition: 0.3s ease;
}
h1 {
  font-size: 20px;
  margin: 10px;
  font-weight: 600;
}
.details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.prescriptions {
  display: flex;
  padding: 10px;
  max-width: 1200px;
  overflow-y: scroll;
}
</style>
