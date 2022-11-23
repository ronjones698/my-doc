<template>
  <div class="card">
    <div class="details">
      <h1>User Infomation</h1>
      <div class="info">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
        />
        <div class="identity">
          <div class="personal">
            <div class="item">
              <h3>First Name:</h3>
              <h4>{{ single_user.first_name }}</h4>
            </div>
            <div class="item">
              <h3>Second Name:</h3>
              <h4>{{ single_user.second_name }}</h4>
            </div>
            <div class="item">
              <h3>Surname:</h3>
              <h4>{{ single_user.last_name }}</h4>
            </div>
            <div class="item">
              <h3>Date of Birth:</h3>
              <h4>{{ single_user.DOB }}</h4>
            </div>
            <div class="item">
              <h3>Phone Number:</h3>
              <h4>{{ single_user.phone_number }}</h4>
            </div>
          </div>
          <div class="personal">
            <div class="item">
              <h3>Id Number:</h3>
              <h4>{{ single_user.identification_number }}</h4>
            </div>
            <div class="item">
              <h3>Organization Name:</h3>
              <h4>{{ single_user.organization_name }}</h4>
            </div>
            <div class="item">
              <h3>Personal Email:</h3>
              <h4>{{ single_user.email }}</h4>
            </div>
            <div class="item">
              <h3>User Department:</h3>
              <h4>{{ single_user.user_type }}</h4>
            </div>
          </div>
          <div class="personal">
            <div class="item">
              <h3>Date Registered:</h3>
              <h4>{{ single_user.created_at }}</h4>
            </div>
            <div class="item">
              <div class="btn">EDIT DETAILS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
</style>
