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
          </div>

          <div class="personal">
            <div class="item">
              <h3>Insurer:</h3>
              <h4>{{ patient_info.insurer_name }}</h4>
            </div>
            <div class="item">
              <h3>Identification Number:</h3>
              <h4>{{ patient_info.paitient_id }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="infodiv">
    <Consultation />
    <Pharmacy />
    <LabTest />
  </div>
  <Imaging />
  <div class="card">
    <div class="details">
      <h1>Enter Visit Infomation</h1>
      <div class="personal">
        <div class="item">
          <h3>Purpose of Visit:</h3>
          <select v-model="purpose">
            <option style="background: red">New Visit</option>
            <option>Follow Up</option>
            <option>Repeat Visit</option>
            <option>Referal</option>
            <option>Emergency</option>
          </select>
        </div>
        <div class="item">
          <h3>Treatment Condition:</h3>
          <select v-model="condition">
            <option style="background: red">Acute</option>
            <option>Chronic</option>
            <option>Acute on Chronic</option>
            <option>Maternity</option>
            <option>Surgical</option>
            <option>Congenital</option>
          </select>
        </div>
        <div class="item">
          <h3>Treatment Outcome:</h3>
          <select v-model="outcome">
            <option style="background: red">Allowed Home Treatment</option>
            <option>Admitted</option>
            <option>Refered</option>
            <option>Resolved</option>
            <option>Absconded</option>
            <option>Deceased</option>
          </select>
        </div>
        <div class="item">
          <h3>Date Of Attendance:</h3>
          <input v-model="date_of_attendance" type="date" />
        </div>
        <div class="item">
          <h3>Patient Type:</h3>
          <select v-model="patient_type">
            <option style="background: red">Out Patient</option>
            <option>In Patient</option>
          </select>
        </div>
      </div>
      <div class="personal">
        <div class="item">
          <h3>Primary Diagnosis:</h3>
          <input v-model="primary_diagnosis" />
        </div>
        <div class="item">
          <h3>Secondary Diagnosis:</h3>
          <input v-model="secondary_diagnosis" />
        </div>
        <div class="item">
          <div @click="submit" class="btn">SUBMIT CLAIM</div>
        </div>
      </div>
      <div class="personal">
        <p>
          NB: The above entry is final and thus can not be edited after. Kindly
          ensure that you have entered the correct information
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Consultation from "@/components/ConsultationDiv.vue";
import Pharmacy from "@/components/PharmacyDiv.vue";
import LabTest from "@/components/LabDiv.vue";
import Imaging from "@/components/ImagingDiv.vue";

import { useRoute } from "vue-router";
export default {
  name: "HelloBody",
  components: {
    Consultation,
    Pharmacy,
    LabTest,
    Imaging,
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
  },
  created() {
    const route = useRoute();
    const url =
      "http://127.0.0.1:8000/api/claims/visits/" +
      route.params.visit_id +
      "/get_visit_by_id/";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.first_name) {
          console.log(data);
          this.$router.push("/reception");
        }
        if (data.status != "visit") {
          this.$router.push("/reception");
        }
      });
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
        status: "pending",
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
          console.log(data);
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
  min-width: 170px;
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
</style>
