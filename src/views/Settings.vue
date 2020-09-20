<template>
  <section id="settings">
    <div class="col1">
      <h3>Settings</h3>
      <p>Update your profile</p>

      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>

      <form @submit.prevent>
        <label for="name" id="labels">Name: </label>
        <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />

        <label for="zone" id="labels">Zone: </label>
        <input v-model.trim="zone" type="text" :placeholder="userProfile.zone" id="zone" />

        <button @click="updateProfile()" id="update">Update Profile</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      name: '',
      zone: '',
      showSuccess: false
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name,
        zone: this.zone !== '' ? this.zone : this.userProfile.zone
      })

      this.name = ''
      this.zone = ''

      this.showSuccess = true

      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
#update {
  font-size: 20px;
  padding: 4px 4px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline:black;
  color: #fff;
  background-color: #5c6fdd;
  border: none;
  border-radius: 5px;
  box-shadow: 0 5px #999;
  margin: 10px 5px;
}
#labels {
  margin: 10px 5px;
}
</style>