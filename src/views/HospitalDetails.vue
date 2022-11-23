<template>
  <div class="card">
    <div class="details">
      <h1>Hospital Infomation</h1>
      <div class="info">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
        />
        <div class="identity">
          <div class="personal">
            <div class="item">
              <h3>Hospital Name:</h3>
              <h4>{{ single_user.hospital_name }}</h4>
            </div>
            <div class="item">
              <h3>Hospital Location:</h3>
              <h4>{{ single_user.location }}</h4>
            </div>
            <div class="item">
              <h3>Hospital Identifier:</h3>
              <h4>{{ single_user.hospital_id }}</h4>
            </div>
            <div class="item">
              <h3>Admin Identifier:</h3>
              <h4>258008702</h4>
            </div>
            <div class="item">
              <h3>Admin First Name:</h3>
              <h4>Paul</h4>
            </div>
          </div>
          <div class="personal">
            <div class="item">
              <h3>Second Name:</h3>
              <h4>Kamau</h4>
            </div>
            <div class="item">
              <h3>Admin Contacts:</h3>
              <h4>074589620</h4>
            </div>
            <div class="item">
              <h3>Admin Email:</h3>
              <h4>{{ single_user.admin_email }}</h4>
            </div>
            <div class="item">
              <h3>Customer Care:</h3>
              <h4>{{ single_user.telephone }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppointmentTable />
</template>
<script>
import AppointmentTable from "@/components/ApointmentTable.vue";
import { useRoute } from "vue-router";
export default {
  name: "HelloBody",
  components: {
    AppointmentTable,
  },
  created() {
    const route = useRoute();
    this.$store.dispatch("getHospital", route.params.hospital_id);
  },
  computed: {
    single_user() {
      return this.$store.state.hospital;
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
