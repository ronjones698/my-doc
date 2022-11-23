<template>
  <div class="card">
    <div class="details">
      <div class="heading">
        <h1>Pharmacy</h1>
        <div class="cost">
          <h1>KES</h1>
          <input v-model="cost" type="number" />
        </div>
      </div>
      <div class="info">
        <div class="identity">
          <div class="personal service">
            <Service
              v-for="drug in drug_list"
              :key="drug.drug"
              :Service="drug.drug"
            />
          </div>
          <div class="personal column">
            <div class="item">
              <input v-model="drug" placeholder="Enter a drug here" />
            </div>
            <div class="item">
              <div @click="submit" class="btn servicebtn">ADD MEDICATION</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Service from "@/components/PrescriptionItem.vue";
export default {
  name: "HelloBody",
  components: {
    Service,
  },
  data() {
    return {
      drug: null,
      cost: 0,
    };
  },
  computed: {
    drug_list() {
      return this.$store.state.drugs;
    },
    visit_id() {
      return this.$store.state.visit.visit_id;
    },
  },
  methods: {
    submit() {
      const payload = {
        cost: this.cost,
        visit_id: this.visit_id,
        agent_email: "pa2@gmail.com",
        prescriber: "pa2@gmail.com",
        drug: this.drug,
      };
      fetch("http://127.0.0.1:8000/api/claims/visits/add_prescription/", {
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
          if (data["Success"]) {
            let all_drugs = this.drug_list;
            all_drugs.push(payload);
            this.drug = null;
            this.$store.commit("setDrugs", all_drugs);
          } else {
            this.description = data["Message"];
          }
        });
    },
  },
};
</script>
<style scoped>
.card {
  max-width: 31%;
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  margin: 40px;
  padding: 5px;
  display: flex;
  align-items: center;
  transition: 0.3s ease;
}
.heading {
  display: flex;
  justify-content: space-between;
  width: 90%;
}
.column {
  display: flex;
  flex-direction: column;
}
.cost {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.cost > input {
  width: 40%;
  height: 40px;
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
  flex-direction: column;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 5px;
  padding: 5px 5px;
  flex: 1;
  min-width: 170px;
}
.item > input {
  padding: 7px;
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
  max-width: 90%;
}
.personal {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
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
.service {
  max-width: 400px;
  flex-wrap: wrap;
}
.submit {
  justify-self: center;
}
.servicebtn {
  margin-top: 0;
  width: 100%;
}
</style>
