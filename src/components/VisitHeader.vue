<template>
  <div class="User">
    <div class="left">
      <div class="upper">
        <StattsLabel digit="58" tittle="In-Patient" icon="fa-regular fa-bell" />
        <StattsLabel
          digit="12"
          tittle="Out-Patient"
          icon="fa-regular fa-bell"
        />
      </div>
      <div class="lower">
        <h3>{{ total_visits }} Visits</h3>
        <select>
          <option style="background: red">New Visits</option>
          <option>Referal</option>
          <option>Follow Up Visits</option>
          <option>Emergency</option>
          <option>Repeat Visits</option>
        </select>
      </div>
    </div>
    <div v-if="user_type != 'Doctor'" class="center">
      <div class="holder">
        <h3>Visits Input Box</h3>
      </div>
      <input
        v-model="patient_id"
        class="seachinput"
        placeholder="Enter Patient Id Number"
      />
      <div @click="submit" class="claimbtn">ADD NEW VISIT</div>
    </div>
    <div v-else class="center">
      <div class="holder">
        <h3>Visits View Box</h3>
      </div>
      <input
        v-model="visit_id"
        class="seachinput"
        placeholder="Enter Visit Id Number"
      />
      <div @click="got_to_visit" class="claimbtn">GO TO VISIT</div>
    </div>
    <MessagePopUp v-if="is_pop_up_allowed && user_type != 'Doctor'">
      <h2 class="popUp-message">Visit Created Successfully</h2>
    </MessagePopUp>
    <MessagePopUp v-if="is_pop_up_allowed && user_type == 'Doctor'">
      <h2 class="popUp-message">Access Denied. Claim is already made</h2>
    </MessagePopUp>
    <MessagePopUp
      v-if="is_pop_up_allowed && visit_id == null && user_type == 'Doctor'"
    >
      <h2 class="popUp-message">Null Values are not allowed. Enter visit id</h2>
    </MessagePopUp>
    <div v-else></div>
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
import MessagePopUp from "@/components/MessagePopUp.vue";
export default {
  components: {
    StattsLabel,
    MessagePopUp,
  },
  data() {
    return {
      patient_id: null,
      agent_email: null,
      visit_id: null,
    };
  },
  computed: {
    user_type() {
      return this.$store.state.authenticatedUser.user_type;
    },
    total_visits() {
      return this.$store.state.totalVisits;
    },
    organization_name() {
      return this.$store.state.authenticatedUser.organization_name;
    },
    first_name() {
      return this.$store.state.authenticatedUser.first_name;
    },
    second_name() {
      return this.$store.state.authenticatedUser.second_name;
    },
    image_url() {
      return this.$store.state.authenticatedUser.imageUrl;
    },
    logged_in_user() {
      return this.$store.state.authenticatedUser.email;
    },
    is_pop_up_allowed() {
      return this.$store.state.popUp;
    },
  },
  methods: {
    submit() {
      const payload = {
        patient_id: this.patient_id,
        agent_email: this.logged_in_user,
        facility_name: this.organization_name,
        hospital_id: "125870554",
      };
      fetch("http://127.0.0.1:8000/api/claims/visits/add_visit/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          this.$store.commit("setPopUp");
          this.patient_id = null;
          this.$store.dispatch("getVisits", this.organization_name);
        });
    },
    got_to_visit() {
      if (this.visit_id == null) {
        this.$store.commit("setPopUp");
        return;
      }
      const url =
        "http://127.0.0.1:8000/api/claims/visits/" +
        this.visit_id +
        "/get_visit_by_id/";
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.status);
          if (
            data.status == "pending" ||
            data.status == "approved" ||
            data.status == "rejected"
          ) {
            console.log("Access denied. Claim Already made");
            this.$store.commit("setPopUp");
          } else {
            const link = "/visit_details/" + this.visit_id + "/";
            this.$router.push(link);
          }
        });
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
  width: 130%;
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
  width: 175%;
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

<style>
.popUp-message {
  margin-left: 20px;
  font-weight: 600;
  color: #2f855a;
}
</style>
