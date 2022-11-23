<template>
  <div class="User">
    <div class="greeting">
      <h1>{{ patient_name }}</h1>
      <p>{{ hospital_name }}</p>
    </div>
    <div class="details">
      <p>{{ description }}</p>
    </div>
    <div class="date">
      <p>{{ visit_date }}</p>
    </div>
    <div class="date">
      <p>KES {{ cost }}</p>
    </div>
    <router-link :to="visit_link" class="btn">VIEW CLAIM DETAILS</router-link>
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
    description: {
      type: String,
    },
    visit_date: {
      type: String,
    },
    visit_id: {
      type: String,
    },
    cost: {
      type: Number,
    },
  },
  computed: {
    visit_link() {
      return "/view_claim/" + this.visit_id + "/";
    },
  },
};
</script>
<style scoped>
.User {
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  margin: 20px;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.date > P {
  font-size: 16px;
  font-weight: 800;
}
.greeting {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 10px;
}
.greeting > P {
  font-size: 16px;
}
h1 {
  font-size: 18px;
  font-weight: bold;
  color: #2f855a;
}
p {
  color: grey;
  font-size: 14px;
}
.details {
  max-width: 35%;
}
.details > p {
  justify-self: flex-start;
  align-self: flex-start;
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
