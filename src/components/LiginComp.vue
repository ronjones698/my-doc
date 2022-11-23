<template>
  <div class="card">
    <div class="navbar loginNav">
      <h3>MydocKe</h3>
    </div>
    <div class="item">
      <h3>Email</h3>
      <input v-model="email" placeholder="Enter your Email address" />
    </div>
    <div class="item">
      <h3>Password</h3>
      <input
        v-model="password"
        type="password"
        placeholder="Enter your Password"
      />
    </div>
    <div @click="submit" class="btn Login">SIGN IN TO ACCOUNT</div>
    <p>
      By clicking on the sign-in button,you are concenting to our data
      compliance policy and you accept the terms/conditions of service
    </p>
  </div>
</template>
<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    submit() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      fetch("http://127.0.0.1:8000/api/token/obtain/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          if (data.access) {
            this.$store.commit("setAuthenticated", true);
            localStorage.setItem("isAuthenticated", true);
            const stub = this.email.split(".");
            this.$store.dispatch("getAuthenticatedUser", stub[0]);
            this.$router.push("/");
          } else {
            console.log(data);
          }
        });
    },
  },
};
</script>
<style scoped>
.card {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4%;
  height: 410px;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid lightgray;
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  border-radius: 5px;
  justify-content: center;
  align-items: center;
}
.item {
  display: flex;
  flex-direction: column;
  width: 95%;
  padding: 5px;
}
.item > input {
  border: 1px solid #2f855a;
  padding: 5px 8px;
  border-radius: 5px;
}
input:focus {
  outline: 0;
}
.item > h3 {
  align-self: flex-start;
  padding: 5px;
  color: gray;
}
.Login {
  width: 95%;
  font-size: 16px;
  font-weight: 500;
}
.loginNav {
  margin-top: -5px;
}
p {
  font-size: 15.5px;
  width: 95%;
  color: gray;
}
</style>
