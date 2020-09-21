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

        <button @click="updateProfile()" id="update">Update Profile</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "",
      zone: "",
      showSuccess: false,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
        zone: this.zone !== "" ? this.zone : this.userProfile.zone,
      });

      this.name = "";
      this.zone = "";

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
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