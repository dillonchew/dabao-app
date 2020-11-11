<template>
  <section id="settings">
    <div class="col1">
      <h3>Update your profile</h3>

      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>

      <form @submit.prevent>
        <label for="name" id="labels">Name:</label>
        <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />

        <label for="zone" id="labels">Zone:</label>
        <input v-model.trim="zone" type="text" :placeholder="userProfile.zone" id="zone" />

        <label for="tele" id="labels">Tele Handle:</label>
        <input v-model.trim="tele" type="text" :placeholder="userProfile.tele" id="tele" />

        <label for="pic" id="labels">Profile Pic:</label>
        <button class = "small" @click ="click1">Upload Picture</button>
        <input type = "file" ref = "input1" style = "display:none" @change = "previewImage" accept = "image/*">
        <div v-if = "imageData!=null">
             <img class="preview" height="268" width="356" :src="profilePic"><br>
        </div>   
        
        <br>
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
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: black;
  color: #fff;
  background-color: #660066;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px #602040;
  margin-left: 10px;
}
#labels {
  margin: 10px 5px;
}
#col1 {
  display: flex;
}
h3 {
  margin: 6%;
}
form {
  margin-bottom: 10%;
}
</style>