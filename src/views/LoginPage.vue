<template>
  <nav>
    <div class="navbar white">
      <h3>MydocKe</h3>
    </div>
  </nav>
  <LogInComponent />
</template>
<script>
import { setLoggedin } from "@/components/state";
import LogInComponent from "@/components/LiginComp.vue";
export default {
  name: "LoginPage",
  setup() {
    return { setLoggedin };
  },
  components: {
    LogInComponent,
  },
};
</script>
<style scoped>
nav {
  background-color: #fff;
}
.white {
  margin: 10px;
}
</style>
