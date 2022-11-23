<template>
  <div class="card">
    <div class="images">
      <h1>KES {{ total_cost }}</h1>
      <div class="approval">
        <div @click="reject" class="btn">REJECT CLAIM</div>
        <div @click="approve" class="btn">APPROVE CLAIM</div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";

export default {
  computed: {
    visit_id() {
      return this.$store.state.visit.visit_id;
    },
    total_cost() {
      return this.$store.state.visit.cost;
    },
    form_scans() {
      return this.$store.state.forms;
    },
  },
  created() {
    const route = useRoute();
    this.$store.dispatch("getFormScans", route.params.visit_id);
  },
  methods: {
    popUp(url) {
      this.$store.dispatch("getPopUp", url);
    },
    approve() {
      const payload = {
        status: "approved",
      };
      const url =
        "http://127.0.0.1:8000/api/claims/visits/" +
        this.visit_id +
        "/update_visit_status/";
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
            this.$router.push("/recieved_claims");
          }
          console.log(data);
        });
    },
    reject() {
      const payload = {
        status: "rejected",
      };
      const url =
        "http://127.0.0.1:8000/api/claims/visits/" +
        this.visit_id +
        "/update_visit_status/";
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
            this.$router.push("/recieved_claims");
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
  flex-direction: column;
  align-items: center;
  transition: 0.3s ease;
}
h1 {
  font-size: 20px;
  margin: 10px;
  font-weight: 600;
  align-self: flex-start;
}
.images > img {
  width: 14%;
  height: 7%;
  margin-left: 20px;
  cursor: pointer;
}
.images > img:hover {
  transform: scale(1.2);
}
.images {
  display: flex;
  margin: 10px;
  transition: 500ms ease-in-out;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.approval {
  display: flex;
}
</style>
