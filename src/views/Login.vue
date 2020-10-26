<template>
  <div id="login">
    <section>
      <div class="col1">
        <h1>Dabao-app</h1>
        <strong>
          In light of covid-19, this app aims to promote safe-distancing among
          hall residents by reducing overcrowding at popular eateries around
          NUS.
        </strong>
      </div>
      <div class = "info">
        <h2>How does this app work?</h2>
        <ul>
          <li> Residents can place orders for food for a small delivery fee of 5% of the bill</li>
          <li> Residents can also offer to take-away food for other residents </li>
          <li> Residents can see which locations people are planning to go </li>
          <li> This app will follow NUS guidelines regarding zoning and safe-distancing strictly </li>
        </ul>
      </div>
      <div class = "img">
        <img src = "@/assets/review.png"/>
      </div>
      <div class = "charts">
        <BarChart></BarChart>
        
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form id="signup" v-if="showLoginForm" @submit.prevent>
          <br />
          <h1>Welcome Back!</h1>
          <br />
          <br />
          <div>
            <label for="email1" id="labels">Email:</label>
            <input v-model.trim="loginForm.email" type="text" id="email1" />
          </div>
          <div>
            <label for="password1" id="labels">Password:</label>
            <input
              v-model.trim="loginForm.password"
              type="password"
              id="password1"
            />
          </div>
          <div v-if="clickedFlag">
            <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
            <p v-else>
              Success! Check your email (may be in the junk folder) for a reset
              link!
            </p>
          </div>
          <button @click="login()" id="cool">Log In</button>
          <br />
          <br />
          <br />
          <br />
          <div class="extras">
            <button v-b-modal.modal-pass id="cool">Forgot Password</button>
            <button @click="toggleForm()" class="normal">
              Create an Account
            </button>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name" id="labels">Name:</label>
            <input
              v-model.trim="signupForm.name"
              type="text"
              placeholder="<Your Name>"
              id="name"
              required
            />
          </div>
          <div>
            <label for="zone" id="labels">Zone:</label>
            <input
              v-model.trim="signupForm.zone"
              type="text"
              placeholder="<A,B,C,D>"
              id="zone"
              required
            />
          </div>
          <div>
            <label for="email2" id="labels">Email:</label>
            <input
              v-model.trim="signupForm.email"
              type="text"
              placeholder="<you@email.com>"
              id="email2"
              required
            />
          </div>
          <div>
            <label for="password2" id="labels">Password:</label>
            <input
              v-model.trim="signupForm.password"
              type="password"
              placeholder="min 6 characters"
              id="password2"
              required
            />
          </div>
          <b-button pill variant="outline-secondary" @click="signup()" id="cool"
            >Sign Up</b-button
          >
          <br />
          <br />
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
          <label>Email:</label>
          <b-form-input
            id="shop-input"
            type="email"
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
import { auth } from "@/firebase";
import BarChart from "../components/BarChart.vue";


export default {
  components: {
    BarChart,
  },
  data() {
    return {
      clickedFlag: false,
      resetEmail: "",
      showSuccess: true,
      errorMsg: "",

      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        name: "",
        zone: "",
        email: "",
        password: "",
      },
      showLoginForm: true,
      showPasswordReset: false,
    };
  },
  methods: {
    async resetPassword() {
      this.errorMsg = "";

      try {
        await auth.sendPasswordResetEmail(this.resetEmail);
        this.showSuccess = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    clicked() {
      this.clickedFlag = !this.clickedFlag;
    },
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        zone: this.signupForm.zone,
      });
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
    },
  },
};
</script>

<style scoped>
.info {
  position: fixed;
  text-align: left;
  top: 150px;
  left: 10px;
}
.img {
  position: fixed;
  text-align: left;
  top: 330px;
  left: 10px;
}
.charts {
  position: fixed;
  top: 110px;
  right: 30px;
  height: 80px;
  width: 500px;

}
#cool {
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
  margin: 4px 2px;
}

#cool:hover {
  background-color: #696969;
  box-shadow: 0 2px #2f4f4f;
}

#cool:active {
  background-color: #696969;
  box-shadow: 0 2px #2f4f4f;
  transform: translateY(4px);
}
.normal {
  font-size: 14px;
  display: inline-block;
  padding: 5px 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: black;
  color: #fff;
  background-color: #660066;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px #602040;
  margin: 4px 2px;
}
.normal:hover {
  background-color: #696969;
  box-shadow: 0 2px #2f4f4f;
}

.normal:active {
  background-color: #696969;
  box-shadow: 0 2px #2f4f4f;
  transform: translateY(4px);
}

#labels {
  margin: 10px 5px;
}

.col2 {
  background-color: rgba(153, 51, 102, 0.1);
  box-shadow: 50px 50px rgba(153, 51, 102, 0.4);
  display: flexbox;
  max-width: 600px;
  height: 400px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-left: 36%;
  margin-right: 36%;
  margin-top: 30px;
  margin-bottom: 80px;
}

.col1 {
  display: inline-block;
  justify-content: center;
  align-items: center;
}

label {
  display: inline-block;
  width: 100px;
  text-align: right;
}
</style>
