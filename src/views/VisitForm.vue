<template>
  <div class="card">
    <div class="details">
      <h1>Enter User Infomation</h1>
      <div class="info">
        <div class="item file">
          <img :src="imageUrl" v-if="imageUrl != null" />
          <input
            v-else
            type="file"
            name="file"
            ref="file"
            @change="handleFileUpload"
          />
        </div>
        <div class="identity">
          <div class="personal">
            <div class="item">
              <h3>First Name:</h3>
              <input type="text" v-model="first_name" />
            </div>
            <div class="item">
              <h3>Second Name:</h3>
              <input type="text" v-model="second_name" />
            </div>
            <div class="item">
              <h3>Last Name:</h3>
              <input type="text" v-model="last_name" />
            </div>
            <div class="item">
              <h3>Phone Number:</h3>
              <input type="text" v-model="phone_number" />
            </div>
            <div class="item">
              <h3>Date of Birth:</h3>
              <input type="date" v-model="DOB" />
            </div>
          </div>
          <div class="personal">
            <div class="item">
              <h3>Id Number:</h3>
              <input type="text" v-model="identification_number" />
            </div>
            <div class="item">
              <h3>Account Type:</h3>
              <select v-model="account_type">
                <option>Patient</option>
                <option v-if="user_organization_type == 'Insurance'">
                  Insurance
                </option>
                <option v-else>Hospital</option>
              </select>
            </div>
            <div class="item">
              <h3>Email:</h3>
              <input type="text" v-model="email" />
            </div>
            <div class="item">
              <h3>Residence:</h3>
              <input type="text" v-model="residence" />
            </div>
          </div>
          <div class="personal">
            <div v-if="account_type == 'Patient'" class="item">
              <h3>Membership Id:</h3>
              <input type="text" v-model="membership_id" />
            </div>
            <div v-else class="item">
              <h3>Password:</h3>
              <input type="password" v-model="password" />
            </div>
            <div v-if="account_type == 'Insurance'" class="item">
              <h3>User Department:</h3>
              <select v-model="user_type">
                <option style="background: red">Claims</option>
                <option>Management</option>
                <option>Verification</option>
                <option>Security</option>
              </select>
            </div>
            <div v-else-if="account_type == 'Hospital'" class="item">
              <h3>User Type:</h3>
              <select v-model="user_type">
                <option style="background: red">Reception</option>
                <option>Doctor</option>
                <option>Laboratory</option>
                <option>Pharmacy</option>
                <option>Claims</option>
              </select>
            </div>
            <div v-else class="item">
              <h3>User Type:</h3>
              <select v-model="user_type">
                <option>Patient</option>
                <option>Dependent</option>
              </select>
            </div>
            <div
              v-if="
                user_organization_type == 'Hospital' &&
                account_type == 'Patient'
              "
              class="item"
            >
              <h3>Insurer:</h3>
              <input type="text" v-model="insurer" />
            </div>
            <div v-else-if="account_type == 'Patient'" class="item">
              <h3>Insurer:</h3>
              <select v-model="insurer">
                <option>{{ user_organization_name }}</option>
              </select>
            </div>
            <div v-else></div>
            <div class="item">
              <div @click="submit" class="btn">SUBMIT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      first_name: null,
      second_name: null,
      last_name: null,
      email: null,
      identification_number: null,
      phone_number: null,
      user_type: "Claims",
      DOB: null,
      organization_name: null,
      residence: null,
      account_type: "Insurance",
      password: null,
      membership_id: null,
      imageUrl: null,
      insurer: null,
    };
  },
  computed: {
    user_organization_type() {
      console.log(this.$store.state.authenticatedUser.organization_type);
      return this.$store.state.authenticatedUser.organization_type;
    },
    user_organization_name() {
      return this.$store.state.authenticatedUser.organization_name;
    },
    logged_in_user() {
      return this.$store.state.authenticatedUser.email;
    },
    user_account_type() {
      return this.$store.state.authenticatedUser.account_type;
    },
    loggedin_user_type() {
      return this.$store.state.authenticatedUser.user_type;
    },
  },
  methods: {
    submit() {
      const payload = {
        first_name: this.first_name,
        second_name: this.second_name,
        last_name: this.last_name,
        email: this.email,
        identification_number: this.identification_number,
        phone_number: this.phone_number,
        user_type: this.user_type,
        DOB: this.DOB,
        organization_name: this.user_organization_name,
        organization_type: this.user_organization_type,
        residence: this.residence,
        account_type: this.account_type,
        password: this.password,
        membership_id: this.membership_id,
        agent_email: this.logged_in_user,
        imageUrl: this.imageUrl,
        insurer: this.insurer,
      };
      fetch("http://127.0.0.1:8000/api/user/register/", {
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
          this.$router.push("/visits");
        });
    },
    handleFileUpload() {
      this.images = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.images);
      fetch("http://127.0.0.1:5000/recieve_profile_picture/", {
        method: "POST",
        body: formData,
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          const imagelink = "http://" + data.url;
          this.imageUrl = imagelink;
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
input {
  border: 1px solid #2f855a;
  width: 100%;
  border-radius: 10px;
  padding: 3px 10px;
}
select {
  border: 1px solid #2f855a;
  width: 200px;
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
.submit {
  justify-self: center;
}
.file {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
