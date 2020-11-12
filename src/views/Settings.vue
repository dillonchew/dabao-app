<template>
  <section id="settings">
    <br/>
    <div class="col1">
      <h3>Update your profile</h3>
      <br/>
      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>

      <form class="col2" @submit.prevent>

        <div>
          <h5> Name </h5>
        </div>
        <div>
          <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />
        </div><br/>

        <div>
          <h5> Zone </h5>
        </div>
        <div>
          <input v-model.trim="zone" type="text" :placeholder="userProfile.zone" id="zone" />
        </div>
        <br/>

        <div>
          <h5> Tele handle </h5>
        </div>
        <div>
          <input v-model.trim="tele" type="text" :placeholder="userProfile.tele" id="tele" />
        </div>
        <br/>

        <div>
          <b-button class = "normal" @click ="click1">Upload Profile Picture</b-button>
          <input type = "file" ref = "input1" style = "display:none" @change = "previewImage" accept = "image/*">
          <div v-if = "imageData!=null">
              <img class="preview" height="268" width="356" :src="profilePic"><br>
          </div>   
        </div>
          <br/>
          <button @click="updateProfile()" id="update">Update Profile</button>
        
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import firebase from 'firebase';

export default {
  data() {
    return {
      name: "",
      tele: "",
      zone: "",
      showSuccess: false,
      profilePic: "",
      imageData: null,
      uploadValue: 0
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
        tele: this.tele !== "" ? this.tele : this.userProfile.tele,
        zone: this.zone !== "" ? this.zone : this.userProfile.zone,
        profilePic: this.profilePic !== "" ? this.profilePic : this.userProfile.profilePic,
      });

      this.name = "";
      this.tele = "";
      this.zone = "";
      this.profilePic = "";

      this.showSuccess = true;
      this.imageData = null;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    },

    click1(){
      this.$refs.input1.click()
    },
    previewImage(event){
      this.uploadValue = 0;
      this.imageData = event.target.files[0];
      this.onUpload()
    },
    onUpload(){
      const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;}, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.profilePic = url;
          console.log("this.profilePic: " ,this.profilePic)
          });
        }
      ); 
    },
  },
};
</script>

<style scoped>
#update {
  display: inline-block;
  padding: 5px 10px;
  font-size: 14px;
  width: 250px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  justify-content:center;
  background-color: white;
  color:  #660066;
  border-color: #660066;
  font-size: 18px;
  border-radius: 20px;
  margin: 4px 2px;
  height: 40px;
}
#update:hover {
  transform: scale(1.1);
  box-shadow: 0 2px #2f4f4f;
}

input {
  border-radius: 20px;
  width: 250px;
  border-color:#DBD6D6;
  background-color:#DBD6D6;
  height: 40px;
}
.normal {
  font-size: 14px;
  display: inline-block;
  padding: 5px 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: grey;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  margin: 4px 2px;
}
.normal:hover {
  color: #00e6ac;
}
.col2 {
  display: flexbox;
  width: 100%;
  height: 600px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

form {
  margin-bottom: 10%;
}
.col1 {
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>