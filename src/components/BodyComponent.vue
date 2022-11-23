<template>
  <div class="home">
    <nav>
      <div class="navbar">
        <h3>MydocKe</h3>
        <div class="searchbox">
          <input class="seachinput" placeholder="Search for items here" />
          <div class="searchbutton">
            <font-awesome-icon class="white" icon="fa-solid fa-search" />
          </div>
        </div>
        <div class="profile">
          <div class="detail">
            <h3>{{ first_name }} {{ second_name }}</h3>
            <p @click="logOut">Sign-Out</p>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "BodyComponent",
  components: {},
  computed: {
    first_name() {
      return this.$store.state.authenticatedUser.first_name;
    },
    second_name() {
      return this.$store.state.authenticatedUser.second_name;
    },
    image_url() {
      return this.$store.state.authenticatedUser.imageUrl;
    },
  },
  methods: {
    logOut() {
      localStorage.setItem("isAuthenticated", false);
      this.$store.commit("setAuthenticated", false);
      window.location.reload();
    },
  },
};
</script>
<style scoped>
.home {
  transition: 0.3s ease-in;
  display: flex;
  flex-direction: column;
}
nav {
  width: 100%;
}
.navbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
input {
  background-color: transparent;
  border: 2px solid #2f855a;
  padding: 5px 15px;
  width: 70%;
  border-radius: 20px;
  caret-color: #2f855a;
  color: grey;
  text-align: center;
}
.searchbox {
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 10%;
}
.searchbutton {
  background-color: #2f855a;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.white {
  color: white;
  font-size: 16px;
  align-self: center;
}
img {
  height: 6%;
  width: 10%;
  padding: 10px;
  border-radius: 50%;
  object-fit: contain;
}
.detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 150px;
}
h3 {
  color: #2f855a;
  padding: 5px;
  height: 30px;
  font-weight: 600;
}
p {
  color: grey;
  cursor: pointer;
  padding-left: 5px;
}
.profile {
  justify-content: flex-end;
}
</style>
