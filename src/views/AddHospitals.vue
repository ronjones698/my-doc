<template>
  <div class="card">
    <div class="details">
      <h1>Enter Hospital Infomation</h1>
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
              <h3>Hospital Name:</h3>
              <input type="text" v-model="hospital_name" />
            </div>
            <div class="item">
              <h3>Hospital Location:</h3>
              <input type="text" v-model="location" />
            </div>
            <div class="item">
              <h3>Hospital Identifier:</h3>
              <input type="text" v-model="hospital_id" />
            </div>
            <div class="item">
              <h3>Admin Id:</h3>
              <input type="text" v-model="admin_id" />
            </div>
          </div>
          <div class="personal">
            <div class="item">
              <h3>Admin First Name:</h3>
              <input type="text" v-model="admin_first_name" />
            </div>
            <div class="item">
              <h3>Admin Second Name:</h3>
              <input type="text" v-model="admin_second_name" />
            </div>
            <div class="item">
              <h3>Admin Contacts:</h3>
              <input type="text" v-model="admin_phone" />
            </div>
            <div class="item">
              <h3>Admin Email:</h3>
              <input type="text" v-model="admin_email" />
            </div>
          </div>
          <div class="personal">
            <div class="item">
              <h3>Customer Care Number:</h3>
              <input type="text" v-model="telephone" />
            </div>
            <div class="item">
              <h3>Hospital Address:</h3>
              <input type="text" v-model="address" />
            </div>
            <div class="item">
              <h3>Hospital Email:</h3>
              <input type="text" v-model="email" />
            </div>
            <div class="item">
              <button @click="submit" class="btn">SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Service />
</template>
<script>
import Service from "@/components/ServicesComponent.vue";
export default {
  name: "HelloBody",
  components: {
    Service,
  },
  data() {
    return {
      hospital_name: null,
      location: null,
      hospital_id: null,
      admin_first_name: null,
      admin_second_name: null,
      telephone: null,
      admin_phone: null,
      admin_email: null,
      admin_id: null,
      email: null,
      address: null,
      images: null,
      imageUrl: null,
    };
  },
  methods: {
    log_data() {
      console.log("Values:", this.hospital_name);
    },
    submit() {
      const payload = {
        hospital_name: this.hospital_name,
        location: this.location,
        hospital_id: this.hospital_id,
        admin_first_name: this.admin_first_name,
        admin_second_name: this.admin_second_name,
        telephone: this.telephone,
        admin_phone: this.admin_phone,
        admin_email: this.admin_email,
        admin_id: this.admin_id,
        email: this.email,
        address: this.address,
        imageUrl: this.imageUrl,
      };
      fetch("http://127.0.0.1:8000/api/hospital/", {
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
          this.$router.push("/triager");
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
          console.log(data);
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
  width: 100%;
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
