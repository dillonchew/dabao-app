<template>
  <div id="login">
    <section>
      <div class="col1">
        <h1>Dabao-app</h1>
        <strong>In light of covid-19, this app aims to promote safe-distancing among hall residents by reducing overcrowding at popular eateries around NUS.</strong>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <label for="email1" id="labels">Email: </label>
            <input v-model.trim="loginForm.email" type="text" id="email1" />
          </div>
          <div>
            <label for="password1" id="labels">Password: </label>
            <input v-model.trim="loginForm.password" type="password" id="password1" />
          </div>
          <div v-if="clickedFlag">
          <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
          <p v-else>Success! Check your email (may be in the junk folder) for a reset link!</p>
          </div>
          <button @click="login()" id="cool">Log In</button>
          <div class="extras">
            <b-button v-b-modal.modal-pass id="cool">Forgot Password</b-button>
            <button @click="toggleForm()" class="normal">Create an Account</button>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name" id="labels">Name: </label>
            <input v-model.trim="signupForm.name" type="text" placeholder="<Your Name>" id="name" required/>
          </div>
          <div>
            <label for="zone" id="labels">Zone: </label>
            <input v-model.trim="signupForm.zone" type="text" placeholder="<A,B,C,D>" id="zone" required/>
          </div>
          <div>
            <label for="email2" id="labels">Email: </label>
            <input v-model.trim="signupForm.email" type="text" placeholder="<you@email.com>" id="email2" required/>
          </div>
          <div>
            <label for="password2" id="labels">Password: </label>
            <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" required/>
          </div>
          <button @click="signup()" id="cool" >Sign Up</button>
          <div class="extras">
            <button @click="toggleForm()" id="cool">Back to Log In</button>
          </div>
        </form>
      </div>
    </section>
    <b-modal
      id="modal-pass"
      ref="modal"
      title="Password Reset"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form id="pass-form" ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="showSuccess"
          label="Input the email used to sign up for dabao-app"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <label>Email: </label>
          <b-form-input
            id="shop-input"
            type = "email"
            v-model.trim="resetEmail"
            :state="showSuccess"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { auth } from '@/firebase'

export default {
  data() {
    return {
      clickedFlag: false,
      resetEmail: '',
      showSuccess: true,
      errorMsg: '',

      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        zone: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
  async resetPassword() {
      this.errorMsg = ''

      try {
        await auth.sendPasswordResetEmail(this.resetEmail)
        this.showSuccess = true
      } catch (err) {
        this.errorMsg = err.message
      }
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    clicked() {
      this.clickedFlag = !this.clickedFlag
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        zone: this.signupForm.zone
      })
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.showSuccess = valid;
      return valid;
    },
    resetModal() {
      this.resetEmail = "";
      this.showSuccess = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.resetPassword();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-pass");
      });
      this.clicked();
    }
  }
}
</script>

<style scoped>
#cool {
  display: inline-block;
  padding: 10px 15px;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline:black;
  color: #fff;
  background-color: #5c6fdd;
  border: none;
  border-radius: 5px;
  box-shadow: 0 5px #999;
  margin: 4px 2px;
}

#cool:hover {background-color: #457e99}

#cool:active {
  background-color: #3e7b8e;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.normal {
  font-size:20px;
  display: inline-block;
  padding: 11px 15px;
  cursor: pointer;  
  text-align: center;
  text-decoration: none;
  outline:black;
  color: #fff;
  background-color: #5c6fdd;
  border: none;
  border-radius: 5px;
  box-shadow: 0 6px #999;
  margin: 4px 2px;
}
.normal:hover {background-color: #457e99}

.normal:active {
  background-color: #3e7b8e;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

#labels {
  margin: 10px 5px;
}
</style>