<template>
  <div v-if="isAuthenticated" class="home">
    <SideBar />
    <div :style="{ 'margin-left': sidebarWidth }">
      <BodyComponent />
    </div>
  </div>
  <LoginPage v-else />
</template>
<script>
// @ is an alias to /src
import { sidebarWidth, loggedIn } from "@/components/state";
import BodyComponent from "@/components/BodyComponent.vue";
import SideBar from "@/components/SideBar.vue";
import LoginPage from "@/views/LoginPage.vue";

export default {
  name: "HomeView",
  setup() {
    return { sidebarWidth, loggedIn };
  },
  computed: {
    isAuthenticated() {
      if (localStorage.getItem("isAuthenticated") == "true") {
        return true;
      }
      return this.$store.state.isAuthenticated;
    },
  },
  created() {
    localStorage.removeItem("isAuthenticated");
  },
  components: {
    BodyComponent,
    SideBar,
    LoginPage,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 10px;
  background: rgba(230, 240, 230, 10);
}
.icons {
  color: #2f855a;
  font-size: 24px;
  margin-right: 10px;
  align-items: center;
  padding: 5px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar > h3 {
  color: #2f855a;
  font-weight: 800;
  font-size: 21px;
}
.profile {
  display: flex;
  align-items: center;
}
.profile > h4 {
  color: #2f855a;
  font-weight: 400;
  font-size: 18px;
  margin-right: 10px;
}
.btn {
  background-color: #2f855a;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  cursor: pointer;
  width: 200px;
  margin: 20px 5px;
}
</style>
