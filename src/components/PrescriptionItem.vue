<template>
  <div v-if="res" class="temp">{{ Service }} - {{ res }}</div>
  <div v-else class="temp">{{ Service }}</div>
</template>
<script>
export default {
  props: {
    Service: {
      type: String,
    },
    res: {
      type: String,
    },
  },
};
</script>
<style scoped>
.temp {
  background-color: rgba(230, 240, 230, 10);
  border: 1px solid #2f855a;
}
</style>
