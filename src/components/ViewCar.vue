<template>
  <div class="card">
    <div class="cardDetails">
      <h3>{{ header }} {{ extra }}</h3>
      <h3 class="date">{{ route }}</h3>
      <img :src="image_url" />
    </div>
    <router-link :to="details_link" class="btn">VIEW FULL DETAILS</router-link>
  </div>
</template>
<script>
import { link } from "@/components/state";
export default {
  props: {
    header: {
      type: String,
    },
    extra: {
      type: String,
    },
    route: {
      type: String,
    },
    user_id: {
      type: String,
    },
    image_url: {
      type: String,
    },
  },
  data() {
    return {
      myURL: link,
    };
  },
  computed: {
    details_link() {
      if (this.route === "Hospital") {
        const link = "/hospitaldetails/" + this.user_id + "/";
        return link;
      }
      const link = "/details/" + this.user_id + "/";
      return link;
    },
  },
};
</script>
<style scoped>
.card {
  width: 220px;
  box-shadow: 2px 1px 3px 3px lightgray;
  margin: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 320px;
  border-radius: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: 0.3s ease;
}
.card:hover {
  transform: scale(1.1);
}
.cardDetails {
  margin-top: 15px;
  padding: 5px;
  text-align: left;
}
h3 {
  font-size: 15px;
  font-weight: 600;
}
.date {
  color: grey;
}
p {
  color: grey;
  font-size: 14px;
}
img {
  height: 150px;
  width: 170px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
}
</style>
