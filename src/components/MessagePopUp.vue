<template>
  <div class="popup">
    <slot />
    <h1 @click="close">X</h1>
  </div>
</template>
<script>
export default {
  methods: {
    close() {
      this.$store.commit("closePopUp");
    },
  },
};
</script>

<style scoped>
.popup {
  width: 400px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(230, 240, 230, 10);
  border-left: 5px solid #2f855a;
  position: fixed;
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h1 {
  cursor: pointer;
  color: gray;
  font-weight: 800;
  font-size: 15px;
  margin-left: auto;
  padding: 5px;
  color: #2f855a;
}
</style>
