<template>
  <div class="card">
    <Header />
    <TableRow
      v-for="visit in all_visits"
      :key="visit.visit_id"
      :insurer="visit.insurer_name"
      :visit_date="visit.created_at"
      :description="visit.description"
      :patient_name="visit.paitient_name"
      :visit_id="visit.visit_id"
      :purpose="visit.puporse"
      :hospital_name="visit.facility_name"
      :cost="visit.cost"
      :status="visit.status"
    />
    <PopUp v-if="is_pop_up_allowed">
      <div class="popup_card">
        <div class="details">
          <h1>Patient Infomation</h1>
          <div class="info">
            <img :src="patient_info.imageUrl" />
            <div class="identity">
              <div class="personal">
                <div class="item">
                  <h3>First Name:</h3>
                  <h4>{{ patient_info.first_name }}</h4>
                </div>
                <div class="item">
                  <h3>Surname:</h3>
                  <h4>{{ patient_info.second_name }}</h4>
                </div>
                <div class="item">
                  <h3>Member Id:</h3>
                  <h4>{{ patient_info.membership_id }}</h4>
                </div>
                <div class="item">
                  <h3>Insurer:</h3>
                  <h4>{{ patient_info.insurer_name }}</h4>
                </div>
                <div class="item">
                  <h3>Identification Number:</h3>
                  <h4>{{ patient_info.paitient_id }}</h4>
                </div>
              </div>
              <div class="personal">
                <div class="item">
                  <h3>Purpose:</h3>
                  <h4>{{ patient_info.puporse }}</h4>
                </div>
                <div class="item">
                  <h3>Condition:</h3>
                  <h4>{{ patient_info.condition }}</h4>
                </div>
                <div class="item">
                  <h3>Treatment Outcome:</h3>
                  <h4>{{ patient_info.outcome }}</h4>
                </div>
                <div class="item">
                  <h3>Patient Type:</h3>
                  <h4>{{ patient_info.patient_type }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="infodiv">
        <StattsLabel
          :digit="patient_info.consultation"
          tittle="Consultation"
          icon="fa-regular fa-bell"
        />
        <StattsLabel
          :digit="patient_info.laboratory"
          tittle="Laboratory"
          icon="fa-regular fa-bell"
        />
        <StattsLabel
          :digit="patient_info.pharmacy"
          tittle="Pharmacy"
          icon="fa-regular fa-bell"
        />
      </div>
      <FormScan />
    </PopUp>
  </div>
</template>

<script>
import Header from "@/components/TableHeader.vue";
import TableRow from "@/components/TableRow.vue";
import PopUp from "@/components/PopUp.vue";
import StattsLabel from "@/components/DivisonLabel.vue";
import FormScan from "@/components/FormScans.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Header,
    TableRow,
    PopUp,
    StattsLabel,
    FormScan,
  },
  computed: {
    organization_name() {
      return this.$store.state.authenticatedUser.organization_name;
    },
    all_visits() {
      if (
        this.$store.state.authenticatedUser.organization_type == "Insurance"
      ) {
        return this.$store.state.visits.filter(
          (visit) =>
            visit.insurer_name ==
            this.$store.state.authenticatedUser.organization_name
        );
      } else {
        return this.$store.state.visits.filter(
          (visit) =>
            visit.facility_name ==
            this.$store.state.authenticatedUser.organization_name
        );
      }
    },
    is_pop_up_allowed() {
      return this.$store.state.popUp;
    },
    patient_info() {
      return this.$store.state.visit;
    },
  },
  created() {
    const route = useRoute();
    if (route.params.hospital_id) {
      this.$store.dispatch("getIdVisits", route.params.hospital_id);
    } else {
      this.$store.dispatch("getVisits", this.organization_name);
    }
  },
};
</script>
<style scoped>
.card {
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  margin: 20px;
  padding: 15px;
  width: 100%;
  flex: 1;
  max-height: 58vh;
  flex-direction: column;
}
.popup_card {
  width: 98%;
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  margin: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  transition: 0.3s ease;
}
img {
  height: 150px;
  width: 150px;
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
  padding: 5px 2px;
  min-width: 80px;
}
.item > h3 {
  font-size: 13px;
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
  font-size: 12px;
}
input {
  border: 1px solid #2f855a;
  width: 100%;
  border-radius: 10px;
  padding: 3px 10px;
}
.pagination {
  bottom: 0;
}
</style>
