<template>
  <div class="card">
    <div class="details">
      <h1>Patient Infomation</h1>
      <div class="info">
        <img :src="patient_info.imageUrl" />
        <div class="identity">
          <div class="personal">
            <div class="item">
              <h3>Patient First Name:</h3>
              <h4>{{ patient_info.first_name }}</h4>
            </div>
            <div class="item">
              <h3>Patient Surname:</h3>
              <h4>{{ patient_info.second_name }}</h4>
            </div>
            <div class="item">
              <h3>Member Id:</h3>
              <h4>{{ patient_info.membership_id }}</h4>
            </div>
            <div class="item">
              <h3>Relationship:</h3>
              <h4>{{ patient_info.relationship }}</h4>
            </div>
            <div class="item">
              <h3>Insurer:</h3>
              <h4>{{ patient_info.insurer_name }}</h4>
            </div>
          </div>
          <div class="personal">
            <div class="item">
              <h3>Identification Number:</h3>
              <h4>{{ patient_info.paitient_id }}</h4>
            </div>
            <div class="item">
              <h3>Purpose of Visit:</h3>
              <h4>{{ patient_info.puporse }}</h4>
            </div>
            <div class="item">
              <h3>Treatment Condition:</h3>
              <h4>{{ patient_info.condition }}</h4>
            </div>
            <div class="item">
              <h3>Treatment Outcome:</h3>
              <h4>{{ patient_info.outcome }}</h4>
            </div>
          </div>
          <div class="personal">
            <div class="item">
              <h3>Patient Type:</h3>
              <h4>{{ patient_info.patient_type }}</h4>
            </div>
            <div class="item">
              <h3>Primary Diagnosis:</h3>
              <h4>{{ patient_info.primary_diagnosis }}</h4>
            </div>
            <div class="item">
              <h3>Secondary Diagnosis:</h3>
              <h4>{{ patient_info.secondary_diagnosis }}</h4>
            </div>
            <div class="item">
              <h3>Date Of Attendance:</h3>
              <h4>{{ patient_info.date_of_attendance }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PopUp v-if="is_pop_up_allowed">
    <img class="popUp-image" :src="pop_up_url" />
  </PopUp>
  <div v-else></div>
  <div class="infodiv">
    <Consultation />
    <Pharmacy />
    <LabTest />
  </div>
  <Imaging />
  <FormScan />
  <Approve v-if="display" />
  <div v-else></div>
</template>
<script>
import Consultation from "@/components/ConsultationClaim.vue";
import Pharmacy from "@/components/PharmacyClaim.vue";
import LabTest from "@/views/LabClaim.vue";
import Imaging from "@/views/ImagingClaim.vue";
import FormScan from "@/components/FormScans.vue";
import PopUp from "@/components/PopUp.vue";
import Approve from "@/components/SubmitDiv.vue";

import { useRoute } from "vue-router";
export default {
  name: "HelloBody",
  components: {
    Consultation,
    Pharmacy,
    LabTest,
    Imaging,
    FormScan,
    PopUp,
    Approve,
  },
  data() {
    return {
      purpose: "New Visit",
      outcome: "Resolved",
      condition: "Acute",
      date_of_attendance: null,
      patient_type: "Out Patient",
      primary_diagnosis: null,
      secondary_diagnosis: null,
    };
  },
  computed: {
    patient_info() {
      return this.$store.state.visit;
    },
    visit_id() {
      return this.$store.state.visit.visit_id;
    },
    display() {
      const user_type = localStorage.getItem("userType");
      return (
        this.$store.state.visit.status == "pending" && user_type == "Claims"
      );
    },
    pop_up_url() {
      return this.$store.state.popup_url;
    },
    is_pop_up_allowed() {
      return this.$store.state.popUp;
    },
  },

  created() {
    const route = useRoute();
    this.$store.dispatch("getVisit", route.params.visit_id);
  },
  methods: {
    submit() {
      const payload = {
        puporse: this.purpose,
        outcome: this.outcome,
        condition: this.condition,
        date_of_attendance: this.date_of_attendance,
        patient_type: this.patient_type,
        primary_diagnosis: this.primary_diagnosis,
        secondary_diagnosis: this.secondary_diagnosis,
      };
      const url =
        "http://127.0.0.1:8000/api/claims/visits/" +
        this.visit_id +
        "/update_visit/";
      fetch(url, {
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
          if (data["Success"]) {
            this.$router.push("/reception");
          }
        });
    },
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
img {
  height: 180px;
  width: 180px;
  padding: 10px;
}
.infodiv {
  display: flex;
}
.details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
h1 {
  font-size: 20px;
  margin: 10px;
  font-weight: 600;
}
.info {
  display: flex;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 5px;
  padding: 5px 5px;
}
.item > h3 {
  font-size: 18px;
  font-weight: 600;
}
.identity {
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.personal {
  display: flex;
  justify-content: space-evenly;
}
h4 {
  color: grey;
  font-size: 16px;
}
input {
  border: 1px solid #2f855a;
  width: 100%;
  border-radius: 10px;
  padding: 3px 10px;
}
select {
  border: 1px solid #2f855a;
  width: 100%;
  border-radius: 5px;
  padding: 5px 5px;
}
option {
  color: #2f855a;
}
.mark {
  margin-top: 20px;
}
.pres {
  display: flex;
  align-items: flex-start;
}
.temp {
  background-color: rgba(230, 240, 230, 10);
  border: 1px solid #2f855a;
  padding: 10px;
  margin: 10px;
  width: 150px;
  border-radius: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.submit {
  justify-self: center;
}
.popUp-image {
  width: 100%;
  height: 100%;
}
</style>
