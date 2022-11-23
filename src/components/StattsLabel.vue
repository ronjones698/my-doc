<template>
  <div class="label">
    <font-awesome-icon class="icons" :icon="icon" />
    <div class="detail">
      <h2>{{ digit }}</h2>
      <p>{{ tittle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },
    tittle: {
      type: String,
    },
    digit: {
      type: String,
    },
    url: {
      type: String,
    },
  },
};
</script>
<style scoped>
.label {
  width: 33.3%;
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  margin-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 5px;
}
.label:hover {
  background: rgba(230, 240, 230, 10);
}
.icons {
  width: 50px;
}
h2 {
  font-size: 20px;
  font-weight: bolder;
  color: #2f855a;
}
p {
  color: grey;
}
.detail {
  margin: 5px;
}
</style>
