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
          <font-awesome-icon class="icons" icon="fa-regular fa-bell" />
          <font-awesome-icon class="icons" icon="fa-regular fa-envelope" />
          <h4>details</h4>
          <h4>mail</h4>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "HomeView",
  components: {},
};
</script>
<style scoped>
.home {
  display: flex;
  justify-content: space-between;
  transition: 0.3s ease-in;
}
nav {
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
  width: 60%;
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
</style>
