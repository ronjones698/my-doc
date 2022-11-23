<template>
  <div class="User">
    <div class="left">
      <div class="upper">
        <StattsLabel digit="58" tittle="Verified" icon="fa-regular fa-bell" />
        <StattsLabel digit="12" tittle="Rejected" icon="fa-regular fa-bell" />
      </div>
      <div class="lower">
        <h3>{{ total_visits }} claims</h3>
        <select>
          <option style="background: red">All</option>
          <option>Verified</option>
          <option>Rejected</option>
        </select>
      </div>
    </div>
    <div class="center">
      <div class="holder">
        <h3>Claims Input Box</h3>
      </div>
      <input
        v-model="visit_id"
        class="seachinput"
        placeholder="Enter Hospital Visit Id Number"
      />
      <div @click="got_to_visit" class="claimbtn">GO TO CLAIM</div>
    </div>
    <div class="right">
      <div class="container">
        <h3>{{ first_name }} {{ second_name }}</h3>
        <p>{{ user_type }}</p>
        <div class="holder">
          <h3>Account settings</h3>
        </div>
      </div>
      <img :src="image_url" />
    </div>
  </div>
</template>
<script>
import StattsLabel from "@/components/StattsLabel.vue";
export default {
  components: {
    StattsLabel,
  },
  data() {
    return {
      patient_id: null,
      agent_email: null,
      visit_id: null,
    };
  },
  computed: {
    first_name() {
      return this.$store.state.authenticatedUser.first_name;
    },
    second_name() {
      return this.$store.state.authenticatedUser.second_name;
    },
    user_type() {
      return this.$store.state.authenticatedUser.user_type;
    },
    image_url() {
      return this.$store.state.authenticatedUser.imageUrl;
    },
    total_visits() {
      return this.$store.state.totalVisits;
    },
  },
  methods: {
    got_to_visit() {
      const link = "/view_claim/" + this.visit_id + "/";
      this.$router.push(link);
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
select {
  border: 1px solid #2f855a;
  width: 135%;
  border-radius: 5px;
  padding: 5px 5px;
}
.left {
  display: flex;
  flex-direction: column;
}
.lower {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 5px;
}
.lower > h3 {
  color: #2f855a;
  margin: 5px;
  font-size: 18px;
}
.upper {
  display: flex;
  width: 180%;
}
.center {
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  padding: 10px 0;
  width: 27%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 8%;
}
.holder {
  background: rgba(230, 240, 230, 10);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-left: 5px solid #2f855a;
  cursor: pointer;
}
.holder > h3 {
  color: #2f855a;
  padding: 5px;
  height: 30px;
  font-weight: 600;
}
input {
  background-color: transparent;
  border: 2px solid #2f855a;
  padding: 5px 15px;
  width: 98%;
  border-radius: 5px;
  caret-color: #2f855a;
  color: grey;
  text-align: center;
  margin-top: 10px;
}
.claimbtn {
  background-color: #2f855a;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 5px 5px 4px rgba(230, 240, 230, 10);
  cursor: pointer;
  width: 98%;
  margin: 10px 5px;
}
.container {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
}
.container > h3 {
  font-size: 18px;
  font-weight: bold;
  color: #2f855a;
}
.container > p {
  color: grey;
}
.right {
  display: flex;
  align-items: center;
  width: 28%;
  justify-content: center;
}
img {
  height: 30%;
  width: 40%;
  padding: 10px;
  border-radius: 50%;
  object-fit: contain;
}
</style>
