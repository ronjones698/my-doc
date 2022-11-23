<template>
  <div class="User">
    <div class="greeting">
      <h1>Hello, Emmanuel Ron Jones</h1>
      <p>Welcome to our web platform</p>
    </div>
    <router-link to="/addvisit" class="btn">REGISTER NEW USER</router-link>
  </div>
</template>

<style scoped>
.User {
  box-shadow: 6px 6px 5px rgba(230, 240, 230, 10);
  margin: 20px;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.greeting {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 10px;
}
h1 {
  font-size: 18px;
  font-weight: bold;
}
p {
  color: grey;
  font-size: 18px;
}
</style>
<style>
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
